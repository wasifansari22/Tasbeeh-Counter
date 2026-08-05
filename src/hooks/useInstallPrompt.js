import { useEffect, useState } from "react";

const useInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [status, setStatus] = useState("checking");

    useEffect(() => {
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setStatus("installed");
            return;
        }

        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setDeferredPrompt(event);
            setStatus("available");
        };

        const handleAppInstalled = () => {
            setDeferredPrompt(null);
            setStatus("installed");
        };

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );

        window.addEventListener(
            "appinstalled",
            handleAppInstalled
        );

        const timer = setTimeout(() => {
            setStatus((current) =>
                current === "checking"
                    ? "unsupported"
                    : current
            );
        }, 1500);

        return () => {
            clearTimeout(timer);
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );

            window.removeEventListener(
                "appinstalled",
                handleAppInstalled
            );
        };
    }, []);

    const installApp = async () => {
        if (!deferredPrompt) {
            return false;
        }

        setStatus("installing");
        deferredPrompt.prompt();

        const { outcome } =
            await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            console.log("User accepted installation");
        } else {
            console.log("User cancelled installation");
            setStatus("available");
        }

        setDeferredPrompt(null);
        return true;
    };

    useEffect(() => {
        console.log("Current install status:", status);
    }, [status]);

    return {
        status,
        installApp,
    };
};

export default useInstallPrompt;
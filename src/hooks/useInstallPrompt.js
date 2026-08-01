import { useEffect, useState } from "react";

const useInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [status, setStatus] = useState("checking");

    useEffect(() => {
        console.log("Install hook mounted");
        // already installed
        if (
            window.matchMedia("(display-mode: standalone)").matches
        ) {
            setStatus("installed");
            return;
        }

        const handleBeforeInstallPrompt = (event) => {
            console.log("beforeinstallprompt fired");

            event.preventDefault();

            setDeferredPrompt(event);
            setStatus("available");
        };

        const handleAppInstalled = () => {
            console.log("App Installed");

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

        // wait a little before deciding it's unsupported
        // const timer = setTimeout(() => {
        //     setStatus((prev) =>
        //         prev === "checking" ? "unsupported" : prev
        //     );
        // }, 3000);

        return () => {
            console.log("Install hook unmounted");
            // clearTimeout(timer);
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

    return {
        status,
        installApp,
    };
};

export default useInstallPrompt;
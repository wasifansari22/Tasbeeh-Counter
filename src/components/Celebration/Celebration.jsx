import React from 'react'
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

const Celebration = ({ show }) => {
    const { width, height } = useWindowSize();
    if (!show) return null;

    return (
        <div>
            <Confetti
                width={width}
                height={height}
                numberOfPieces={180}
                recycle={false}
                gravity={0.25}
                style={{
                    position: "fixed",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 9998,
                }}
            />
        </div>
    )
}

export default Celebration
import { createContext, useContext } from "react";

const DhikrContext = createContext();

export const DhikrProvider = ({ children }) => {
    return (
        <DhikrContext.Provider value={{}}>
            {children}
        </DhikrContext.Provider>
    );
};

export const useDhikr = () => {
    return useContext(DhikrContext);
}
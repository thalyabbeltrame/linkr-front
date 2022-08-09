import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                signed: !!userData,
                userData,
                setUserData
            }}>
            {children}

        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}
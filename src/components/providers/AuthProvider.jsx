'use client'
import AuthContext from "../contexts/AuthContext";

const AuthProvider = ({ adminDetailsFromCookie, children }) => {
const authValues = {adminDetailsFromCookie}
    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
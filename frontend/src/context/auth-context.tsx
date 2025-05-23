'use client'

import useClient from "@/hooks/use-client";
import React, { createContext, ReactNode, useContext } from "react";

type AuthContextType = {
    client: any;
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({
    children,
  }: {
    children: ReactNode;
  }) => {

    const client = useClient()

    return (
        
        <AuthContext.Provider value={{ client }}>
            { children }
        </AuthContext.Provider>
        
    )    
}

export const useAuthContext = () => useContext(AuthContext);
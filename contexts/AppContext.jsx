"use client";
import { useUser } from "@clerk/nextjs";
import React, { createContext, useContext } from "react";

// Define default context value
const AppContext = createContext({ user: null });

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// AppProvider component to provide context values
export const AppProvider = ({ children }) => {
  const { user } = useUser();
  
  const value = { user };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;

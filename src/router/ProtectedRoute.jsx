import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// GENERAL PROTECTED ROUTE (Requires login)
export function Protected({ children }) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;
    return children;
}

// ROLE-BASED PROTECTED ROUTE
export function RoleProtected({ children, roles }) {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    const userRoles = user.roles || [];

    const allowed = roles.some(r => userRoles.includes(r));

    if (!allowed) return <Navigate to="/unauthorized" replace />;

    return children;
}
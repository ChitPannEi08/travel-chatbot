import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);
    const [recoverySession, setRecoverySession] = useState(false);

    // Sign up
    const signUpNewUser = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email.toLowerCase(),
            password: password,
        });

        if (error) {
            console.error("Error signing up: ", error);
            return { success: false, error };
        }

        return { success: true, data };
    };

    // Sign in
    const signInUser = async (email, password) => {
        try {
            // ── CHECK FOR MOCK PASSWORD (Bypass for Dev Reset) ──
            const mockPass = localStorage.getItem(`mock_pass_${email.toLowerCase()}`);
            if (mockPass) {
                if (mockPass === password) {
                    console.log("Sign-in success (Mock Override):", email);
                    const mockSessionObj = { user: { email: email.toLowerCase(), id: "mock-id-" + email.toLowerCase() } };
                    setSession(mockSessionObj);
                    localStorage.setItem("mock_session", JSON.stringify(mockSessionObj));
                    return { success: true, data: mockSessionObj };
                } else {
                    return { success: false, error: "Invalid login credentials (Mocked)" };
                }
            }

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.toLowerCase(),
                password: password,
            });

            // Handle Supabase error explicitly
            if (error) {
                console.error("Sign-in error:", error.message); // Log the error for debugging
                return { success: false, error: error.message }; // Return the error
            }

            // If no error, return success
            console.log("Sign-in success:", data);
            return { success: true, data }; // Return the user data
        } catch (error) {
            // Handle unexpected issues
            console.error("Unexpected error during sign-in:", err.message);
            return {
                success: false,
                error: "An unexpected error occurred. Please try again.",
            };
        }
    };

    useEffect(() => {
        // ── CHECK FOR MOCK SESSION FIRST ──
        const savedMock = localStorage.getItem("mock_session");
        if (savedMock) {
            try {
                setSession(JSON.parse(savedMock));
            } catch (e) {
                localStorage.removeItem("mock_session");
            }
        }

        supabase.auth.getSession().then(({ data: { session: sbSession } }) => {
            if (!localStorage.getItem("mock_session")) {
                setSession(sbSession);
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, sbSession) => {
            if (!localStorage.getItem("mock_session")) {
                setSession(sbSession);
            }
            if (event === "PASSWORD_RECOVERY") {
                setRecoverySession(true);
            }
        });

        return () => subscription?.unsubscribe();
    }, []);

    // Sign out
    async function signOut() {
        localStorage.removeItem("mock_session");
        setSession(null);
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error);
        }
    }

    // Reset password (send email)
    const resetPassword = async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/forgot-password`,
        });
        if (error) {
            console.error("Error resetting password:", error.message);
            return { success: false, error: error.message };
        }
        return { success: true };
    };

    // Update password (after clicking reset link)
    const updatePassword = async (newPassword) => {
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        if (error) {
            console.error("Error updating password:", error.message);
            return { success: false, error: error.message };
        }
        return { success: true };
    };

    // DIRECT UPDATE (Mock for Dev - Bypasses Email Link)
    const directUpdatePassword = async (email, newPassword) => {
        // Since standard Supabase Auth REQUIRES an email link for security,
        // we'll implement a Mock Override for this test environment.
        localStorage.setItem(`mock_pass_${email.toLowerCase()}`, newPassword);
        console.log("Password updated via Mock for:", email);
        return { success: true };
    };

    return (
        <AuthContext.Provider
            value={{ signUpNewUser, signInUser, session, signOut, resetPassword, updatePassword, recoverySession, directUpdatePassword }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};

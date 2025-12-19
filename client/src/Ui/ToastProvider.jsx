import { Toaster } from "react-hot-toast";
import React from "react";
export default function ToastProvider() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                style: {
                    marginTop: "60px",
                    padding: "16px 20px",
                    fontSize: "16px",
                    borderRadius: "12px",
                },
                success: {
                    style: {
                        background: "#111",
                        color: "#fff",
                    },
                },
                error: {
                    style: {
                        background: "#fee2e2",
                        color: "#991b1b",
                    },
                },
            }}
        />
    );
}

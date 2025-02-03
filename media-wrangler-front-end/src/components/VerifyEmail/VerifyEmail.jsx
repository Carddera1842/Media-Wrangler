import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
    
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
    
        if (token) {
            axios
                .get(`http://localhost:8080/users/verify?token=${token}`)
                .then((response) => {
                    if (isMounted) {
                        setMessage("Email verified successfully!");
                        setTimeout(() => navigate("/login"), 3000);
                    }
                })
                .catch((error) => {
                    if (isMounted) {
                        setMessage("Invalid or expired token.");
                    }
                });
        } else {
            setMessage("No token provided.");
        }
    
        return () => {
            isMounted = false;
        };
    }, [navigate]);
    

    return (
        <div>
            <h2>{message}</h2>
        </div>
    );
}

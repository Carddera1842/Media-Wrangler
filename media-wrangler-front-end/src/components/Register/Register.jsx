import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRegister } from "../../Services/RegistrationService";
import "./Register.css";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (password !== confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match" });
            return;
        }

        const registerData = {
            username,
            firstname,
            lastname,
            password,
            email,
        };

        try {
            const responseMessage = await apiRegister(registerData);

            if (responseMessage === "Success") {
                navigate("/login");
            } else {
                setErrors(responseMessage);
            }
        } catch (error) {
            console.error("Unexpected error during registration:", error);
            setErrors({ error: "An unexpected error occurred. Please try again." });
        }
    };

    return (
        <div className="register-background">
            <div className="register-form-container">
                <img src="/Media Wrangler.PNG" alt="Logo" className="register-logo" />
                <form onSubmit={handleSubmit}>
                    <h1 className="register-title">Register</h1>

                    <div className="register-field-row">
                        <div className="register-field">
                            <label className="register-label">Username</label>
                            <div className="register-control">
                                <input
                                    className={`register-input ${errors.username ? "is-danger" : ""}`}
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            {errors.username && <p className="help is-danger">{errors.username}</p>}
                        </div>

                        <div className="register-field">
                            <label className="register-label">Email</label>
                            <div className="register-control">
                                <input
                                    className={`register-input ${errors.email ? "is-danger" : ""}`}
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {errors.email && <p className="help is-danger">{errors.email}</p>}
                        </div>
                    </div>

                    <div className="register-field-row">
                        <div className="register-field">
                            <label className="register-label">First Name</label>
                            <div className="register-control">
                                <input
                                    className={`register-input ${errors.firstname ? "is-danger" : ""}`}
                                    type="text"
                                    placeholder="First Name"
                                    value={firstname}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            {errors.firstname && <p className="help is-danger">{errors.firstname}</p>}
                        </div>

                        <div className="register-field">
                            <label className="register-label">Last Name</label>
                            <div className="register-control">
                                <input
                                    className={`register-input ${errors.lastname ? "is-danger" : ""}`}
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastname}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            {errors.lastname && <p className="help is-danger">{errors.lastname}</p>}
                        </div>
                    </div>

                    <div className="register-field-row">
                        <div className="register-field">
                            <label className="register-label">Password</label>
                            <div className="register-control">
                                <input
                                    className={`register-input ${errors.password ? "is-danger" : ""}`}
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {errors.password && <p className="help is-danger">{errors.password}</p>}
                        </div>

                        <div className="register-field">
                            <label className="register-label">Re-enter Password</label>
                            <div className="register-control">
                                <input
                                    className={`register-input ${errors.confirmPassword ? "is-danger" : ""}`}
                                    type="password"
                                    placeholder="Re-enter Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            {errors.confirmPassword && <p className="help is-danger">{errors.confirmPassword}</p>}
                        </div>
                    </div>

                    {errors.error && <p className="help is-danger">{errors.error}</p>}

                    <div className="register-field">
                    <div className="register-button-container">
                        <button className="register-button is-primary">Register</button>
                    </div>

                    </div>
                </form>
            </div>
        </div>
    );
}

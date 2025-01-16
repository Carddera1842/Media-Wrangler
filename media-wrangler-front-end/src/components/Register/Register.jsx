import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { apiRegister } from "../../Services/RegistrationService";

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
            email
        };

        try {
            const responseMessage = await apiRegister(registerData);
    
            if (responseMessage === "Success") {
                
                    navigate("/check-email");
            } else {
                setErrors(responseMessage);
            }
        } catch (error) {
            console.error("Unexpected error during registration:", error);
            setErrors({ error: "An unexpected error occurred. Please try again." });
        }

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Username</label>
                <div className="control">
                    <input
                        className={`input ${errors.username ? "is-danger" : ""}`} 
                        type="username" 
                        placeholder="Username" 
                        value={username}
                        onChange = {(e) => setUsername(e.target.value)}>
                        </input>
                </div>
                {errors.username && <p className="help is-danger">{errors.username}</p>}
                </div>

                <div className="field">
                    <label className="label">First Name</label>
                <div className="control">
                    <input
                        className={`input ${errors.firstname ? "is-danger" : ""}`} 
                        type="text" 
                        placeholder="First Name" 
                        value={firstname}
                        onChange = {(e) => setFirstName(e.target.value)}>
                        </input>
                </div>
                {errors.firstname && (<p className="help is-danger">{errors.firstname}</p>)}
                </div>

                <div className="field">
                    <label className="label">Last Name</label>
                <div className="control">
                    <input
                        className={`input ${errors.lastname ? "is-danger" : ""}`} 
                        type="text" 
                        placeholder="Last Name" 
                        value={lastname}
                        onChange = {(e) => setLastName(e.target.value)}>
                        </input>
                </div>
                {errors.lastname && (<p className="help is-danger">{errors.lastname}</p>)}
                </div>

                <div className="field">
                    <label className="label">Password</label>
                <div className="control">
                    <input
                        className={`input ${errors.password ? "is-danger" : ""}`}
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange = {(e) => setPassword(e.target.value)}>
                        </input>
                </div>
                {errors.password && (<p className="help is-danger">{errors.password}</p>)}
                </div>

                <div className="field">
                    <label className="label">Re-enter Password</label>
                    <div className="control">
                        <input
                            className={`input ${errors.confirmPassword ? "is-danger" : ""}`}
                            type="password"
                            placeholder="Re-enter Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {errors.confirmPassword && (<p className="help is-danger">{errors.confirmPassword}</p>)}
                </div>


                <div className="field">
                    <label className="label">Email</label>
                <div className="control">
                    <input 
                        className={`input ${errors.email ? "is-danger" : ""}`} 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange = {(e) => setEmail(e.target.value)}>
                    </input>
                </div>
                {errors.email && <p className="help is-danger">{errors.email}</p>}
                </div>


                <div className="control">
                    <button 
                        type="submit">
                    Submit</button>
                </div>
            </form>
        </div>
    )
}
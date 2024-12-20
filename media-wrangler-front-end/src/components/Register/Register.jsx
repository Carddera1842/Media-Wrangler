import axios from "axios";
    import React, { useState } from "react"
    import { useNavigate } from "react-router-dom";

export default function Register() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const registerData = {
            username,
            firstName,
            lastName,
            password,
            email
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/register",
                registerData
            );
            console.log("Response:", response);
            if (response.status === 200) {
                // login();
                console.log("Navigating to registration success");
                navigate("/registrationSuccess");
            } else {
                // console.error("Login failed:", response);
                setError("Registration failed. Please try again");
            }
        } catch (error) {
            // console.error("An error occurred:", error);
            setError("An error occured. Please try again");
        }

        console.log("Registering: ", username, password);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Username</label>
                <div className="control">
                    <input
                        className="input" 
                        type="username" 
                        placeholder="Userame" 
                        value={username}
                        onChange = {(e) => setUsername(e.target.value)}>
                        </input>
                </div>
                </div>

                <div className="field">
                    <label className="label">First Name</label>
                <div className="control">
                    <input
                        className="input" 
                        type="text" 
                        placeholder="First Name" 
                        value={firstName}
                        onChange = {(e) => setFirstName(e.target.value)}>
                        </input>
                </div>
                </div>

                <div className="field">
                    <label className="label">Last Name</label>
                <div className="control">
                    <input
                        className="input" 
                        type="text" 
                        placeholder="Last Name" 
                        value={lastName}
                        onChange = {(e) => setLastName(e.target.value)}>
                        </input>
                </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                <div className="control">
                    <input
                        className="input" 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange = {(e) => setPassword(e.target.value)}>
                        </input>
                </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                <div className="control">
                    <input 
                        className="input" 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange = {(e) => setEmail(e.target.value)}>
                    </input>
                </div>
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
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { apiRegister } from "../../Services/RegistrationService";
import "../../stylings/Register.css"

export default function Register() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const registerData = {
            username,
            firstname,
            lastname,
            password,
            email
        };

        let responseMessage = await apiRegister(registerData);

         console.log(responseMessage);
        if (responseMessage === "Success") {
            navigate("/login");
        } else {
            setError(responseMessage);
        }

        console.log("Registering: ", username, password);
    };

    return (
        <div className="register-background">
            <div className="form-container">
            <img src="/Media Wrangler.PNG" alt="Logo" className="register-logo"/>
                <form onSubmit={handleSubmit}>
                    <h1 className="title">Register</h1>
                    
                    <div className="field-row">
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control">
                                <input
                                    className="input" 
                                    type="username" 
                                    placeholder="Username" 
                                    value={username}
                                    onChange = {(e) => setUsername(e.target.value)}>
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
                    </div>
                    
                    <div className="field-row">
                        <div className="field">
                            <label className="label">First Name</label>
                            <div className="control">
                                <input
                                    className="input" 
                                    type="text" 
                                    placeholder="First Name" 
                                    value={firstname}
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
                                    value={lastname}
                                    onChange = {(e) => setLastName(e.target.value)}>
                                    </input>
                            </div>
                        </div>
                    </div>

                    <div className="field-row">
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
                            <label className="label">Password</label>
                            <div className="control">
                                <input
                                    className="input" 
                                    type="password" 
                                    placeholder="Enter Password Again" 
                                    value={password}
                                    onChange = {(e) => setPassword(e.target.value)}>
                                    </input>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button className="button is-primary is-halfwidth">Register</button>
                        </div>
                    </div>
                    
            </form>
        </div>
    </div>
)
}

import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../../Services/LoginService";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const loginData = {
            username,
            password
        };
        
       let responseMessage = await apiLogin(loginData);

       console.log(responseMessage);
        if (responseMessage === "Success") {
            navigate("/loginSuccess");
        } else {
            setError(responseMessage);
        }
       

        console.log("Logging in with: ", username, password);
    };

    return (
        <div>
            <div className="field">
                <label className="label">Username</label>
            <div className="control">
                <input 
                    className="input" 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange = {(e) => setUsername(e.target.value)}>
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

            <div className="control">
                <button 
                    type="submit"
                    onClick={handleSubmit}>
                Submit</button>
            </div>
        </div>
    )
}


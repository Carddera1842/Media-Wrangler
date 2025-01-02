
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../../Services/LoginService";
import "../../stylings/Login.css";

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
        <div className="login-background">
          <div className="login-form-container">
            <img src="/Media Wrangler.PNG" alt="Logo" className="login-logo" />
            <form onSubmit={handleSubmit}>
              <h1 className="login-title">Login</h1>

              <div className="field-row">
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                </div>
              </div>
    
              
    
              <div className="field">
                <div className="control">
                  <button className="login-button is-primary is-halfwidth">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }


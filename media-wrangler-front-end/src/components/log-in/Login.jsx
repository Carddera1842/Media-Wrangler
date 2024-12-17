import React from 'react';
import axios from "axios"
import { useNavigate } from 'react-dom';
import { Button } from '@mui/material';

export default function MyForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = () => {
        console.log("User logged in");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

    const loginData = {
        username,
        password
    };

    try {
        const response = await axios.post(
            "http://localhost:8080/login",
            loginData
        );
        if (response.status === 200){
            login();
            navigate("/loginSuccess");
        } else {
            const errorData = await response.json();
            SpeechSynthesisErrorEvent(errorData.message || "Login failed for user. Please retry!");
        }
    } catch (error) {
        SpeechSynthesisErrorEvent("An error occured, please try again");
    } }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" placeholder="username" value={username} onChange={(e) => setUserName(e.target.value)}></input>
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" placeholder="Enter password"> onChange={(e) => setPassword(e.target.value)}required</input>
                </div>

                <Button variant="contained">Log in</Button>
            </form>
      </div>
    )
  }
import React from "react";

export default function Register() {
<<<<<<< Updated upstream
=======
    
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
                navigate("/login");
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

>>>>>>> Stashed changes
    return (
        <h1>Create a Media Wrangler account</h1>
    )
}
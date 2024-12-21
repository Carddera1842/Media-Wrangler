import axios from "axios";

export async function apiRegister(registerData) {
    try {
        const response = await axios.post(
            "http://localhost:8080/register",
            registerData
        );
        console.log("Response:", response);
        if (response.status === 200) {
            // login();
            console.log("Navigating to login");
            // navigate("/registrationSuccess");
            return "Success"
        } else {
            // console.error("Login failed:", response);
            // setError("Registration failed. Please try again");
            return "Registration failed. Please try again"
        }
    } catch (error) {
        // console.error("An error occurred:", error);
        // setError("An error occured. Please try again");
        return "An error occured. Please try again"
    }
}
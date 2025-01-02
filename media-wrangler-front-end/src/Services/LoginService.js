import axios from "axios";

export async function apiLogin(loginData) {
    try {
        console.log("loginData:", loginData);
        const response = await axios.post(
            "http://localhost:8080/users/login",
            loginData
        );
        console.log("Response:", response);
        if (response.status === 200) {
            // login();
            console.log("Navigating to login success");
            // navigate("/loginSuccess");
            return "Success"
        } else {
            // console.error("Login failed:", response);
            // setError("Login failed. Please try again");
            return "Login failed. Please try again"
        }
    } catch (error) {
        // console.error("An error occurred:", error);
        // setError("An error occured. Please try again");
        return "An error occured. Please try again";
    }
}
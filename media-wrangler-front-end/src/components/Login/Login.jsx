import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Form, Field, ErrorMessage, FormikProvider, useFormik } from "formik";
import { useAuth } from "../../Services/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { loginAction } = useAuth();
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },

        onSubmit: async (values) => {
            // console.log("form values:", values);
            try{
                await loginAction(values);
                navigate("/");
            } catch (err) {
                setError(err.message || "Login failed. Please retry!");
            }
        } catch (error) {
            // console.error("An error occurred:", error);
            setError("An error occured. Please try again");
        }
    });

    return (
        <div className="App">
          <center>
            <h1>Login</h1>
                <FormikProvider value = {formik}>
                <Form>

                  <div>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter username"
                  />
                  <ErrorMessage name="username" component="div" />
                  </div>
                    <div>
                  <Field
                    type="password" 
                    name="password"
                    />
                  <ErrorMessage name="password" component="div" />
                  </div>
                  <button type="submit">Log in</button>
                </Form>
            </FormikProvider>
          </center>
        </div>
    );
}
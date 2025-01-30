import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Field, ErrorMessage, FormikProvider, useFormik } from "formik";
import { useAuth } from "../../Services/AuthContext";
import "./Login.css";

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
            try {
                await loginAction(values);
                navigate("/");
            } catch (err) {
                setError(err.message || "Login failed. Please retry!");
            }
        },
    });

    return (
        <>
        <div className="login-background">
            <div className="login-form-container">
                <img src="/Media Wrangler.PNG" alt="Logo" className="login-logo" />
                <FormikProvider value={formik}>
                    <Form className="login-form">
                        <h1 className="login-title">Login</h1>

                        <div className="login-field-row">
                            <div className="login-field">
                                <label className="login-label">Username</label>
                                <div className="login-control">
                                    <Field
                                        className="login-input"
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                    />
                                    <ErrorMessage name="username" component="p" className="help is-danger" />
                                </div>
                            </div>

                            <div className="login-field">
                                <label className="login-label">Password</label>
                                <div className="login-control">
                                    <Field
                                        className="login-input"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                    <ErrorMessage name="password" component="p" className="help is-danger" />
                                </div>
                            </div>
                        </div>

                        {error && <p className="help is-danger">{error}</p>}

                        <div className="login-field">
                        <div className="login-button-container">
                        <button className="login-button is-primary">Login</button>
                            </div>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </div>
        <footer className="footer">
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        <p>© {new Date().getFullYear()} Media Wrangler</p>
        <div className="about-us">
          <a href="/about-us">About PurpleTONE</a>
        </div>
      </footer>
      </>
    );
}


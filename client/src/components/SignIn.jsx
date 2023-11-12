import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import Q from '../assets/q.jpg'
import { Input, Button } from "@material-tailwind/react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import axios from 'axios';
import { loginU } from '../API'
import { Link } from "react-router-dom";

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { email, password };
            const response = await axios.post(loginU, data);

            if (response.status === 200) {
                const token = response.data.data;
                localStorage.setItem("token", token);
                localStorage.setItem("loggedIn", true);
                window.location.replace('/')
            } else {
                console.log(response.data.error);
                // Handle other error cases if needed
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container fluid className='mx-auto h-screen'>
            <figure className="relative h-full w-full">
                <img
                    className="h-full w-full object-cover object-center"
                    src={Q}
                    alt="nature"
                />
                <figcaption className="absolute lg:bottom-96 sm:bottom-52 left-2/4 flex flex-col xl:w-[25%] lg:w-[40%] md:w-[60%] sm:w-[90%] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h1 className="mt-10 text-center lg:text-3xl sm:text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h1>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <div className="mt-2">
                                    <Input
                                        id="email"
                                        label="Email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='mb-8'>
                                <div className="flex items-center justify-end">
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-deep-purple-400 hover:text-deep-purple-300">Forgot password?</a>
                                    </div>
                                </div>
                                <div className="mt-2 relative">
                                    <Input
                                        id="password"
                                        label="Password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <checkbox onClick={togglePasswordVisibility} className="absolute bottom-0 right-0 text-2xl pb-2 pr-3">
                                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                    </checkbox>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className=" w-full bg-deep-purple-400 shadow-deep-purple-200 p-3 rounded-xl font-semibold text-white"
                            >
                                Sign up
                            </Button>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-700 border-t border-gray-500 pt-4">
                            Not a user?
                            <Link to="/SignUp" className="font-semibold leading-6 text-deep-purple-400 hover:text-deep-purple-300"> Sign up</Link>
                        </p>
                    </div>
                </figcaption>
            </figure>

        </Container>
    )
}

export default SignIn
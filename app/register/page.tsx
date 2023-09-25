"use client";

import { useState } from 'react';
import './page.scss';
import FormInput from '../Components/FormInput/FormInput'
import Link from 'next/link';

const RegisterPage = (props: any) => {



    const [values, setValues] = useState({
        username: "",
        email: "",
        birthday: "",
        password: "",
        confirmPassword: ""
    });

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMessage: "Username should be 3-16 characters and shouldn't include any special character",
            label: "Username",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address!!",
            label: "Email",

            required: true,
        },
        {
            id: 3,
            name: "birthday",
            type: "date",
            placeholder: "Birthday",
            label: "Birthday",
            required: true,
        },
        {
            id: 4,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special characters",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 5,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "Password don't match",
            label: "Confirm Password",
            pattern: values.password,
            required: true,
        },
    ]

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    const onChange = (e: any) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    console.log(values)
    return (
        <div className="app d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
                <div className='img'><img width="85" height="85" src="https://zotek8.com/wp-content/uploads/2023/07/Zotek8_logo_no-slogan_1-1024x1024.png" /></div>

                <h1>Register</h1>
                {inputs.map((input) => (
                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                ))}
                <h2>Bạn đã có tài khoản? <a href="/login">Login</a></h2>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default RegisterPage;
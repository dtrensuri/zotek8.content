"use client";

import { useState, Suspense, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './login.scss';
import { redirect } from 'next/navigation'

const host = process.env.HOST;

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validated, setValidated] = useState<boolean>(true);
    const [loadingCallAPI, setLoadingCallAPI] = useState<boolean>(false);
    const [loginState, setLoginState] = useState<boolean>(false);

    const validation = async (e: any) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(false);
        } else {
            setValidated(true);
        }

    }

    const handleLogin = (e: any) => {
        validation(e);
        if (validated) {
            setLoadingCallAPI(true);
            axios.request({
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: `${host}/api/user/login`,
                timeout: 5000,
                responseType: 'json',
                data: {
                    email_username: email,
                    password: password,
                },
            }).then((response) => {
                if (response.status === 200 && response.data.email === email) {
                    localStorage.setItem('userId', response.data.id);
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('employeeId', response.data.employee.id);
                    localStorage.setItem('employeeFirstName', response.data.employee.first_name);
                    localStorage.setItem('employeeLastName', response.data.employee.last_name);
                    localStorage.setItem('employeeAvatar', response.data.employee.avatar);
                    localStorage.setItem('employeeGender', response.data.employee.gender);
                    localStorage.setItem('employeePosition', response.data.employee.position);
                    setLoginState(true);
                }

            }).catch((error) => {
                console.error(error);
                setLoadingCallAPI(false);
            });
        };
    }

    useEffect(() => {
        if (loginState === true) {
            redirect('/time-sheet');
        }
    }, [loginState]);

    return (

        <div className='bg-info d-flex vh-100'>
            <Container className='align-items-center col-sm-7 col-md-5 col-lg-4 col-xxl-3 d-flex bg-info login-container' fluid>
                <Container className='bg-white box-login col-xs-4 ' fluid>
                    <Form noValidate validated={!validated} className='mt-4 form-login'>
                        <Form.Group className='d-flex justify-content-center'>
                            <img src='https://zotek8.com/wp-content/uploads/2023/07/Zotek8_logo_no-slogan_1-1024x1024.png' className='w-50 h-50' alt="..." />
                        </Form.Group>

                        <Form.Group className=' form-outline mb-4' controlId='formGroupEmail'>
                            <Form.Label className=''>Email:</Form.Label>
                            <Form.Control required type='email' placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3 form-outline ' controlId='formGroupPassword'>
                            <Form.Label className=''>Password:</Form.Label>
                            <Form.Control required type='password' placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Check type='checkbox' label='Remember me' />
                        </Form.Group>
                        <div className='d-grid my-3 mt-4 pt-2'>
                            <Button type='button' disabled={loadingCallAPI} onClick={(event: any) => handleLogin(event)} >Login</Button>
                        </div>
                    </Form>
                </Container>
            </Container>
        </div >

    );
}

export default Login;

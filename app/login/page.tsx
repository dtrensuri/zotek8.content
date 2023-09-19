"use client";

import { useEffect, useState } from 'react';
import { Container, Form, Button, Image } from 'react-bootstrap';
import axios from 'axios';
import { Route } from 'next';
import Loading from '../Components/Loading/Loading';
import redirect from 'next/navigation';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [already, setAlready] = useState(false);

    const router = useRouter();

    const onSubmit = async (e: any) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        console.log(email, password);
    }

    const handleLogin = async (e: any) => {
        setAlready(false);
        axios.request({
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: `http://localhost:8080/api/user/login`,
            timeout: 5000,
            responseType: 'json',
            data: {
                email_username: email,
                password: password,
            },
        }).then((response) => {
            if (response.status === 200 && response.data.email === email) {
                console.log(response.data);
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('employeeId', response.data.employee.id);
                localStorage.setItem('employeeFirstName', response.data.employee.first_name);
                localStorage.setItem('employeeLastName', response.data.employee.last_name);
                localStorage.setItem('employeeAvatar', response.data.employee.avatar);
                localStorage.setItem('employeeGender', response.data.employee.gender);
                localStorage.setItem('employeePosition', response.data.employee.position);
                return router.push('/time-sheet');
            }
        }).catch((error) => {

        });
    }

    useEffect(() => {
        if (!already) {
            setAlready(true);
        }
    }, [already]);

    return (
        <>
            {already == false ? <Loading></Loading> : <Container fluid className='bg-info'>
                <Container className='align-items-center col-lg-4 vh-100 d-flex ' fluid>
                    <Container className='bg-white border-box col-xs-4' fluid>
                        <Form noValidate validated={validated} onSubmit={onSubmit} className='mt-4'>
                            <Form.Group className='d-flex justify-content-center'>
                                <Image src='https://zotek8.com/wp-content/uploads/2023/07/Zotek8_logo_no-slogan_1-1024x1024.png' className='w-50 h-50' />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formGroupEmail'>
                                <Form.Label className=''>Email:</Form.Label>
                                <Form.Control required type='email' placeholder='Enter your email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    Email không hợp lệ.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formGroupPassword'>
                                <Form.Label className=''>Password:</Form.Label>
                                <Form.Control required type='password' placeholder='Enter your password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                <Form.Control.Feedback type='invalid'>
                                    Nhập password.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Check type='checkbox' label='Remember me' />
                            </Form.Group>
                            <Form.Group className='mb-3 d-flex justify-content-center align-items-center'>
                                <Form.Label>Chưa có tài khoản <a href='/register'>Sign Up</a></Form.Label>
                            </Form.Group>
                            <div className='d-grid mb-3'>
                                <Button type='button' onClick={(event) => handleLogin(event)}>Login</Button>
                            </div>
                        </Form>
                    </Container>
                </Container>
            </Container>
            }
        </>
    );
}

export default Login;

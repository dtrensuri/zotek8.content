'use client';

import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation'
import axios from 'axios';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [loginState, setLoginState] = useState<boolean>(false);
    const host = process.env.HOST
    const handleCheckLogin = () => {
        if (!localStorage.getItem('userId') || !localStorage.getItem('accessToken')) {
            setLoginState(false);
        } else {
            axios.request({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                url: `${host}/api/user/check-login`,
                timeout: 5000,
                data: {
                    'userId': localStorage.getItem('userId'),
                }
            }).then(() => {
                setLoginState(true);
            }).catch(() => {
                setLoginState(false);
            });
        }
    }

    useEffect(() => {
        handleCheckLogin();
    }, [])

    useEffect(() => {
        if (loginState === true) {
            redirect('/');
        }
    }, [loginState])
    return (
        <div className='login-page'>
            {children}
        </div>
    )
}

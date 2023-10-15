'use client';
import Footer from '@/components/footer/Footer';
import AppNavbar from "@/components/navBar/AppNavBar";
import axios from 'axios';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [loginState, setLoginState] = useState<boolean>(true);
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
            }).then((res) => {
                setLoginState(true);
            }).catch((e) => {
                setLoginState(false);
            });
        }
    }

    useEffect(() => {
        handleCheckLogin();
    }, [])

    useEffect(() => {
        if (loginState === false) {
            redirect('/login');
        }
    }, [loginState])

    return (
        <>
            <div className="bg-gray-200">
                <AppNavbar></AppNavbar>
                {children}
                <Footer></Footer>
            </div>
        </>
    )
}

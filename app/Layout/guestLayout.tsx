// import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.scss'
import 'font-awesome/css/font-awesome.min.css';
import Footer from '../Components/Footer/Footer';
import AppNavbar from "../Components/NavBar/AppNavBar"
import 'bootstrap-icons/font/bootstrap-icons.css';
import dotenv from 'dotenv';

dotenv.config();

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Contant - TimeSheet',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">

            <body className={inter.className}>
                <div className="bg-red">
                    <AppNavbar></AppNavbar>
                    {children}
                    <Footer></Footer>
                </div>
            </body>

        </html>
    )
}

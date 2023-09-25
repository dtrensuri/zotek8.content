'use client';

import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';
import './appNavBar.scss';

function AppNavbar() {
    return (
        <Navbar data-bs-theme='dark' className='bg-dark' expand="lg">
            <div className='custom-container'>
                <Navbar.Toggle aria-controls="header-main-navbar" />
                <Navbar.Collapse id="header-main-navbar">
                    <Nav className="ml-auto">
                        <Link href={'/'} className='nav-link ps-lg-0 pe-3 me-1'>Home</Link>
                        <Link href={'/time-sheet'} className='nav-link px-3 mx-1'>Timesheet</Link>
                        <Link href={'#'} className='nav-link px-3 mx-1'>Device</Link>
                        <Link href={'#'} className='nav-link px-3 mx-1'>Asset</Link>
                        <Link href={'#'} className='nav-link px-3 mx-1'>Assessment</Link>
                        <Link href={'#'} className='nav-link px-3 mx-1'>Staff</Link>
                        <Link href={'#'} className='nav-link px-3 mx-1'>Calendar</Link>
                        <Link href={'#'} className='nav-link px-3 mx-1'>Helpdesk</Link>
                        <Link href={'#'} className='nav-link px-3 mx-1'>MTool</Link>
                        <Link href={'#'} className='nav-link px-3 mx-1'>Feedback</Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default AppNavbar;

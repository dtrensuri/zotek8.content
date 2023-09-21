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
                        <Link href={'#'} className='nav-link ps-lg-0 pe-3 me-1'>Home</Link>
                        <Link href={'#'} className='nav-link px-3 mx-1'>Timesheet</Link>
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
                <div className="dropdown" aria-controls='header-main-navbar'>
                        <a
                            className="dropdown-toggle d-flex align-items-center hidden-arrow"
                            href="#"
                            id="navbarDropdownMenuAvatar"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                className="rounded-circle"
                                height="25"
                                alt="Black and White Portrait of a Man"
                                loading="lazy"
                            />
                        </a>
                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="navbarDropdownMenuAvatar"
                        >
                            <li>
                                <a className="dropdown-item" href="#">My profile</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">Settings</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
            </div>
        </Navbar>
    );
}

export default AppNavbar;

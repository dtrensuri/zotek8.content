'use client';
import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import Link from 'next/link';

const _ = require('lodash')

const App = (props: any) => {
    const listNavBar = props.listNavBar;
    const nameSideBar = props.nameSideBar;
    const [isOpen, setIsOpen] = useState(true);
    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    }

    const NavBarComponent = _.map(listNavBar, (sideBar: any, key: any) => (

        key % 2 == 1 ?
            <Link key={key} href={sideBar.href} className={`nav-link py-2 menu-item px-1 ${sideBar.class}`}>{sideBar.title}</Link>
            :
            <Link key={key} href={sideBar.href} className={`nav-link py-2 menu-item px-1 ${sideBar.class}`}>{sideBar.title}</Link>
    ));

    return (
        <div className='d-none bg-white mb-3 d-md-block sidebar-menu'>
            <div className='bg-gradient-black-white text-white ps-3 header-sidebar py-2' onClick={toggleCollapse}>
                <i className={`fa fa-angle-${isOpen ? 'right' : 'down'} arrow-icon pe-2`} aria-hidden="true"></i>
                {nameSideBar}
            </div>
            <Collapse in={isOpen}>
                <div className='container-fluid px-0'>
                    {
                        NavBarComponent
                    }
                </div>
            </Collapse >
        </div>
    )

}

export default App;

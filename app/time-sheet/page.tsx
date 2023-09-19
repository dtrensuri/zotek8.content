'use client'

import SideBar from "../Components/SideBar/SideBar"
import { Row, Col, Container, FormGroup, FormLabel, Form, Button, Table } from "react-bootstrap"
const _ = require('lodash')
import "./page.scss"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from "../Components/Loading/Loading"
import Searching from "../Components/Loading/searching"
import ResultTimeSheet from '../Components/TableRow/ResultTimeSheet';

const TimeSheet = () => {
    // const router = useRouter();
    const [optionsState, setOptionsState] = useState(1);
    const [already, setAlready] = useState(false);
    const [perPage, setPerPage] = useState(50);
    const [searching, setSearching] = useState(false);
    const [page, setPage] = useState(1);
    const [resultTimeSheet, setResultTimeSheet] = useState();

    const listSideMenu = {
        'TimeSheet':
            [
                { title: 'My Timesheet', href: '#', name: '', id: '', class: '', },
                { title: 'My Request', href: '#', name: '', id: '', class: '', },
                { title: 'My Leave', href: '#', name: '', id: '', class: '', },
                { title: 'Member setting', href: '#', name: '', id: '', class: '', },
                { title: 'Holiday', href: '#', name: '', id: '', class: '', }
            ],
        'Manager':
            [
                { title: 'Confirm request', href: '#', name: '', id: '', class: '', },
                { title: 'Reminder member', href: '#', name: '', id: '', class: '', },
                { title: 'Member leave', href: '#', name: '', id: '', class: '', },
                { title: 'Assign', href: '#', name: '', id: '', class: '', },
                { title: 'Member timesheet', href: '#', name: '', id: '', class: '', },
                { title: 'Member setting', href: '#', name: '', id: '', class: '', }
            ],
        'Help':
            [
                { title: 'Help', href: '#', name: '', id: '', class: '', },
                { title: 'About', href: '#', name: '', id: '', class: '', },
                { title: 'Feedback', href: '#', name: '', id: '', class: '', },
                { title: 'Calender', href: '#', name: '', id: '', class: '', },
                { title: 'Helpdesk', href: '#', name: '', id: '', class: '', }
            ],
    }

    const tableResultSchema = [
        { schema: 'no', title: 'No' },
        { schema: 'date', title: 'Date' },
        { schema: 'check_in', title: 'Checkin' },
        { schema: 'check_out', title: 'Checkout' },
        { schema: 'late', title: 'Late' },
        { schema: 'early', title: 'Early' },
        { schema: 'in_office', title: 'In office' },
        { schema: 'ot', title: 'OT' },
        { schema: 'work_time', title: 'Work time' },
        { schema: 'lack', title: 'Lack' },
        { schema: 'comp', title: 'Comp' },
        { schema: 'p_leave', title: 'PLeave' },
        { schema: 'u_leave', title: 'ULeave' },
        { schema: 'note', title: 'Admin note' },
        { schema: 'action', title: 'Action' }
    ];

    const callApiGetTimesheet = () => {
        axios.request({
            url: 'http://localhost:8080/api//user/get-time-sheets',
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                page: page,
                perPage: perPage,
            },
        }).then(response => {
            setResultTimeSheet(response.data.results);
            console.log(response);
        }).catch(err => {
            alert(err.message)
        });
    }

    const sidebarComponents = _.map(listSideMenu, (listNavBar: any, nameSideBar: any) => (
        <SideBar
            key={nameSideBar}
            nameSideBar={nameSideBar}
            listNavBar={listNavBar}
        />
    ));

    const handleSelectPerPage = (e: any) => {
        return setPerPage(e.target.value);
    }

    useEffect(() => {
        // setSearching(true);
        callApiGetTimesheet();
    }, [perPage]);


    useEffect(() => {
        if (!already) {
            setAlready(true);
        }
    }, [already]);

    useEffect(() => {
        callApiGetTimesheet();
    }, [])

    return (
        <>

            {already == false ? <Loading></Loading> : <main className="custom-container main-container pt-40 d-flex">
                <div className="main-sidebar">
                    {sidebarComponents}
                </div>
                <div className="main-content">
                    <div className="search-timesheet">
                        <div className="title bg-gradient-black-white py-2 ps-4 text-white">
                            My Timesheet
                        </div>
                        <Form className="search-form bg-white border borer-2 mb-3">
                            <div className="d-flex form-group">
                                <label className="label" htmlFor="select-list">Choose from list:</label>
                                <Form.Check type='radio' name='group1' id="select-list" inline></Form.Check>
                                <Form.Select className="select-box " defaultValue={1}>
                                    <option value={1} >This month</option>
                                    <option value={2}>Last month</option>
                                </Form.Select>
                            </div>
                            <div className='sort-date d-flex'>
                                <label className="label">Sort by work date:</label>
                                <Form.Select size='sm' className='select-sort' defaultValue={1}>
                                    <option value={1} >Ascending</option>
                                    <option value={2}>Descending</option>
                                </Form.Select>
                            </div>

                            <div className="form-group">
                                <Form.Label className='label' htmlFor="select-day">Choose start, end:</Form.Label>
                                <Form.Check type='radio' name='group1' id="select-day" inline></Form.Check><br />
                                <div className="select-day">
                                    <Form.Group className='d-flex mb-3 date-group'>
                                        <Form.Label className="from-to date-group">From:</Form.Label>
                                        <Form.Control type='date' size='sm' className="date ms-2" />
                                    </Form.Group>
                                    <Form.Group className='d-flex date-group'>
                                        <Form.Label className="from-to">To:</Form.Label>
                                        <Form.Control type='date' className="date ms-2" size='sm' />
                                    </Form.Group>
                                </div>
                            </div>
                            <Container className='d-flex justify-content-center p-2'>
                                <div className="btn-row">
                                    <Button className='button1 me-2'>Search</Button>
                                    <Button className='button1 ms-2'>Reset</Button>
                                </div>
                            </Container>
                        </Form>
                    </div>
                    <div className="result-container  my-3 bg-white container-fluid">
                        <div className="d-flex total">
                            <label className='my-2'>Total number of records: </label>
                            <div className="d-flex per-page my-2">
                                <label className="label">Sort by work date:</label>
                                <select name="perPage" className="px-2 ms-2" defaultValue={perPage} onChange={(e: any) => handleSelectPerPage(e)}>
                                    <option value={25} >--25--</option>
                                    <option value={50}>--50--</option>
                                    <option value={100}>--100--</option>
                                    <option value={150}>--150--</option>
                                </select>
                            </div>
                        </div>
                        <Row>
                            {
                                searching ? <Searching></Searching> : <Table bordered size='sm'>
                                    <thead >
                                        <tr >
                                            {
                                                _.map(tableResultSchema, ({ title, schema }: any, key: any) => (
                                                    <th key={key} className={`text-white bg-gradient-black-white tb-header`}> <span>
                                                        {title}</span></th>
                                                ))
                                            }
                                        </tr>
                                        {
                                            _.map(resultTimeSheet, ({ title }: any, key: any) => (

                                                <tr key={key}>

                                                    {
                                                        _.map(title, ({ title }: any, key: any) => {
                                                            <td key={key} className={`text-white bg-gradient-black-white tb-header`}>
                                                                <span>
                                                                    {title.id}
                                                                </span>
                                                            </td>
                                                        })
                                                    }



                                                </tr>
                                            ))
                                        }
                                    </thead>
                                </Table>
                            }
                        </Row>
                    </div>
                </div>
            </main >
            }
        </>
    )
}
export default TimeSheet
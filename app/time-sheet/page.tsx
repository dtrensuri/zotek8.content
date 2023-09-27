'use client'

import SideBar from "../Components/SideBar/SideBar"
import { Row, Container, Form, Button, Table, Pagination, ButtonGroup } from "react-bootstrap"
const _ = require('lodash')
import "./page.scss"
import { useEffect, useState } from 'react';

import axios from 'axios';
import Loading from "../Components/Loading/Loading";
import Searching from '../Components/Loading/searching';
import ResultTimeSheet from '../Components/TableRow/ResultTimeSheet';
import { title } from "process"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Http2ServerResponse } from "http2"
const moment =  require('moment');

const TimeSheet = () => {
    // const router = useRouter();

    const INITIAL_PAGE = 1;
    const INITIAL_PER_PAGE = 50;


    const [alreadyFetched, setAlreadyFetched] = useState(false);
    const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
    const [searching, setSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
    const [resultTimeSheet, setResultTimeSheet] = useState();
    const [tableTimeSheet, setTableTimeSheet] = useState();
    const [searchOption, setSearchOption] = useState(1);
    const [optionsState, setOptionsState] = useState(1);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [sortOption, setSortOption] = useState('DESC');
    const [lastOption, setLastOption] = useState('thisMonth');
    const [numberRecord, setNumberRecord] = useState(0);
    const [numberPage, setNumberPage] = useState(3);

    const HOST = 'http://localhost:8080';

    const sideMenu = {
        'TimeSheet': [
            { title: 'My Timesheet', href: '#', name: '', id: '', class: '', },
            { title: 'My Request', href: '#', name: '', id: '', class: '', },
            { title: 'My Leave', href: '#', name: '', id: '', class: '', },
            { title: 'Member setting', href: '#', name: '', id: '', class: '', },
            { title: 'Holiday', href: '#', name: '', id: '', class: '', }
        ],
        'Manager': [
            { title: 'Confirm request', href: '#', name: '', id: '', class: '', },
            { title: 'Reminder member', href: '#', name: '', id: '', class: '', },
            { title: 'Member leave', href: '#', name: '', id: '', class: '', },
            { title: 'Assign', href: '#', name: '', id: '', class: '', },
            { title: 'Member timesheet', href: '#', name: '', id: '', class: '', },
            { title: 'Member setting', href: '#', name: '', id: '', class: '', }
        ],
        'Help': [
            { title: 'Help', href: '#', name: '', id: '', class: '', },
            { title: 'About', href: '#', name: '', id: '', class: '', },
            { title: 'Feedback', href: '#', name: '', id: '', class: '', },
            { title: 'Calender', href: '#', name: '', id: '', class: '', },
            { title: 'Helpdesk', href: '#', name: '', id: '', class: '', }
        ],
    };

    const tableColumns = [
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
    const shift_morning_in = '08:30:00';
    const shift_morning_out = '12:00:00';
    const shift_afternoon_in = '13:00:00';
    const shift_afternoon_out = '17:30:00';

    const callApiGetTimesheet = async (url: string) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                params: {
                    page: currentPage,
                    perPage: perPage,
                    startDate: startDate,
                    endDate: endDate,
                    orderBy: sortOption,
                },
            });
            handleTimeSheet(response);
        } catch (err) {
            console.error(err);
            alert('An error occurred while fetching timesheet data.');
        }
    };

    const callApiOption: Record<string, string> = {
        thisMonth: `${HOST}/api/user/search-timesheet/this-month`,
        lastMonth: `${HOST}/api/user/search-timesheet/last-month`,
        byDate: `${HOST}/api/user/search-timesheet/find-by-date`,
    };

    const findByOption = () => {
        switch (optionsState) {
            case 1:
                setLastOption('thisMonth');
                callApiGetTimesheet(callApiOption['thisMonth']);
                break;
            case 2:
                setLastOption('lastMonth');
                callApiGetTimesheet(callApiOption['lastMonth']);
                break;
            default:
                break;
        }
    };

    const findByDate = () => {
        setLastOption('byDate');
        callApiGetTimesheet(callApiOption[lastOption]);
    };
    // add Loading??
    const handleSearchTimesheet = (e: any) => {
        setCurrentPage(1);
        switch (searchOption) {
            case 1:
                findByOption();
                break;
            case 2:
                findByDate();
                break;
            default:
                break;
        }
    };

    function diffTime(a : String, b : String) {
        const day_a = new Date('1 Jan 2000 ' + a);
        const day_b = new Date('1 Jan 2000 ' + b);
        return (day_a.getTime() - day_b.getTime()) / (1000*60);
    }

    function transMinuteToHour(minutes: any) {
        const hour = Math.floor(minutes / 60);
        const remainminute = minutes % 60;
        return `${hour}:${remainminute}`;
    }

    const handleTimeSheet = (response: any) => {
        const dataResult = response.data.results;
        const rowDataTimeSheet = dataResult.map((dataRow: any, key: any) => {
          
            const time_in = dataRow.time_in;
            const time_out = dataRow.time_out;
            const only_date = new Date(dataRow.date).toDateString();
            console.log(only_date);
            const late_in = transMinuteToHour(diffTime(time_in, shift_morning_in));
            const early_out = transMinuteToHour(diffTime(shift_afternoon_out, time_out));
            const inoffice = transMinuteToHour(diffTime(time_out, time_in));
            return {
                no: key + 1,
                date: only_date,
                check_in: dataRow.time_in,
                check_out: dataRow.time_out,
                late: dataRow.time_in < shift_morning_in ? "" : late_in ,
                early: dataRow.time_out > shift_afternoon_out ? "" : early_out,
                in_office: inoffice,
                ot: dataRow.time_out < shift_afternoon_out ? "" : transMinuteToHour(diffTime(time_out, shift_afternoon_out)),
                work_time: (time_in < shift_morning_in ) ? (time_out > shift_afternoon_out ? '08:00' : transMinuteToHour(diffTime(time_out, shift_morning_in) - 60)) :  (time_out > shift_afternoon_out ? transMinuteToHour(diffTime(shift_afternoon_out, time_in) - 60) : transMinuteToHour(diffTime(time_out, time_in) - 60)),
                lack: (time_in < shift_morning_in ) ? (time_out > shift_afternoon_out ? '' : early_out) :  (time_out > shift_afternoon_out ? late_in : transMinuteToHour(diffTime(time_in, shift_morning_in) + diffTime(shift_afternoon_out, time_out))),
                action: <ButtonGroup>
                            <Button className="btn btn-default text-primary"><span className="border border-2 border-primary"></span>Forget</Button>
                            <Button className="btn btn-default text-primary" disabled><span className="border border-2 border-primary"></span>Late/Early</Button>
                            <Button className="btn btn-default text-primary"><span className="border border-2 border-primary"></span>Leave</Button>
                        </ButtonGroup>
            };
        });
        
        setNumberPage(response.data.numPage);
        setNumberRecord(response.data.total);
        setResultTimeSheet(rowDataTimeSheet);
    };


    const renderTimesheets = async () => {
        const dataTable = await _.map(resultTimeSheet, (rowData: any, key: any) => {
            return (
                <tr key={key}>
                    {tableColumns.map(({ schema }, key) => (
                        <td key={key}>
                            <span className="d-flex align-item-center justify-content-center">{rowData[schema]}</span>
                        </td>
                    ))}
                </tr>
            );
        });
        setTableTimeSheet(dataTable);
    }

    const renderPagination = () => {
        if (numberPage <= 7) {
            let paginate: any = [];
            for (let i = 1; i <= numberPage; i++) {
                paginate = [...paginate, <Pagination.Item active={i === currentPage} onClick={() => setCurrentPage(i)}>{i}</Pagination.Item>]
            }
            return paginate;
        } else {
            return (
                <>
                    <Pagination.Item onClick={() => setCurrentPage(1)} active={1 === currentPage} >{1}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item active={10 === currentPage} >{10}</Pagination.Item>
                    <Pagination.Item active={11 === currentPage} >{11}</Pagination.Item>
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Item active={13 === currentPage} >{13}</Pagination.Item>
                    <Pagination.Item disabled>{14}</Pagination.Item>

                    <Pagination.Ellipsis />
                    <Pagination.Item onClick={() => setCurrentPage(numberPage)} active={numberPage === currentPage} >{numberPage}</Pagination.Item>
                </>
            )
        }
    }

    const handleSelectPerPage = (e: any) => {
        setPerPage(e.target.value);
    };

    useEffect(() => {
        setCurrentPage(1);
        callApiGetTimesheet(callApiOption[lastOption]);
    }, [perPage]);

    useEffect(() => {
        callApiGetTimesheet(callApiOption[lastOption]);
    }, [currentPage]);

    useEffect(() => {
        if (!alreadyFetched) {
            setAlreadyFetched(true);
        }
    }, [alreadyFetched]);

    useEffect(() => {
        renderTimesheets();
    }, [resultTimeSheet]);

    const sideBarComponents = _.map(sideMenu, (navBarItems: any, sideBarName: any) => (
        <SideBar
            key={sideBarName}
            nameSideBar={sideBarName}
            listNavBar={navBarItems}
        />
    ));



    return (
        <>
            {alreadyFetched === false ? (
                <Loading />
            ) : (
                <main className="custom-container main-container pt-40 d-flex">
                    <div className="main-sidebar">{sideBarComponents}</div>
                    <div className="main-content">
                        <div className="search-timesheet">
                            <div className="title bg-gradient-black-white py-2 ps-4 text-white">
                                My Timesheet
                            </div>
                            <Form className="search-form bg-white border borer-2 mb-3">
                                <div className="d-flex form-group">
                                    <label className="label" htmlFor="select-list">
                                        Choose from list:
                                    </label>
                                    <Form.Check
                                        type="radio"
                                        name="group1"
                                        id="select-list"
                                        inline
                                        defaultChecked={true}
                                        value={1}
                                        onClick={(e: any) => setSearchOption(parseInt(e.target.value))}
                                    />
                                    <Form.Select
                                        className="select-box"
                                        defaultValue={optionsState}
                                        onChange={(e: any) => setOptionsState(parseInt(e.target.value))}
                                    >
                                        <option value={1}>This month</option>
                                        <option value={2}>Last month</option>
                                    </Form.Select>
                                </div>
                                <div className="sort-date d-flex">
                                    <label className="label">
                                        Sort by work date:
                                    </label>
                                    <Form.Select
                                        size="sm"
                                        className="select-sort"
                                        defaultValue={sortOption}
                                        onChange={(e: any) => { setSortOption(e.target.value) }}                                  >
                                        <option value={'ASC'}>Ascending</option>
                                        <option value={'DESC'}>Descending</option>
                                    </Form.Select>
                                </div>

                                <div className="form-group">
                                    <Form.Label className="label" htmlFor="select-day">
                                        Choose start, end:
                                    </Form.Label>
                                    <Form.Check
                                        type="radio"
                                        name="group1"
                                        id="select-day"
                                        inline
                                        value={2}
                                        onClick={(e: any) => setSearchOption(parseInt(e.target.value))}
                                    />
                                    <br />
                                    <div className="select-day">
                                        <Form.Group className="d-flex mb-3 date-group">
                                            <Form.Label className="from-to date-group">
                                                From:
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                size="sm"
                                                className="date ms-2"
                                                onChange={(e: any) => setStartDate(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="d-flex date-group">
                                            <Form.Label className="from-to">
                                                To:
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                className="date ms-2"
                                                size="sm"
                                                onChange={(e: any) => setEndDate(e.target.value)}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <Container className="d-flex justify-content-center p-2">
                                    <div className="btn-row">
                                        <Button className="button1 me-2" onClick={(e: any) => { handleSearchTimesheet(e) }}>
                                            Search
                                        </Button>
                                        <Button className="button1 ms-2">
                                            Reset
                                        </Button>
                                    </div>
                                </Container>
                            </Form>
                        </div>
                        <div className="result-container my-3 bg-white container-fluid">
                            <div className="d-flex total">
                                <label className="my-2">
                                    Total number of records: {numberRecord}
                                </label>
                                <div className="d-flex per-page my-2">
                                    <label className="label">
                                        Sort by work date:
                                    </label>
                                    <select
                                        name="perPage"
                                        className="px-2 ms-2"
                                        defaultValue={perPage}
                                        onChange={(e) => handleSelectPerPage(e)}
                                    >
                                        <option value={25}>--25--</option>
                                        <option value={50}>--50--</option>
                                        <option value={100}>--100--</option>
                                        <option value={150}>--150--</option>
                                    </select>
                                </div>
                            </div>
                            <Row className="table-timesheet">
                                <Table bordered size="sm">
                                    <thead className="table-header">
                                        <tr>
                                            {tableColumns.map(
                                                ({ title }, key) => (
                                                    <th
                                                        key={key}
                                                        className={`text-white bg-gradient-black-white tb-header`}
                                                    >
                                                        <span>{title}</span>
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {tableTimeSheet}
                                    </tbody>
                                </Table>
                            </Row>
                        </div>


                    </div>

                </main>
            )}
        </>
    );

}
export default TimeSheet
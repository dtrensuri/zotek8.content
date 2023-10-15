'use client'

import SideBar from "@/components/sideBar/mainSideBar"
import { Row, Container, Form, Button, Table } from "react-bootstrap"
const _ = require('lodash')
import "./timeSheet.scss"
import { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationBar from '@/components/pagination/pagination';
import { format, differenceInHours, isAfter, isBefore, differenceInMinutes, minutesToHours } from 'date-fns'
import { handleTimeSheets, toHourAndMinute } from '@/controller/handleTime'
import { exportDetailsTimeSheet } from '@/controller/fileController'


const TimeSheet = () => {

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const INITIAL_PAGE = 1;
    const INITIAL_PER_PAGE = 50;

    const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
    const [resultTimeSheet, setResultTimeSheet] = useState();
    const [tableTimeSheet, setTableTimeSheet] = useState();
    const [searchOption, setSearchOption] = useState(1);
    const [optionsState, setOptionsState] = useState(1);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [sortOption, setSortOption] = useState('DESC');
    const [numberRecord, setNumberRecord] = useState(0);
    const [numberPage, setNumberPage] = useState(0);
    const [startDateSearch, setStartDateSearch] = useState<Date>(new Date(year, month, 1));
    const [endDateSearch, setEndDateSearch] = useState<Date>(new Date(year, month, day));

    const HOST = process.env.HOST;


    const tableColumns = [
        { header: 'no', title: 'No' },
        { header: 'date', title: 'Date' },
        { header: 'check_in', title: 'Checkin' },
        { header: 'check_out', title: 'Checkout' },
        { header: 'late', title: 'Late' },
        { header: 'early', title: 'Early' },
        { header: 'in_office', title: 'In office' },
        { header: 'ot', title: 'OT' },
        { header: 'work_time', title: 'Work time' },
        { header: 'lack', title: 'Lack' },
        { header: 'comp', title: 'Comp' },
        { header: 'p_leave', title: 'PLeave' },
        { header: 'u_leave', title: 'ULeave' },
        { header: 'note', title: 'Admin note' },
        { header: 'action', title: 'Action' }
    ];

    const callApiGetTimesheet = async () => {
        try {
            await axios.get(`${HOST}/api/user/search-timesheet/find-by-date`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                params: {
                    page: currentPage,
                    perPage: perPage,
                    startDate: startDateSearch,
                    endDate: endDateSearch,
                    orderBy: sortOption,
                },
            }).then((response: any) => {
                if (response.data) {
                    handleTimeSheets(response.data.results).then((dataTimeSheet: any) => {
                        setResultTimeSheet(dataTimeSheet);
                    });
                    setNumberPage(response.data.numPage);
                    setNumberRecord(response.data.total);
                }
            });

        } catch (err) {
            alert('An error occurred while fetching timesheet data.');
        }
    };

    const handleSearchTimesheet = () => {

        switch (searchOption) {
            case 1:
                switch (optionsState) {
                    case 1:
                        setStartDateSearch(new Date(year, month, 1));
                        setEndDateSearch(new Date(year, month, day));
                        break;
                    case 2:
                        setStartDateSearch(new Date(year, month - 1, 1));
                        setEndDateSearch(new Date(year, month, 0));
                        break;
                    default:
                        break;
                }
                break;
            case 2:
                setStartDateSearch(new Date(startDate));
                setEndDateSearch(new Date(endDate));
                break;
            default:
                break;
        }
    };


    const renderTimesheets = async () => {
        const dataTable = await _.map(resultTimeSheet, (rowData: any, key: any) => {
            type RowTimeSheet = {
                [col: string]: {
                    value: string,
                    class: string,
                };
            };

            const rowTimeSheet: RowTimeSheet = {
                no: {
                    value: rowData.no,
                    class: ''
                },
                date: {
                    value: format(rowData.date, 'yyyy-MM-dd'),
                    class: 'text-primary'
                },
                check_in: {
                    value: format(rowData.check_in, 'HH:mm'),
                    class: rowData.late <= 0 ? '' : 'text-danger',
                },
                check_out: {
                    value: format(rowData.check_out, 'HH:mm'),
                    class: rowData.early <= 0 ? '' : 'text-danger'
                },
                late: {
                    value: toHourAndMinute(rowData.late),
                    class: rowData.late <= 0 ? '' : 'text-danger'
                },
                early: {
                    value: toHourAndMinute(rowData.early),
                    class: rowData.early <= 0 ? '' : 'text-danger'
                },
                in_office: {
                    value: toHourAndMinute(rowData.in_office),
                    class: ''
                },
                ot: {
                    value: toHourAndMinute(rowData.ot),
                    class: ''
                },
                work_time: {
                    value: toHourAndMinute(rowData.work_time),
                    class: ''
                },
                lack: {
                    value: toHourAndMinute(rowData.lack),
                    class: rowData.lack <= 0 ? '' : 'text-danger'
                },
                comp: {
                    value: '',
                    class: ''
                },
                p_leave: { value: '', class: '' },
                u_leave: { value: '', class: '' },
                note: { value: '', class: '' },
                action: { value: '', class: '' },
            }

            return (
                <tr key={key}>
                    {tableColumns.map(({ header }, key) => (
                        <td key={key}>
                            {
                                header === "action" ? (

                                    <span className={`d-flex align-item-center justify-content-center action-header text-primary`}>
                                        {Object.keys(rowData['action']).map((action: any, status: any) => (
                                            <div className="row" key={action}>
                                                <div className="form-check col-4 mx-2">
                                                    <input className="form-check-input" type="checkbox" value="" id={`flexCheckDefault-${action}-${rowTimeSheet['no'].value}`} />
                                                    <label className="form-check-label" htmlFor={`flexCheckDefault-${action}-${rowTimeSheet['no'].value}`}>
                                                        {action}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </span>

                                ) : (
                                    <span className={`d-flex align-item-center justify-content-center ${rowTimeSheet[header].class}`}>
                                        {rowTimeSheet[header].value}
                                    </span>
                                )
                            }


                        </td>
                    ))
                    }
                </tr >
            );
        });
        setTableTimeSheet(dataTable);
    }

    const handleExportData = () => {
        exportDetailsTimeSheet(startDateSearch, endDateSearch);
    }

    const handleSelectPerPage = (e: any) => {
        setPerPage(e.target.value);
    };



    useEffect(() => {
        setCurrentPage(1);
        callApiGetTimesheet();
    }, [perPage]);

    useEffect(() => {
        callApiGetTimesheet();
    }, [currentPage]);

    useEffect(() => {
        renderTimesheets();
    }, [resultTimeSheet]);

    useEffect(() => {
        handleSearchTimesheet();
    }, [startDate, endDate, optionsState, searchOption]);

    useEffect(() => {
        callApiGetTimesheet();
    }, []);

    return (
        <>
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
                            onChange={(e: any) => setSearchOption(parseInt(e.target.value))}
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
                            onChange={(e: any) => setSearchOption(parseInt(e.target.value))}
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
                            <Button className="button1 me-2" onClick={() => { setCurrentPage(1); callApiGetTimesheet() }}>
                                Search
                            </Button>
                            <Button className="button1 ms-2">
                                Reset
                            </Button>
                            <Button className="button1 ms-2" onClick={() => { handleExportData() }}>
                                Export Excel
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
                <Row >
                    <PaginationBar
                        currentPage={currentPage}
                        numberPage={numberPage}
                        setCurrentPage={setCurrentPage}
                    />
                </Row>
            </div>
        </>
    );

}


export default TimeSheet
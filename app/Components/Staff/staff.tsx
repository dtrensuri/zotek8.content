'use client';
import { Row, Col, Container, FormGroup, FormLabel, Form, Button, Table } from "react-bootstrap"
import './staff.scss';
const Staff = () => {
    return (
        <Container>
        <Table striped bordered hover className="font">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>CCCD</th>
                    <th>CreateAt</th>
                    <th>UpdateAt</th>
                </tr>
            </thead>
            <tbody>
                {/* <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr> */}
                
            </tbody>
        </Table>
        </Container>
    )
}
export default Staff

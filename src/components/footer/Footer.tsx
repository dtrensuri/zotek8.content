'use client';

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const footer = (props: any) => {
    return (

        <div className='text-center text-lg-start pt-5 text-muted bg-light footer container-fluid'>
            <section className=''>
                <Container className='text-center text-md-start'>
                    <Row className='pt-3'>
                        <Col md='3' lg='4' xl='3' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <img width={50} height={50} src="https://zotek8.com/wp-content/uploads/2023/07/Zotek8_logo_no-slogan_1-1024x1024.png" alt='...' />
                            </h6>
                            <p>
                                Technology evolves daily, profoundly impacting human lives. We, along with our ecosystem,
                                are here to help you fulfill that mission. But first, let’s take a moment to pause and understand each other,
                                appreciating the fascinating aspects that technology brings forth.
                            </p>
                        </Col>

                        <Col md='2' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>ZOTEK8</h6>
                            <p>
                                <a href='https://zotek8.com/about-us/' className='text-reset'>
                                    About Us
                                </a>
                            </p>
                            <p>
                                <a href='https://zotek8.com/portfolio/' className='text-reset'>
                                    Portfolio
                                </a>
                            </p>
                            <p>
                                <a href='https://zotek8.com/recruitment/' className='text-reset'>
                                    Recruitment
                                </a>
                            </p>
                            <p>
                                <a href='https://zotek8.com/news-blog/' className='text-reset'>
                                    News & Blog
                                </a>
                            </p>
                        </Col>

                        <Col md='3' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>OUR SERVICES</h6>
                            <p>
                                <a href='https://zotek8.com/web-system-development/' className='text-reset'>
                                    Web Development
                                </a>
                            </p>
                            <p>
                                <a href='https://zotek8.com/mobile-app-development/' className='text-reset'>
                                    Mobile App Development
                                </a>
                            </p>
                            <p>
                                <a href='https://zotek8.com/windows-app-development/' className='text-reset'>
                                    Custom Software Development
                                </a>
                            </p>
                            <p>
                                <a href='https://zotek8.com/advanced-technology/' className='text-reset'>
                                    Advanced Technology
                                </a>
                            </p>
                        </Col>

                        <Col md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>ZOTEK8 JSC</h6>
                            <p>
                                <i className="bi bi-house-door-fill me-2 secondary" ></i>
                                7-3-9 Ueno Taito-ku, Tokyo
                            </p>
                            <p>
                                <i className="bi bi-envelope-fill secondary me-2"></i>
                                contant@zotek8.com
                            </p>
                            <p>
                                <i className="bi bi-telephone-fill me-2 secondary"></i>+(84) 85 2222 311 – Vietnamese
                            </p>
                            <p>
                                <i className="bi bi-telephone-fill me-2 secondary"></i>+(81) 807951 9669 – Japanese
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2023 Copyright: Train Contant Zotek8
            </div>
        </div>

    );
}
export default footer;
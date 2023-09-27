'use client'
import { Container, Row, Col } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AppNavbar from '../Components/NavBar/AppNavBar';
import Footer from "../Components/Footers/Footer"
import './Home.scss'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
/>
const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500
  };
  const images = [
    'https://img001.prntscr.com/file/img001/Qy4fVs3KTPCQaiFeBtCt_w.png',
    'https://img001.prntscr.com/file/img001/906HIMz2QoKVZ_I2UKWZYg.png',
    'https://img001.prntscr.com/file/img001/hsyeN2MQQxyXH6nBi4xAHg.png',
    'https://img001.prntscr.com/file/img001/pkwvenYHRNOU5npmATCM9w.png'
  ];

  return (

    <Container >

      <br></br>
      <div>
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <Row>
                  <Col className='text-divider'>
                    <div>
                  <h3><strong>PRODUCT TIMEKEEPES BY TRAIN ZOTEK8</strong></h3>
                  <p>This is the first product of the three brothers. There are still many errors that we hope will be corrected in the near future.</p>
                  </div>
                  </Col>
                  <Col><img src="https://zotek8.com/wp-content/uploads/2023/06/homeTab-1.png" className="d-block w-100" alt="..." /></Col>
                </Row>
                
              </div>
              <div className="carousel-item">
                <img src="https://zotek8.com/wp-content/uploads/2023/06/smartTab.png" className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://zotek8.com/wp-content/uploads/2023/06/proactiveTab.png" className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                </div>
              </div>
            </div>
          </div>
      </div>
      <br></br>
      <br />
      <div>
        <Tabs defaultActiveKey="profile" id="justify-tab-example" className="mb-3" justify >

          <Tab eventKey="home" title="TIMEKEEPING">
            <Row>
              <Col><img src="https://img.timviec.com.vn/2022/05/bang-cham-cong1.jpg" width="100%" height="100%" /></Col>
              <Col className='text-divider'>In the simplest terms, timekeeping is a form of reporting presence at work,
                such as the time an employee arrives at work or leaves work. Based on timesheets,
                business owners as well as human resources and accounting departments will be able to grasp the details
                of the number of days and hours worked by each employee.</Col>
            </Row>
          </Tab>
          <Tab eventKey="profile" title="METHODS">
            <Row>
              <Col><img src="https://www.studytienganh.vn/upload/2021/05/102638.jpg" width="100%" height="100%" /></Col>
              <Col className='text-divider'>
                <div>
                  <h3>Timekeeping</h3>
                  <p>Timekeeping is a form of reporting presence at work, such as the time an employee arrives at work or leaves work.</p>
                  <ul>
                    <li>Time Clock</li>
                    <li>Timekeepers</li>
                    <li>TimeKeepings Sofwares</li>
                  </ul>
                </div>

              </Col>
            </Row>
          </Tab>
        </Tabs>
      </div>
      <br />
      <div className='container'>

        <h2>
          <strong>WE COVER ALL YOUR TECH STACK</strong>
        </h2>
        <h1>Our team and our ecosystem has expertise in almost every programming language.</h1>

      </div>

      <div>
        <Slider {...settings} >
          {images.map((image, index) => (
            <div key={index} className='container d-flex justify-content-center'>
              <img src={image} alt={`Image ${index}`} />
            </div>
          ))}
        </Slider>
      </div>

    
    </Container>



  );
};
export default Home;

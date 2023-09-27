import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';


function footer() {
  return (

    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>


        <div>
          <a href='' className='me-4 '>
            <MDBIcon color='secondary' icon='facebook-f' />
          </a>
          <a href='' className='me-4 '>
            <MDBIcon color='secondary' icon='twitter' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' icon='google' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' icon='instagram' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' icon='linkedin' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                <img width="50px" height="50px" src="https://zotek8.com/wp-content/uploads/2023/07/Zotek8_logo_no-slogan_1-1024x1024.png" />
              </h6>
              <p>
                Technology evolves daily, profoundly impacting human lives. We, along with our ecosystem,
                are here to help you fulfill that mission. But first, let’s take a moment to pause and understand each other,
                appreciating the fascinating aspects that technology brings forth.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
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
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
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
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>ZOTEK8 JSC</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                7-3-9 Ueno Taito-ku, Tokyo
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                contant@zotek8.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' />+(84) 85 2222 311 – Vietnamese
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' />+(81) 807951 9669 – Japanese
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright: Train Contant Zotek8
      </div>
    </MDBFooter>

  );
}
export default footer;

import {useState} from 'react';
import {Button, Container, Navbar, Nav, Form, FormControl} from 'react-bootstrap';
import styled from 'styled-components';

import {FacultyData, MajorData} from '../components/interfaces/InfOther';
import {FacultyCard} from '.././components/Layout/FacultyCard';
import AlertForm from '.././components/Layout/FacultyAlertForm';

const NavStyled = styled.nav`
  .navbar {
    background-color: #674B91;
    justify-content: space-between;
  }

  .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;

    &:hover {
      color: white;
    }
  }

  .navbar-collapse {
    justify-content: flex-end;
  }
`;


function Admin() {
  const [faculties, setFaculties] = useState(Array<FacultyData>());

  const getFacBegin = (data: FacultyData[]):void => {
    setFaculties(data)
  }
  
  return (
    <>
      <NavStyled>
        <Navbar expand='lg' sticky='top' collapseOnSelect>
          <Container fluid>
            <Navbar.Brand> Admin </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Form className='me-auto d-flex'>
                  <FormControl type="search" placeholder="Search here ..." className="me-2" aria-label="Search"/>
                  <Button variant='secondary' size='sm' active>Search</Button>
                </Form>
                <Nav className='mr-auto'>
                  <Nav.Item><Nav.Link>name</Nav.Link></Nav.Item>
                  <Nav.Item><Nav.Link>responsibility</Nav.Link></Nav.Item>
                  <Nav.Item><Nav.Link>position</Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </NavStyled>

      <Container className='p-4' fluid>
        <AlertForm callbackData={getFacBegin}/>
      </Container>

      <Container className='mt-3' style={{ padding: 20}}>
        <FacultyCard FacData={faculties}/>
      </Container>
    </>
  )
}

export default Admin
import {useEffect, useState} from 'react';
import {Button, Card, Container, Row, Col, Navbar, Nav, Form, FormControl} from 'react-bootstrap';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import {default as TreeVA} from '../components/Layout/TreeViewAdmin';

interface CurriData {
  id: string
  name: string
  CatList: CatNodeData[]
}

interface CatNodeData {
  id: string
  name: string
  parentsID?: string
}

const StyledComp = styled.div`
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

function AdminFaculty() {
  const [targetID, setTargetID] = useState<string>('');
  const [Curri, setCurri] = useState(Array<CurriData>());
  const [toggleEditMode, setEditMode] = useState<boolean>(false);

  // const changeModeHandler = () => {
  //   setEditMode(!toggleEditMode)
  // }

  function getLocalCurriData() {
   if(localStorage.getItem('Curri') === null) {
      localStorage.setItem('Curri', JSON.stringify([]));
    }else{
      const getCurr: string | null = localStorage.getItem('Curri');  // Type of getFac always will be a string 
      const CurriDatas: CurriData[] = (typeof getCurr === 'string') ? 
        ( typeof JSON.parse(getCurr) === 'number' ||
          typeof JSON.parse(getCurr) === 'string' ||
          typeof JSON.parse(getCurr) === 'boolean'
        ) ? [] : JSON.parse(getCurr) 
      : alert('Please refresh your web page');

      if(CurriDatas.length > 0) {
        setCurri(CurriDatas);
        //setTargetID(CurriDatas[0].id)
      }
    }
  }
  
  function setLocalCurriData() {
    if(localStorage.getItem('Curri') === null) {
      localStorage.setItem('Curri', JSON.stringify([]));
    }else{
      localStorage.setItem('Curri', JSON.stringify(Curri));
    }
  }

  useEffect(() => {
    getLocalCurriData();
  }, [])

  useEffect(() => {
    setLocalCurriData();
  }, [Curri])

  function createCurriHandler() {
    var randomID: string = Math.floor(Math.random() * 100).toString();
    setCurri([...Curri, 
      {
        id: randomID,
        name: 'New curriculum',
        CatList: [
          { 
            id: Math.floor(Math.random() * 100).toString(),
            name:'General Education', 
            parentsID: randomID
          },
          {
            id: Math.floor(Math.random() * 100).toString(),
            name: 'Field of Specialization', 
            parentsID: randomID
          },
          {
            id: Math.floor(Math.random() * 100).toString(), 
            name: 'Free Elective',
            parentsID: randomID
          }]
      }
    ])
    setTargetID(randomID);
  }

  function deleteCurriHander(CurrID: string): void {
    setCurri([...Curri.filter((curr: CurriData) => curr.id !== CurrID)])
  }

  return (
    <>
        <StyledComp>
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
        </StyledComp>

        <Container style={{padding: 20, display: 'flex', width: '100%'}} fluid>
          <Box sx={{width: '30%', height: 'auto'}}>
            <Button className='text-light' 
                variant='primary' size='lg'
                onClick={createCurriHandler}
                style={{borderRadius: 25, fontWeight: '2rem'}}>
                Add curriculum
            </Button>
            <Col style={{ margin: 10, width: '100%'}}>
              {
                Curri.map((curri: CurriData, index: number) => (
                  <Row md={4} key={index}>
                    <Card onClick={() => setTargetID(curri.id)}
                      bg='secondary' 
                      text='light' 
                      border='secondary' 
                      style={{margin: 10, borderRadius: 20, width: '85%', cursor: 'pointer'}}>
                      <Card.Body>
                        <Card.Title>{curri.name}</Card.Title>
                      </Card.Body>
                      <div className="d-flex justify-content-end">
                        <Button variant='danger' onClick={() => deleteCurriHander(curri.id)}>
                          Del
                        </Button>
                      </div>
                    </Card>
                  </Row>
                ))
              }
            </Col>
          </Box>
          <Box sx={{display: 'flex', '& hr': {mx: 1.5, height: '100%'}, ml: 4}}>
            <Divider orientation='vertical' flexItem />
          </Box>
          <Box sx={{width: '60%', height: 'auto', ml: 7}}>
            <TreeVA CurrTarget={targetID}/>
          </Box>
        </Container>
    </>
  )
}

export default AdminFaculty
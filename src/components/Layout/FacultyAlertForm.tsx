
import React, {useState, useEffect} from 'react';
import {Container, Alert, Button, Form, Col, Row} from 'react-bootstrap';

import {FacultyData, MajorData} from '../interfaces/InfOther';

function AlertForm(prop: {callbackData: (FacData: FacultyData[]) => void}) {
    const [openAlert, setOpenAlert] = useState(false);

    const [nameFac, setNameFac] = useState('');
    const [nameMaj, setNameMaj] = useState('');
    const [itemFac, setItemFac] = useState(Array<FacultyData>());
    const [listMaj, setlistMaj] = useState(Array<MajorData>())

    useEffect(() => {
      getLocalFacData();
    }, [])

    useEffect(() => {
        saveLocalFacData();
        prop.callbackData(itemFac);
    }, [itemFac])

    //Save to Local storage
    function saveLocalFacData() {
      if(localStorage.getItem('items') === null){
          localStorage.setItem('items', JSON.stringify([])); //add the empty array to local storage with key 'items'
        }else{
          localStorage.setItem('items', JSON.stringify(itemFac));
      }
    }

    // Get from Local storage
    function getLocalFacData() {
      if(localStorage.getItem('items') === null) {
          localStorage.setItem('items', JSON.stringify([]));
      }else{
        const getFac: string | null = localStorage.getItem('items');  // Type of getFac always will be a string 
        const facDatas: FacultyData[] = (typeof getFac === 'string') ? 
          ( typeof JSON.parse(getFac) === 'number' ||
            typeof JSON.parse(getFac) === 'string' ||
            typeof JSON.parse(getFac) === 'boolean'
          ) ? [] : JSON.parse(getFac) 
        : alert('Please refresh your web page');
        setItemFac(facDatas);
      }
    }

    function cancleHandler() {
      setOpenAlert(false);
      setlistMaj([]);
    }

    function submitHandler(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (nameFac !== ''){
          var randomID: number = Math.floor(Math.random() * 100);
          setItemFac([...itemFac,
              {
                id: randomID.toString(), 
                name: nameFac,
                MajorList: listMaj
              }
            ]);
            window.open(`Admin/${nameFac}`, '_parent');
        }else{
          alert("Warning : Please enter the faculty name");
        }
        setNameFac('');
        setlistMaj([]);
    };

    function inputFacultyHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setNameFac(event.target.value);
    }

    function addMajorHandler(event: React.MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
      if (nameMaj !== ''){ 
        var amount: number = listMaj.filter((maj: MajorData) => maj.name === nameMaj).length;
        if (amount === 0){
          var randomID: number = Math.floor(Math.random() * 100);
          setlistMaj([...listMaj,
            {
              id: randomID.toString(),
              name: nameMaj
            }
          ])
        }else{
          alert(`Warning : You already have Major's name "${nameMaj}"`)
        }
      }else{
        alert('Warning : Please enter the major name');
      }
      setNameMaj('');
    }

    function deleteMajorHandler(event: React.MouseEvent<HTMLButtonElement>, id: string){
      event.preventDefault();
      var nonDeleted: MajorData[] = listMaj.filter((maj: MajorData) => maj.id !== id);
      setlistMaj(nonDeleted);
    }

    function inputMajorHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setNameMaj(event.target.value);
    }

  return (
    <>
        { !openAlert && 
            <Button className='text-light rounded-pill' 
              variant='primary' size='lg'
              onClick={() => setOpenAlert(true)} 
              style={{fontWeight: '2rem'}}>
              Add more
            </Button>
        }
        <Alert show={openAlert} className='p-20' variant='secondary'>
            <Alert.Heading className='mb-3'>Want to add a new faculty ?</Alert.Heading>
            <hr/>
            <Container>
              <Form>
                <Form.Group className='mb-3 d-flex justify-content-between' controlId='faculty.ControlInput'>
                  <div className='w-100'>
                    <Form.Label>Faculty name</Form.Label>
                    <Form.Control className='w-100'
                      onChange={inputFacultyHandler} 
                      value={nameFac}
                      type='text' 
                      placeholder='Enter the faculty name ...'/>
                    <Form.Text className="text-muted" >
                      * Example "Faculty of engineering"
                    </Form.Text>
                  </div>

                  <div className='ms-3 w-100'>
                    <Form.Label>Major</Form.Label>
                    <div className='d-flex justify-content-start'>
                      <Form.Control className='w-75' 
                        value={nameMaj}
                        type='text' 
                        placeholder='Enter the Major name ...'
                        onChange={inputMajorHandler} />
                      <Button className='ms-3' onClick={addMajorHandler}>
                        Add
                      </Button>
                    </div>
                    <Form.Text className='text-muted'>
                      * You should have at least one major in faculty
                    </Form.Text>
                  </div>
                </Form.Group>

                <Form.Group className='mb-3' controlId='major.ControlInput'>
                  <div className='mt-2 justify-content-start'>
                    <Row>
                      {
                        listMaj.map( (maj: MajorData, id: number) => (
                          <Col md={4} key={id}>
                            <li className='m-2'>
                              {maj.name}
                              <Button className='ms-3 w-5 h-10 rounded-pill'
                                variant='danger' 
                                onClick={(e) => deleteMajorHandler(e, maj.id)}>
                                Delete
                              </Button>
                            </li>
                          </Col>
                        ))
                      }
                    </Row>
                  </div>
                </Form.Group>

                <Form.Group className='mb-3' controlId='description.ControlTextarea1'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as='textarea' placeholder='Write something here ...' rows={3}/>
                </Form.Group>
              </Form>
              <hr/>
              <div className="d-flex justify-content-end">
                <Button onClick={submitHandler} className="me-3" variant='outline-primary' type='submit'>
                  Submit
                </Button>
                <Button onClick={cancleHandler} variant="outline-danger">
                  Cancle
                </Button>
              </div>
            </Container>
        </Alert>
    </>
  )
}

export default AlertForm
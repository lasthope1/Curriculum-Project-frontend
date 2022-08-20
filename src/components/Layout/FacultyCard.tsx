
import React, {useState, useEffect} from 'react';
import {Button, Card, Row, Col, Form} from 'react-bootstrap';
import styled from 'styled-components';
import {FacultyData, MajorData} from '.././interfaces/InfOther';
import {Link} from 'react-router-dom';

const CardStyled = styled.div`
    .card {

    }
`;

function FacultyCard(prop: {FacData: FacultyData[]}) {

  const [inputMaj, setInputMaj] = useState(():string[] => {
    var tempArr: Array<string> = [];
    var Length: number = getLengthFacDatas();
    for(var i: number = 0; i < Length; i++){
      tempArr.push('');
    }
    return tempArr;
  });

  const [newMajData, setnewMajData] = useState<FacultyData>({
    id: '',
    name: '',
    MajorList: []
  });

  function getLengthFacDatas(): number {
    const getFac: string | null = localStorage.getItem('items');  // Type of getFac always will be a string 
    const facDatas: FacultyData[] = (typeof getFac === 'string') ? 
      ( typeof JSON.parse(getFac) === 'number' ||
        typeof JSON.parse(getFac) === 'string' ||
        typeof JSON.parse(getFac) === 'boolean'
      ) ? [] : JSON.parse(getFac) 
    : alert('Please refresh your web page');
    return facDatas.length ;
  }

  useEffect(() => {
    saveLocalnewMajor()
  }, [newMajData])

  function saveLocalnewMajor() {
    if(localStorage.getItem('items') === null){
        localStorage.setItem('items', JSON.stringify([])); //add the empty array to local storage with key 'items'
      }else{
        localStorage.setItem('items', JSON.stringify(prop.FacData));
    }
  }
  
  function inputMajHandler(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    var tempMaj: string[] = [...inputMaj];
    tempMaj[index] = event.target.value;
    setInputMaj(tempMaj);
  }

  function addMajHandler(event: React.MouseEvent<HTMLButtonElement>, index: number) {
    event.preventDefault();
    var changeToEmpty: string[] = [...inputMaj];
    changeToEmpty[index] = '';
    if(inputMaj[index] !== ''){
      var doesExist: number = prop.FacData[index].MajorList.filter((maj: MajorData) => maj.name === inputMaj[index]).length
      if(doesExist){
        alert(`You have major's name "${inputMaj}" already`)
      }else{
        var randomID: number = Math.floor(Math.random() * 100);
        prop.FacData[index].MajorList.push({id: randomID.toString(), name: inputMaj[index]});
        setnewMajData({
          id: prop.FacData[index].id,
          name: prop.FacData[index].name,
          MajorList: prop.FacData[index].MajorList
        });
      }
    }else{
      alert(`Doesn't have new major name`);
    }
    setInputMaj(changeToEmpty);
  }

  return (
    <>
        <CardStyled>
            <Row>
              { prop.FacData.map((data: FacultyData, index: number) => (
                <Col md={4} key={data.id}>
                  <Card  className='shadow border-0 m-2 p-2' style={{borderRadius: 25}}>
                    <Card.Header className='text-center bg-transparent mt-2 fs-4'>{data.name}</Card.Header>
                    <Card.Body>
                      <Card.Text className='mt-2 text-muted'>Majors</Card.Text>
                      <div className=' overflow-scroll justify-content-start' style={{height: 100}}>
                        {
                          data.MajorList.map( (maj: MajorData) => (
                            <Link className='text-decoration-none' to={`/Admin/${maj.name}`}>
                              <li className='m-2' key={maj.id}>
                                {maj.name}
                                {/* <Button className='ms-3' 
                                  variant='danger' 
                                  onClick={(e) => deleteMajorHandler(e, maj.id)}>
                                  Delete
                                </Button> */}
                              </li>
                            </Link>
                          ))
                        }
                      </div>
                      <div className='mt-3 text-end'>
                        <Form.Control key={index}
                          className='d-inline form-control-sm w-75 mw-50 border-top-0 border-start-0 border-end-0'
                          style={{height: 30}}
                          value={inputMaj[index]}
                          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => inputMajHandler(evt, index)}
                          type='text'
                          placeholder='Add major name ...'/>
                        <Button className='ms-2 me-2 rounded-circle fw-bold'
                          onClick={(evt: React.MouseEvent<HTMLButtonElement>) => addMajHandler(evt, index)}
                          variant='warning'>
                            +
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                ))
              }
            </Row>
        </CardStyled>
    </>
  )
}

export { FacultyCard }
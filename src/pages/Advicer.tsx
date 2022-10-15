
import {useState} from 'react';

// Components
import TopBar from '../components/Layout/TopBar';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// Icons
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Interfaces
import {IStudentData, IAdviserData} from '../components/interfaces/InfOther';

function FilteredStudentName(param: {studentData: IStudentData[]}){
  return (
    <div>
        { param.studentData.map(({id, name}: IStudentData) => {
            return ( 
              <div key={id} className="dataItem">
                <p>{name}</p>
              </div>
            );
          })
        }
    </div>
  )
}


// --> Main function component <--
function Adviser() {
  
  return (
    <>
      <TopBar placeholder="Enter student name..." data={studentData} />
      {/* <FilteredStudentName studentData={studentData} /> */}
      <Container sx={{display: 'flex', position: 'absolute', width: '80%', top: '13%', left: '12%'}}>
        <TreeView aria-label="multi-select"
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
            // expanded={expanded}
            // onNodeToggle={handleToggle}
            sx={{ width: '100%', height: 700, flexGrow: 1, overflowY: 'auto'}}
            multiSelect >
            {
                adviserData.advisee.map((stdGroup: {id: string, acm_year: number, students: IStudentData[]}, index: number) => (
                    <TreeItem sx={{marginBottom: '40px'}} key={index} nodeId={stdGroup.id} label={stdGroup.acm_year}>
                      {
                        stdGroup.students.map((std: IStudentData, index: number) => (
                          <TreeItem key={index} nodeId={std.id.toString()} label={
                            <Box>
                              <span style={{marginRight: '40px'}}>{std.s_code}</span>
                              <span>{std.name}</span>
                            </Box>
                          }/>
                        ))
                      }
                    </TreeItem>
                ))
            }
        </TreeView>
      </Container>
    </>
  )
}

export default Adviser;

const studentData: IStudentData[] = [
    {
      id: 1,
      name: "Toon",
      s_code: 610610625,
      year: 4
    },
    {
      id: 2,
      name: "Hok",
      s_code: 610610578,
      year: 4
    },
    {
      id: 3,
      name: "Bam",
      s_code: 610610623,
      year: 4
    },
    {
      id: 4,
      name: "Toro",
      s_code: 610610999,
      year: 4
    },
    {
      id: 5,
      name: "Tii",
      s_code: 610610888,
      year: 4
    },
    {
      id: 6,
      name: "Earn",
      s_code: 610610624,
      year: 4
    },
    {
      id: 7,
      name: "Nat",
      s_code: 610610777,
      year: 4
    },
    {
      id: 8,
      name: "Sam",
      s_code: 610610666,
      year: 1
    }
]

const adviserData: IAdviserData = {
  id: 'adv_01',
  name: 'Chinawat',
  advisee: [
    {
      id: 'acm2561',
      acm_year: 2561,
      students: studentData
    }, 
    {
      id: 'acm2562',
      acm_year: 2562,
      students: studentData
    },
    {
      id: 'acm2563',
      acm_year: 2563,
      students: studentData
    }
  ]
}

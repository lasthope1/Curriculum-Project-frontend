

import TopBar from '../components/Layout/TopBar';
import {DataResult, StudentData} from '../components/interfaces/InfOther';

const studentData: DataResult = {    
  Data: [
    {
      id: 1,
      name: "Toon",
      year: 4
    },
    {
      id: 2,
      name: "Hok",
      year: 4
    },
    {
      id: 3,
      name: "Bam",
      year: 4
    },
    {
      id: 4,
      name: "Toro",
      year: 4
    },
    {
      id: 5,
      name: "Tii",
      year: 4
    },
    {
      id: 6,
      name: "Earn",
      year: 4
    },
    {
      id: 7,
      name: "Nat",
      year: 4
    },
    {
      id: 8,
      name: "Sam",
      year: 1
    }
  ]
}

function FilteredStudentName(param: {studentData: DataResult}){
  return (
    <div>
        { param.studentData.Data.map(({id, name}: StudentData) => {
          console.log(name)
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

export default function Advicer() {
  
  return (
    <>
      <TopBar placeholder="Enter student name..." data={studentData} />
      <FilteredStudentName studentData={studentData} />
    </>
  )
}

interface DataResult {
    Data: StudentData[]
}
  
interface StudentData {
    id: number
    name: string
    year: number
}

interface FacultyData {
    id: string
    name: string
    MajorList: Array<MajorData> // it's the same --> MajorData[] <--
}

interface MajorData {
    id: string
    name: string
}

export type {DataResult, StudentData, FacultyData, MajorData}
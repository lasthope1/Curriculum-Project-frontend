import {Inf_Question, Inf_CatNode, Inf_CourseList, Inf_Course} from '../interfaces/Interfaces' ;
  
interface IStudentData {
    id: number
    name: string
    s_code: number
    year: number
}

interface IAdviserData {
    id: string
    name: string
    advisee: {
        id: string
        acm_year: number
        students: IStudentData[]
    }[]
}

interface Inf_FacultyData {
    id: string
    name: string
    MajorList: Array<Inf_MajorData> // it's the same --> MajorData[] <--
}

interface Inf_MajorData {
    id: string
    name: string
}

interface Inf_CurriData {
    id: string
    name: string
    cat: Array<Inf_CatNode>
    // refList?: Array<Inf_CourseList>
    // refCourse?: Array<Inf_Course>
}

interface Inf_User {
    id: string
    fullname: string
    question: Inf_Question
    data: {
        id: string
        name: string
    }
    gpa?: number
}

export type {IAdviserData, IStudentData, Inf_FacultyData, Inf_MajorData, Inf_User, Inf_CurriData}
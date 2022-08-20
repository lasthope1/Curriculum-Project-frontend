
interface Inf_CatNode{
    // id: string 
    // name: string
    // filter: Inf_Filter[]
    // credits: number
    // refs:string[]
    id: string
    name: string
    refCat: Inf_CatNode[]
    refList: Inf_CourseList[]
    refCourse: Inf_Course[]
    kind: 'CatNode'
}

interface Inf_CourseList{ 
    id: string
    name: string
    courses: Inf_Course[]
    kind: 'CourseList'
}

interface Inf_Course{
    // id: string
    // name: string
    // course_number: string
    // credit: number
    // grade: string
    id: string
    name: string
    kind: 'Course'
}

interface Inf_Filter{
    id: string
    question: Inf_Question
    activation: string[]
}

interface Inf_Question{
    id: string
    question: string
    choices: string[]
}

export type {Inf_CatNode, Inf_CourseList, Inf_Course, Inf_Filter, Inf_Question}

// interface CatNodeData {
//     id: string
//     name: string
//     Catref: (CatNodeData | CourseListData | CourseData) []
//     kind: 'CatNode'
// }

// interface CourseListData {
//     id: string
//     name: string
//     Listref: CourseData[]
//     kind: 'CourseList'
// }

// interface CourseData {
//     id: string
//     name: string
//     kind: 'Course'
// }
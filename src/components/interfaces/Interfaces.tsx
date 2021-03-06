
interface Inf_CatNode{
    id: string 
    name: string
    filter: [Inf_Filter]
    credits: number
    refs:[string]
}

interface Inf_LeafNode{ 
    id: string
    name: string
    courses: [string]
}

interface Inf_Course{
    id: string
    name: string
    course_number: string
    credit: number
    grade: string
}

interface Inf_Filter{
    id: string
    question: Inf_Question
    activation: [string]
}

interface Inf_Question{
    id: string
    question: string
    choices: [string]
}

export type {Inf_CatNode, Inf_LeafNode, Inf_Course, Inf_Filter, Inf_Question}
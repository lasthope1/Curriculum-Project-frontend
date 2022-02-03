import {gql} from '@apollo/client';

const CATNODE_QUERY = gql`
    query{
        catNode{
            id
            name
            credits
            refs
        }
    }
`;

const COURSELISTNODE_QUERY = gql`
    query {
        courseListNode{
            id
            name
            courses
        } 
    }
`;

const COURSE_QUERY = gql`
    query {
        course{
            id
            name
            course_number
            credit
            grade
        }
    }
`

export {CATNODE_QUERY, COURSELISTNODE_QUERY, COURSE_QUERY};
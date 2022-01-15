import {gql} from '@apollo/client';

const CATNODE_QUERY = gql`
    query{
        catNode(id:1){
            name
            credits
        }
    }
`;

const LEAFNODE_QUERY = gql`
    query {
        leafNode{
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
        }
    }
`

export {CATNODE_QUERY, LEAFNODE_QUERY, COURSE_QUERY};
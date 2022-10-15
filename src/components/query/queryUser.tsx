import {gql} from '@apollo/client';

const USERDATA_QUERY = gql `
    query {
        me{
            id
            fullname
            question{
                id
                question
                choice
                answer
            }
            data{
                id
                name
            }
            # fe {
            #     COURSENO
            #     name
            #     credit
            #     grade
            #     status
            # }
            # gpa
        }
    }
`

export {USERDATA_QUERY}
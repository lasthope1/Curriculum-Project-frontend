import {gql} from '@apollo/client';

const StudentQuestion_QUERY = gql`
    query {
        question(id: "62fbff877ffdc09d4fad9f42") {
  	        id
            question
            choice
            answer
	    }
    }
`

const StudentUpdateQuestion_MUTATION = gql`
    mutation updateQuestion($id: string, $answer: string){
        uQuestion(id: "62fbff877ffdc09d4fad9f42", answer: $answer) {
            answer
        }
    }
`

export {StudentQuestion_QUERY, StudentUpdateQuestion_MUTATION}
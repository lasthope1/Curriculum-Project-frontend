import {gql} from '@apollo/client';

const StudentData_QUERY = gql`
    query{
        cat(id: "62dacb43662eaeb25389292c"){
            id
            name
            ...RefCatFields
            ...RefCatRecursive
        }
    }

    fragment RefCatFields on Cat {
        id
        name
        refList {
            id 
            name 
            courses {
                  id
                  name
            }
        }
        refCourse {
            id
            name
        }
    }

    fragment RefCatRecursive on Cat {
        refCat {
        ...RefCatFields
            refCat {
                ...RefCatFields
                refCat {
                    ...RefCatFields
                    refCat {
                        ...RefCatFields
                      	refCat {
                            ...RefCatFields
                          refCat {
                              ...RefCatFields
                            refCat {
                                ...RefCatFields
                              refCat {
                                  ...RefCatFields
                              }
                            }
                          }
                        }
                    }
                }
            }
        }
    }
`;


export {StudentData_QUERY};
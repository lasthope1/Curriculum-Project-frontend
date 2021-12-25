import {Fragment} from 'react';
import {gql, useQuery} from '@apollo/client';
import CatNodeItem from './Item/CatNodeItem';

// interface CatNode {
//     id: string 
//     name: string 
//     credits: number
// }

const CATNODE_QUERY = gql`
    query{
        catNode(id:1){
            id
            name
            credits
        }
    }
`

export default function CatNode() {
    const {loading, error, data} = useQuery(CATNODE_QUERY);
        
    if(loading) return <p>Loading...</p> ;
    if(error) return <p>{error.message}</p>;

        return (
            <Fragment>
                <h1>CatNode</h1>
                <CatNodeItem key={data.catNode.id} props ={data.catNode}/>
            </Fragment>
        )
}


import { Fragment }  from 'react';
import {gql, useQuery} from '@apollo/client';
import LeafNodeItem from './Item/LeafNodeItem';
//import {Query} from '@types/react';

import {LeafNode} from './interfaces/Interfaces';

const LEAFNODE_QUERY = gql`
    query {
        leafNode{
            id
            name
            courses
        } 
    }
`;

export default function Form() {
    const {loading, error, data} = useQuery(LEAFNODE_QUERY);
    
    if(loading) return <p>Loading...</p> ;
    if(error) return <p>{error.message}</p>;

        return (
            <Fragment>
                <h1>LeafNode</h1>
                {
                    data.leafNode.map((node : LeafNode) => (
                        <LeafNodeItem key={node.id} props ={node}/>
                    ))
                }
            </Fragment>
        )
}


import {Fragment} from 'react';
import {useQuery} from '@apollo/client';

import LeafNode from './LeafNode';
import {CATNODE_QUERY} from '../queryData';
import {Inf_CatNode} from '../interfaces/Interfaces';

import Dropdown_btn from '../Layout/DropdownData';


function CatNodeItem(param: {key: any, props: Inf_CatNode, children: JSX.Element}) {

    return (
        <div className="catNode">
            <div className="row">
                <div>
                    <h4>Name : {param.props.name}</h4>
                    <h4>Credits : {param.props.credits}</h4>
                </div>
                <div className="dropdown-btn">
                    <Dropdown_btn>{ param.children }</Dropdown_btn>
                </div>
            </div>
        </div>
    )
}


export default function CatNode() {
    const {loading, error, data} = useQuery(CATNODE_QUERY);
        
    if(loading) return <p>Loading...</p> ;
    if(error) return <p>{error.message}</p>;

    return (
        <Fragment>
            <CatNodeItem key={data.catNode.id} props={data.catNode}>
                <LeafNode/>
            </CatNodeItem>
        </Fragment>
    )
}

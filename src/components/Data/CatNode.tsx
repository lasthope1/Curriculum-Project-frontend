import {Fragment, useState} from 'react';
import {useQuery} from '@apollo/client';
import '../../styles/catNode.css';

import LeafNode from './LeafNode';
import {CATNODE_QUERY} from '../queryData';
import {Inf_CatNode} from '../interfaces/Interfaces';

import Dropdown_btn from '../Layout/DropdownData';


function CatNodeItem(param: {key: any, props: Inf_CatNode, children: JSX.Element}) {
    const [Toggle, setToggle] = useState(false);

    return (
        <div className="box-page">
            <div className="row-catNode">
                <span className="inline-catNode">
                    <Dropdown_btn onChange={Toggle}>{param.children}</Dropdown_btn>
                </span>
                <a className='inline-catNode' onClick={() => setToggle(true)}>
                    {param.props.name}
                </a>
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

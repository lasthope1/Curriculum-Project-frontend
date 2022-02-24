import {Fragment, useState} from 'react';
import {useQuery} from '@apollo/client';
import '../../styles/catNode.css';

import CourseList from './CourseList';
import {CATNODE_QUERY} from '../queryData';
import {Inf_CatNode} from '../interfaces/Interfaces';

function RecursiveElement( parentRef: string[], Element: Inf_CatNode, modeSelected: string[]): JSX.Element{
    var isRecursive: boolean = false;
    for(let i:number = 0; i < parentRef.length; i++){
        if(parentRef[i] === Element.id){
            isRecursive = true;
            break;
        }
    }

    return isRecursive ? 
        <CatNode parentRef={Element.refs} modeSelected={modeSelected}/> : 
        <CourseList parentCatRefs={Element.refs} modeSelected={modeSelected}/>;
}

function CatNodeItem(param: {props: Inf_CatNode, modeSelected: string[] ,children: JSX.Element}) {
    const [Toggle, setToggle] = useState(false);
    const rotate = Toggle ? "rotate(90deg)":"rotate(0)";

    return (
        <>
            <div className="accordion-catNode-item" onClick={() => setToggle(!Toggle)}>
                <div className="inline-catNode">
                    <span>
                        <i className="gg-play-button" 
                            style={{transform: rotate, transition:"all 0.2s linear"}}
                        />
                    </span>
                    &nbsp;&nbsp;
                    <span>{param.props.name}</span>
                </div>
                <span className="inline-catNode">{param.props.credits} credits</span> 
            </div>
            <div>
                {Toggle && param.children}
            </div>
        </>
    )
}

export default function CatNode(param:{parentRef: string[], modeSelected: string[]}) {
    const {loading, error, data} = useQuery(CATNODE_QUERY);

    if(loading) return <p>Loading...</p> ;
    if(error) return <p>{error.message}</p>;

    return (
        <Fragment>
            <div className="accordion-catNode">
                { 
                    data.catNode.map((node: Inf_CatNode) => (
                        <CatNodeItem key={node.id} props={node} modeSelected={param.modeSelected}>
                            {RecursiveElement(param.parentRef, node, param.modeSelected)}
                        </CatNodeItem>
                    ))
                }
            </div>
        </Fragment>
    )
}

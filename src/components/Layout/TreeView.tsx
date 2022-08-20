import {useState, useContext} from 'react';
import {useQuery} from '@apollo/client';
import '../../styles/catNode.css';
import {StudentData_QUERY} from '../queryGraphQL/queryData';

import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import {Inf_CatNode, Inf_CourseList, Inf_Course} from '../interfaces/Interfaces';
import {ModeContext, ModeInf} from '../../pages/Student';

function labelData(node: Inf_CatNode | Inf_CourseList | Inf_Course) {
    return (
        <div className='inline-catNode'>
            <span>{node.name}</span>
        </div>
    )
}
function CourseElement(param: {CourseElement: Inf_Course[]}){
    return (
        <>
            { (param.CourseElement.length !== 0) ?
                param.CourseElement.map((node: Inf_Course, index: number) => 
                <TreeItem key={index} nodeId={node.id} label={labelData(node)}></TreeItem>
                ) : null
            }
        </>
    )
}

function RecursiveElement(param: {CatElement: Inf_CatNode[] , ListElement: Inf_CourseList[], CourseElement: Inf_Course[]}): JSX.Element{

    return (
        <>
            {
                param.CatElement?.map((node: Inf_CatNode, index: number) => 
                    <TreeItem key={index} nodeId={node.id} label={labelData(node)}>
                        <RecursiveElement CatElement={node.refCat} 
                            ListElement={node.refList} 
                            CourseElement={node.refCourse} />
                    </TreeItem>
                )
            }
            {
                param.ListElement?.map((node: Inf_CourseList, index: number) => {
                    // console.log(node.courses)
                    return (<TreeItem key={index} nodeId={node.id} label={labelData(node)}>
                        <RecursiveElement CatElement={[]} 
                            ListElement={[]} 
                            CourseElement={node.courses} />
                    </TreeItem>)
                }
                )
            }
            { 
                param.CourseElement?.map((node: Inf_Course, index: number) => {
                    // console.log(node)
                    return (
                    <TreeItem key={index} nodeId={node.id} label={labelData(node)}></TreeItem>
                    )
                })
            }
        </>
    )
}

export default function TreeViewComponent() {
    const [expanded, setExpanded] = useState<string[]>([])
    // const modeSelected = useContext(ModeContext);
    const {loading, error, data} = useQuery(StudentData_QUERY);
    
    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>{error.message}</p>
    }

    function handleToggle(event: React.SyntheticEvent, nodeIds: string[]) {
        setExpanded(nodeIds);
    };

    async function handleExpandClick() {
        var acc: string[] = [];
        if (expanded.length === 0) {
            await data.cat.refCat.map((node: Inf_CatNode) => acc.push(node.id))
        }
        setExpanded(acc)
    }

    return (
        <Container sx={{display: 'flex', position: 'relative', width: '50%'}}>
            <div className="treeview-wrapper">
                <Box sx={{ mb: 1 }}>
                    <Button onClick={handleExpandClick}>
                        {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
                    </Button>
                </Box>
                <TreeView
                    aria-label="multi-select"
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpandIcon={<ChevronRightIcon/>}
                    expanded={expanded}
                    onNodeToggle={handleToggle}
                    // sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                    sx={{width: '100%'}}
                    multiSelect >
                    {
                        data.cat.refCat.map((node: Inf_CatNode, index: number) => (
                            <TreeItem key={index} nodeId={node.id} label={node.name}>
                                <RecursiveElement CatElement={node.refCat} 
                                    ListElement={node.refList} 
                                    CourseElement={node.refCourse}/>
                            </TreeItem>
                        ))
                    }
                </TreeView>
            </div>
        </Container>
    )
}

interface CurriData {
    id: string
    name: string
    refCat: Inf_CatNode[]
} 

const curriData: CurriData = {
    id: 'CPE58',
    name: 'Computer Engineering 58',
    refCat: [
        {
            id: 'GE01',
            name: 'General Education',
            kind: 'CatNode',
            refCat: [],
            refList: [
                {
                    id: 'Lang02',
                    name: 'Language and Community',
                    kind: 'CourseList',
                    courses: [
                        {
                            id: 'Engl1',
                            name: 'English 1',
                            kind: 'Course'
                        },
                        {
                            id: 'Engl2',
                            name: 'English 2',
                            kind: 'Course'
                        },
                        {
                            id: 'Engl3',
                            name: 'English 3',
                            kind: 'Course',
                        },
                        {
                            id: 'Engl4',
                            name: 'English 4',
                            kind: 'Course'
                        },
                    ]
                },
                {
                    id: 'Learn02',
                    name: 'Learning thought activities',
                    kind: 'CourseList',
                    courses: [
                        {
                            id: '191',
                            name: 'The killer',
                            kind: 'Course'
                        },
                        {
                            id: '192',
                            name: 'The killer 2',
                            kind: 'Course'
                        },
                        {
                            id: '194',
                            name: 'Chill subject',
                            kind: 'Course'
                        }
                    ]
                }
            ],
            refCourse: []
        },
        {
            id: 'FS01',
            name: 'Field of spacialization',
            kind: 'CatNode',
            refCat: [
                {
                    id: 'Maj02',
                    name: 'Major',
                    kind: 'CatNode',
                    refCat: [
                        {
                            id: 'MajReq',
                            name: 'Major requirements',
                            kind: 'CatNode',
                            refCat: [],
                            refList: [
                                {
                                    id: 'Nor58',
                                    name: 'Normal',
                                    kind: 'CourseList',
                                    courses: []
                                }
                            ],
                            refCourse: []
                        },
                        {
                            id: 'MajEle',
                            name: 'Major electives',
                            kind: 'CatNode',
                            refCat: [],
                            refList: [
                                {
                                    id: 'NorEle58',
                                    name: 'Normal Election',
                                    kind: 'CourseList',
                                    courses: []
                                },
                                {
                                    id: 'Coop58',
                                    name: 'Co-opertion Election',
                                    kind: 'CourseList',
                                    courses: []
                                }
                            ],
                            refCourse: []
                        },
                    ],
                    refList: [],
                    refCourse: []
                }
            ],
            refList: [
                {
                    id: 'CC02',
                    name: 'CoreCourse',
                    kind: 'CourseList',
                    courses: [
                        {
                            id: 'Engl1',
                            name: 'English 1',
                            kind: 'Course'
                        },
                        {
                            id: 'Engl2',
                            name: 'English 2',
                            kind: 'Course'
                        },
                        {
                            id: 'Engl3',
                            name: 'English 3',
                            kind: 'Course',
                        },
                        {
                            id: 'Engl4',
                            name: 'English 4',
                            kind: 'Course'
                        },
                    ] 
                }
            ],
            refCourse: []
        }
    ]
}

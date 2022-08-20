import {useState, useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {StudentData_QUERY} from '../queryGraphQL/queryData';

import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';
import AllInboxOutlinedIcon from '@mui/icons-material/AllInboxOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import {Inf_CatNode, Inf_CourseList, Inf_Course} from '../interfaces/Interfaces';

// function handleDoubleClick(event: React.MouseEvent<HTMLElement> , Target: any) {
//     event.preventDefault();
//     setToggleEditMode(true);
//     setTargetName(Target.id);
//     setNameChanged(Target.name);

// }

// function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
//     if(event.key === 'Enter' || event.key === 'Escape'){
//         event.preventDefault();
//         event.stopPropagation();
//         setToggleEditMode(false);
//     }
// }

// function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setNameChanged(event.target.value);
// }

function instanceOfCat(unktNode: Inf_CatNode | Inf_CourseList | Inf_Course): unktNode is Inf_CatNode {
    return 'refList' in unktNode
}

function instanceOfCL(unktNode: Inf_CatNode | Inf_CourseList | Inf_Course): unktNode is Inf_CourseList {
    return 'courses' in unktNode
} 

function labelData(node: Inf_CatNode | Inf_CourseList | Inf_Course , isEditMode: boolean) {

    const typeCheck = (isCat: boolean, isCourseList: boolean) => {
        if(isCat || isCourseList){
            return (
                <Box sx={{display: 'flex', '& hr': {mx: 1.5, height: 'auto'}}}>
                    <IconButton size='small' color='primary' sx={{mx: 1}}>
                        <CreateNewFolderOutlinedIcon fontSize="inherit"/>
                    </IconButton>
                    <IconButton size='small' color='primary' sx={{mx: 1}}>
                        <NoteAddOutlinedIcon fontSize="inherit"/>
                    </IconButton>
                    <Divider orientation='vertical' flexItem />
                    <IconButton size='small' color='error' sx={{mx: 1}}>
                        <DeleteOutlinedIcon fontSize='inherit'/>
                    </IconButton>
                </Box>
                )
        }else {
            return (
                <IconButton size='small' color='error' sx={{mx: 1}}>
                    <DeleteOutlinedIcon fontSize="inherit"/>
                </IconButton>
            )
        }
    }

    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <span style={{paddingRight: '0.5rem'}}>{node.name}</span>
            { isEditMode && typeCheck(instanceOfCat(node), instanceOfCL(node)) }
        </Box>
    )
}

function RecursiveElement(param: { CatElement: Inf_CatNode[] , 
                                ListElement: Inf_CourseList[], 
                                CourseElement: Inf_Course[], 
                                isEditMode: boolean }): JSX.Element{
    return (
        <>
            {
                param.CatElement.map((node: Inf_CatNode, index: number) => 
                    <TreeItem key={index} nodeId={node.id} label={labelData(node, param.isEditMode)}>
                        <RecursiveElement CatElement={node.refCat} 
                            ListElement={node.refList} 
                            CourseElement={node.refCourse} 
                            isEditMode={param.isEditMode}/>
                    </TreeItem>
                )
            }
            {
                param.ListElement.map((node: Inf_CourseList, index: number) => 
                    <TreeItem key={index} nodeId={node.id} label={labelData(node, param.isEditMode)}>
                        <RecursiveElement CatElement={[]} 
                            ListElement={[]} 
                            CourseElement={node.courses} 
                            isEditMode={param.isEditMode}/>
                    </TreeItem>
                )
            }
            {
                param.CourseElement.map((node: Inf_Course, index: number) => 
                    <TreeItem key={index} nodeId={node.id} label={labelData(node, param.isEditMode)}></TreeItem>
                )
            }
        </>
    )
}

export default function TreeViewAdmin(prop: {CurrTarget: string}) {
    const [expanded, setExpanded] = useState<string[]>([]);
    const {loading, error, data} = useQuery(StudentData_QUERY);
    const [toggleMode, setToggleEditMode] = useState<boolean>(false);

    // useEffect(() => {
    //     console.log(toggleMode)
    // }, [toggleMode])
    
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
        const findSub = (node: Inf_CatNode | Inf_CourseList) => {
            if(instanceOfCat(node)) {
                acc.push(node.id)
                node.refCat.map((subNode: Inf_CatNode) => findSub(subNode))
                node.refList.map((sublistNode: Inf_CourseList) => findSub(sublistNode))
            }else{
                acc.push(node.id)
            }
        }

        if (expanded.length === 0) {
            await data.cat.refCat.map((node: Inf_CatNode) => {
                findSub(node)
            })
        }
        setExpanded(acc)
    }

    return (
        <Container sx={{display: 'inline', width: '90%', height: 'auto', mt: 2}}>
            <Box sx={{mb: 1, display: 'flex', justifyContent: 'space-between'}}>
                <Button onClick={handleExpandClick}>
                    {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
                </Button>
                <ButtonGroup onClick={() => setToggleEditMode(!toggleMode)}>
                    { toggleMode ? 
                        <>
                            <Button>Save</Button>
                            <Button>Cancle</Button> 
                        </>
                        : <Button>Edit Mode</Button> 
                    }
                </ButtonGroup>
            </Box>
            <Box>
                <TreeView
                    aria-label="multi-select"
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpandIcon={<ChevronRightIcon/>}
                    expanded={expanded}
                    onNodeToggle={handleToggle}
                    // sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                    sx={{width: '100%', height: 'auto'}}
                    multiSelect >
                    {
                        data.cat.refCat.map((node: Inf_CatNode, index: number) => (
                            <TreeItem key={index} nodeId={node.id} label={labelData(node, toggleMode)}>
                                <RecursiveElement CatElement={node.refCat} 
                                    ListElement={node.refList} 
                                    CourseElement={node.refCourse}
                                    isEditMode={toggleMode}/>
                            </TreeItem>
                        ))
                    }
                </TreeView>
            </Box>
            {   toggleMode &&
                <Box sx={{mt: 1, display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <IconButton size='large' color='primary'>
                        <AddCircleOutlineOutlinedIcon fontSize="inherit"/>
                    </IconButton>
                </Box>
            }
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

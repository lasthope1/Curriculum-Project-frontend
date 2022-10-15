import {useState, useEffect, useContext} from 'react';
import {useMutation, useLazyQuery, useQuery} from '@apollo/client';
import {ModeContext, ModeInf} from '../../pages/Student';
import DashboardSub from '../../components/Layout/DashboardSubject';
import '../../styles/catNode.css';

// Queries and Mutations
import {STUDENT_DATA_QUERY, STUDENT_FE_QUERY, STUDENT_GRADE_QUERY, STUDENT_RESET_QUERY} from '../query/queryData';

// Function helpers
import {instanceOfCat, instanceOfCL} from '../../functions/InstanceOfNodes';

// Components
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

// Icons
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Interfaces
import {Inf_CatNode, Inf_CourseList, Inf_Course} from '../interfaces/Interfaces';

type NodeType = Inf_CatNode | Inf_CourseList | Inf_Course;

function labelData(node: NodeType) {

    function statusCheck(status: string | undefined) {
        switch(status){
            case 'completed' : return 'green'
            case 'inprocess' : return 'orangered'
            default : return 'black'
        }
    }

    function gradeCheck(grade: string | undefined, status: string | undefined){
        switch(grade){
            case "" : {
                if(status === "inprocess"){
                    return "In process"
                }else{
                    return "Pending"
                }
            }
            default : return grade
        }
    }

    if(instanceOfCat(node)){
        return (
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <span>{node.name}</span>
                { (node.credit) ? <span>{node.credit}</span> : null }
            </Box>
        )
    }else if(instanceOfCL(node)){
        return (
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                        color: statusCheck(node.status)}}>
                <span>{node.name}</span>
                <span>{node.newCredit} / {node.credit}</span>
            </Box>
        )
    }else{
        return (
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                        color: statusCheck(node.status)}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: 40}}>{node.COURSENO}</span>
                    <span>{node.name}</span>
                </Box>
                <Box>
                    <span style={{marginRight: (node.grade) ? '11.5rem' : '9.5rem'}}>
                        {gradeCheck(node.grade, node.status)}
                    </span>
                    <span>{node.credit}</span>
                </Box>
            </Box>
        )
    }
}

function RecursiveElement(param: {
        CatElements: Inf_CatNode[], 
        ListElements: Inf_CourseList[], 
        CourseElements: Inf_Course[]
    }): JSX.Element {

    let modeDatas = useContext<ModeInf>(ModeContext).modeSelected
    const [courseEle, setCourseEle] = useState<Array<Inf_Course>>([]);
    
    useEffect(() => {
        setCourseEle([])
        modeDatas.map(async(mode: string) => 
            await param.CourseElements.map(async(node: Inf_Course) => {
                if(node.status === mode){
                    await setCourseEle((prev: Inf_Course[]) => [...prev, node])
                }
            })
        )
    }, [modeDatas])
    
    function typeCheck(node: NodeType, index: number){
        if(instanceOfCat(node)){
            return (
                <RecursiveElement CatElements={node.refCat} 
                    ListElements={node.refList} 
                    CourseElements={[]} />
            )
        }else if(instanceOfCL(node)){
            return (
                <RecursiveElement CatElements={[]} 
                    ListElements={[]} 
                    CourseElements={node.courses} />
            )
        }
    }
        
    function zipWith(arr: Inf_CatNode[] | Inf_CourseList[] | Inf_Course[] ) {
        let tempElement : Array<JSX.Element> = [];
        arr?.map((node: NodeType, index: number) => {
            tempElement = [...tempElement, 
                <TreeItem key={index} nodeId={node.id} label={labelData(node)}>
                    { typeCheck(node, index) }
                </TreeItem>
            ]
        })
        return tempElement;
    }
    

    return (
        <> 
            {zipWith(param.CatElements).map((el: JSX.Element) => el)}
            {zipWith(param.ListElements).map((el: JSX.Element) => el)}
            {zipWith(courseEle).map((el: JSX.Element) => el)}
            {/* {
                param.CatElements?.map((node: Inf_CatNode, index: number) => 
                    <TreeItem key={index} nodeId={node.id} label={labelData(node)}>
                        <RecursiveElement CatElements={node.refCat} 
                            ListElements={node.refList} 
                            CourseElements={[]} />
                    </TreeItem>
                )
            }
            {
                param.ListElements?.map((node: Inf_CourseList, index: number) => {
                    return (
                        <TreeItem key={index} nodeId={node.id} label={labelData(node)}>
                            <RecursiveElement CatElements={[]} 
                                ListElements={[]} 
                                CourseElements={node.courses} />
                        </TreeItem>
                    )
                }
                )
            }
            { 
                param.CourseElements?.map((node: Inf_Course, index: number) => (
                     modeDatas.modeSelected.map((mode: string) => 
                        (node.status === mode) ? 
                            <TreeItem key={index} nodeId={node.id} label={labelData(node)}></TreeItem> 
                            : null
                    )
                ))
            } */}
        </>
    )
}


// --> Main function component <--
function StudentTreeView(param: {userCurriID: string, setAveGPA: (gpa: number) => void}) {
    const [expanded, setExpanded] = useState<string[]>([])
    const [initialData, setInitialData] = useState<Inf_CatNode[]>([])
    const [subjInProc, setSubjInProc] = useState<Inf_Course[]>([])
    const {data, loading} = useQuery(STUDENT_DATA_QUERY, {
        variables: {
            "id" : param.userCurriID
        }
    })

    const [fetchFe] = useLazyQuery(STUDENT_FE_QUERY)
    const [fetchGrade] = useLazyQuery(STUDENT_GRADE_QUERY)
    const [fetchReset] = useLazyQuery(STUDENT_RESET_QUERY)

    const fetchFeData = async() => {
        const res = await fetchFe()
        const feData = res.data.me.data.fe
        await setInitialData((prev: Inf_CatNode[]) => [...prev, feData])
    }

    const fetchGPA = async() => {
        const res = await fetchGrade()
        param.setAveGPA(res.data.me.gpa)
    }

    useEffect(() => {
        setInitialData([]);
        const fetchInitData = async() => {
            if(data){
                data.uCur.cat?.map(async(node: Inf_CatNode) => 
                    await setInitialData((prev: Inf_CatNode[]) => [...prev, node])
                )
                await fetchFeData()
                await fetchGPA()
            }
            fetchReset()
        }

        fetchInitData()
    }, [data])

    if(loading){
        return (
            <Box sx={{ display: 'flex', position: 'absolute', top: '20%', left: '50%' }}>
                <CircularProgress />
            </Box>
        )
    }

    function handleToggle(event: React.SyntheticEvent, nodeIds: string[]) {
        setExpanded(nodeIds);
    };

    async function handleExpandClick() {
        var acc: string[] = [];
        const findSub = async(node: Inf_CatNode | Inf_CourseList | Inf_Course) => {
            acc.push(node.id)
            if(instanceOfCat(node)) {
                await node.refCat?.map((subNode: Inf_CatNode) => findSub(subNode))
                await node.refList.map((sublistNode: Inf_CourseList) => findSub(sublistNode))
            }
        }

        if(expanded.length === 0) {
            await initialData.map((node: Inf_CatNode) => {
                findSub(node)
            })
        }
        setExpanded(acc)
    }

    return (
        <Container sx={{display: 'flex', position: 'absolute', width: '80%', top: '4%', left: '15%'}}>
            <div className="treeview-wrapper">
                <Box sx={{ mb: 1 ,display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Button onClick={handleExpandClick}>
                        {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
                    </Button>
                    <Box>
                        <span style={{marginRight: '9.25rem'}}>Grade</span>
                        <span style={{marginRight: '0.75rem'}}>Credit</span>
                    </Box>
                </Box>
                <TreeView
                    aria-label="multi-select"
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpandIcon={<ChevronRightIcon/>}
                    expanded={expanded}
                    onNodeToggle={handleToggle}
                    sx={{ width: '100%', height: 700, flexGrow: 1, overflowY: 'auto' }}
                    multiSelect >
                    {
                        initialData.map((node: Inf_CatNode, index: number) => (
                            <TreeItem key={index} nodeId={node.id} label={labelData(node)}>
                                <RecursiveElement CatElements={node.refCat} 
                                    ListElements={node.refList} 
                                    CourseElements={[]}/>
                            </TreeItem>
                        ))
                    }
                </TreeView>
            </div>
        </Container>
    )
}

export default StudentTreeView ;

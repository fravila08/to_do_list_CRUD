import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import NewTaskModal from "../components/NewTask";
import { useEffect } from "react";
import AlterTaskModal from "../components/AlterTask";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




const MyTasks = ({user})=>{
    const [tasks, setTasks]=useState([])
    const [modalShow, setModalShow] =useState(false);
    const [alterShow, setAlterShow]= useState(false)
    const [task, setTask]=useState(null)


    const getMyTask=async()=>{
        let response= await axios.get('tasks')
        setTasks(response.data.tasks)
    }
    

    const deleteTask= async(id)=>{
        let response = await axios.delete(`task/${id}`)
        if(response.data.task_deleted){
            await getMyTask()
        }  
    }

    const getTask= async(id)=>{
        let response=await axios.get(`task/${id}`)
        setTask(response.data.task)
        setAlterShow(true)
    }

    useEffect(async()=>{
        getMyTask()
    },[])
    

    return(
        <div>
            {user !== undefined ?
            <Button style={{width:'95vw'}} onClick={() => setModalShow(true)}>Create a Task</Button>
            :
            <h3>You must <a href="/#/signin">Sign In</a> to see your task</h3>
            }
            <NewTaskModal
                show={modalShow}
                getMyTask={getMyTask}
                onHide={() => setModalShow(false)}
            />
            <AlterTaskModal
                show={alterShow}
                task={task}
                getMyTask={getMyTask}
                onHide={() => setAlterShow(false)}
            />
            <br/>
            <br/>
            <Container>
                {tasks.map((task)=>(
                    <Row style={{border:'solid 5px black'}}>
                        <Col >
                            {task.title} 
                        </Col>
                        <Col style={{borderLeft:'solid 5px black', display:'flex', justifyContent:'center'}} xs={3}>
                            <Button onClick={()=>getTask(task.id)}>View/Edit</Button>
                            
                        </Col>
                        <Col style={{borderLeft:'solid 5px black', display:'flex', justifyContent:'center'}} xs={2}>
                            <Button onClick={()=>deleteTask(task.id)}>Delete</Button>
                        </Col>
                    </Row>
                ))}
            </Container>
        </div>
    )
}

export default MyTasks;
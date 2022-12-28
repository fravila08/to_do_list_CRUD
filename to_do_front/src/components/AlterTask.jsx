import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/esm/Form'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';





function AlterTaskModal(props) {
    const [title, setTitle]=useState('')
    const [description, setDescription]=useState('')
    const [date, setDate]=useState('')
    const [alter, setAlter]=useState(true)
    const [task, setTask]=useState(props.task)


    const alterTask=async(id)=>{
      try{
        let response=await axios.put(`task/${id}`,{
            title:title,
            description:description,
            date:date
        })
        props.getMyTask()
        return response.data.update
      }
      catch (err){
        alert(err.message)
        return false
      }
    }
    
  
    useEffect(()=>{
        setTask(props.task)
        if(props.task!==null){
            setTitle(props.task.title)
            setDescription(props.task.description)
            setDate(props.task.date)
        }
    },[props.task])

    

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {task !== null? <p>{task.title}</p> : null}
        </Modal.Title>
      </Modal.Header>
      
        {alter?
        <Modal.Body>
            <p><strong>Description:</strong></p>
            {task !==null? <p>{task.description}</p>:null}
            <br/>
            <p><strong>Date:</strong></p>
            {task !==null? <p>{task.date}</p>:null}
        </Modal.Body>
        :
        <Modal.Body>
            <Form >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={(event)=>setTitle(event.target.value)} type="text" placeholder={task.title} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Descripton</Form.Label>
                        <Form.Control onChange={(event)=>setDescription(event.target.value)} as="textarea" rows={3} placeholder={task.description}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Date</Form.Label>
                        <Form.Control onChange={(event)=>setDate(event.target.value)} type="date" value={date}/>
                    </Form.Group>
            </Form>
        </Modal.Body>
        }
        {alter ?
        <Modal.Footer>
            <Button onClick={()=>{setAlter(false)}}>Edit</Button>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        :
        <Modal.Footer>
            <Button onClick={()=>[alterTask(task.id),setAlter(true), props.onHide()]}>Confirm Edit</Button>
            <Button onClick={()=>setAlter(true)}>Cancel</Button>
        </Modal.Footer>
        }
    </Modal>
  );
}

export default AlterTaskModal;
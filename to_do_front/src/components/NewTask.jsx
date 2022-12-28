import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/esm/Form'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
function NewTaskModal(props) {
    const [title, setTitle]=useState('')
    const [description, setDescription]=useState('')
    const [date, setDate]=useState('')

    const createTask = async()=>{
        let response= await axios.post('tasks',{
            'title':title,
            'description':description,
            'date':date
        })
        props.getMyTask()
    }
    useEffect(()=>{
      setTitle('')
      setDescription('')
      setDate('')
    },[props.show])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a New Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <Form >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={(event)=>setTitle(event.target.value)} type="text" placeholder="Unknown" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Descripton</Form.Label>
                        <Form.Control onChange={(event)=>setDescription(event.target.value)} as="textarea" rows={3} placeholder="None"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Date</Form.Label>
                        <Form.Control onChange={(event)=>setDate(event.target.value)} type="date" />
                    </Form.Group>
            </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>[props.onHide(), createTask()]}>Create</Button>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewTaskModal;
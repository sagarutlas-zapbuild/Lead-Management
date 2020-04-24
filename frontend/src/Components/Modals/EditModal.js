import React from 'react'
import { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const EditModal = (props)=>{
    const [modal, setModal] = useState(false);
    const toggle = ()=>{
        setModal(!modal);
    }

    const [state, setState] = useState({[props.property]: [props.data]})

    const handlechange = (e) =>{
        setState({[props.property]: e.target.value});
    }


   

    return(<div>
        <a href="#" onClick = {toggle}>Edit</a>
        <Modal toggle={toggle} isOpen={modal}>
    <ModalHeader toggle = {toggle}>{props.property}</ModalHeader>
    <ModalBody>
            <input handlechange = {(e)=>handlechange(e)}></input>
            </ModalBody>    
        <ModalFooter></ModalFooter>
        </Modal>
    </div>);
}
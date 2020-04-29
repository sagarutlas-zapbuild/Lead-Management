import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const CommentModal = (props) => {
    const [state, setState] = useState("");
    const [modal, setModal] = useState(false);
    const toggle = () => {
        if (!modal) {
            setState(state);
        }
        else {
            setState("");
        }
        setModal(!modal);
    }

    const handleSubmit = () => {
        const formdata = new FormData();
        formdata.append('comment', state);
        formdata.append('comment_lead', props.lead_id)
        fetch("http://127.0.0.1:8000/comments/",
        {
            method: 'POST',
            body: formdata,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        ).then(response => {
            console.log(response);
        }).then(async () => {
            props.update();
            toggle();
        }).catch(error => {
            console.log(error)
        });
    }


    const handleChange = (e) => {
        e.preventDefault();
        setState(e.target.value);
    }




    return (<div>
        <a href="#" onClick={toggle}>Add</a>
        <Modal toggle={toggle} isOpen={modal}>
            <ModalHeader toggle={toggle}> <b>Comment</b> </ModalHeader>
            <form onSubmit={() => { handleSubmit(); }}>
                <ModalBody>
                    <textarea value={state} onChange={(e) => { handleChange(e); }}></textarea>
                </ModalBody>
                <ModalFooter>
                    <input type="submit" value="Update" />
                </ModalFooter>
            </form>
        </Modal>
    </div>);
}


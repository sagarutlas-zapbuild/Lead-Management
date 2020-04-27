import React from 'react'
import { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { rawProspect } from './ModalTools';

export const EditModal = (props) => {
    const [state, setState] = useState("");
    const [modal, setModal] = useState(false);
    const toggle = () => {
        if (!modal) {
            setState(props.data);
        }
        else {
            setState("");
        }
        setModal(!modal);
    }

    const handleSubmit = () => {
        const options = {
            method: 'PATCH',
            body: JSON.stringify({ [props.property]: state }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        fetch("http://127.0.0.1:8000/leads/" + props.lead_id + "/",
            options
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
        <a href="#" onClick={toggle}>Edit</a>
        <Modal toggle={toggle} isOpen={modal}>
            <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
            <form onSubmit={() => { handleSubmit(); }}>
                <ModalBody>
                    <input value={state} onChange={(e) => { handleChange(e); }}></input>
                </ModalBody>
                <ModalFooter>
                    <input type="submit" value="Update" />
                </ModalFooter>
            </form>
        </Modal>
    </div>);
}

/* const [state, setState] = useState({[props.property]: [props.data]});
setState({[props.property]: e.target.value}); */

export const EditProspectModal = (props) => {
    const [state, setState] = useState(rawProspect);
    const [modal, setModal] = useState(false);
    const toggle = () => {
        if (!modal) {
            setState(props.data)
        }
        else {
            setState(rawProspect);
        }
        setModal(!modal);
    }

    const handleSubmit = () => {
        const options = {
            method: 'PUT',
            body: JSON.stringify(state),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        fetch("http://127.0.0.1:8000/prospects/"+state.prospect_id+"/",
            options
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
        /* e.preventDefault(); */
        setState({...state,
            [e.target.name]:e.target.value});
    }




    return (<div>
        <a href="#" onClick={toggle}>Edit</a>
        <Modal toggle={toggle} isOpen={modal}>
            <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
            <form className="form-horizontal" onSubmit={() => { handleSubmit(); }}>
                <ModalBody>
                    {/* <form className="form-horizontal" action="/action_page.php"> */}

                        <Row>
                            <Col>

                                <div className="form-group">
                                    <label className="control-label col-sm-5">
                                        Full Name
                                    </label>
                                    <input className="control-input col-sm-6" name="prospect_full_name"
                                        value={state.prospect_full_name} onChange={(e) => { handleChange(e); }}
                                        type="Text" width="50px">
                                    </input>
                                </div>
                            </Col>
                            <Col >
                                <div className="dropdown">
                                    <label className="control-label col-sm-5">
                                        Street Address
                                    </label>
                                    <input className="control-input col-sm-6" type="Text" name="prospect_street_address"
                                        value={state.prospect_street_address} onChange={(e) => { handleChange(e); }} width="50px">
                                    </input>

                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>

                                <div className="form-group">
                                    <label className="control-label col-sm-5">
                                        Email
                                    </label>
                                    <input className="control-input col-sm-6"
                                        name="prospect_email"
                                        value={state.prospect_email} onChange={(e) => { handleChange(e); }} width="50px">
                                    </input>

                                </div>
                            </Col>
                            <Col >
                                <div className="dropdown">
                                    <label className="control-label col-sm-5">
                                        City
                                    </label>
                                    <input className="control-input col-sm-6" name="prospect_city"
                                        value={state.prospect_city} onChange={(e) => { handleChange(e); }}
                                        type="Text" width="50px">
                                    </input>

                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col>

                                <div className="form-group">
                                    <label className="control-label col-sm-5">
                                        Company
                                    </label>
                                    <input className="control-input col-sm-6"
                                        type="Text" name="prospect_company" cowidth="50px"
                                        value={state.prospect_company} onChange={(e) => { handleChange(e); }}
                                    >
                                    </input>
                                </div>
                            </Col>
                            <Col >
                                <div className="dropdown">
                                    <label className="control-label col-sm-5">
                                        State
                                        </label>
                                    <input className="control-input col-sm-6" type="Text"
                                        value={state.prospect_state} onChange={(e) => { handleChange(e); }}
                                        name="prospect_state" width="50px">
                                    </input>

                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>

                                <div className="form-group">
                                    <label className="control-label col-sm-5">
                                        Designation
                                    </label>
                                    <input className="control-input col-sm-6" type="Text" name="prospect_designation"
                                        value={state.prospect_designation} onChange={(e) => { handleChange(e); }} width="50px">
                                    </input>
                                </div>
                            </Col>
                            <Col >
                                <div className="form-group">
                                    <label className="control-label col-sm-5">
                                        Country
                                    </label>
                                    <input className="control-input col-sm-6" type="Text"
                                        value={state.prospect_country} onChange={(e) => { handleChange(e); }}
                                        name="prospect_country" width="50px">
                                    </input>

                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <label className="control-label col-sm-5">
                                        Skype Id
                                    </label>
                                    <input className="control-input col-sm-6" type="Text"
                                        value={state.prospect_skype_id} onChange={(e) => { handleChange(e); }}
                                        name="prospect_skype_id" width="50px">
                                    </input>
                                </div>
                            </Col>
                            <Col >
                                <div className="dropdown">
                                    <label className="control-label col-sm-5">
                                        Phone
                                    </label>
                                    <input className="control-input col-sm-6" type="Text" width="50px"
                                        name="prospect_phone"
                                        value={state.prospect_phone} onChange={(e) => { handleChange(e); }}>
                                    </input>


                                </div>

                            </Col>
                        </Row>
                    {/* </form> */}
                </ModalBody>
                <ModalFooter>
                    <input type="submit" value="Update" />
                </ModalFooter>
            </form>
        </Modal>
    </div>);
}
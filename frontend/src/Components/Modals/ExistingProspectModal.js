import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, ListGroupItem, ListGroup, Card, CardBody, Col, CardTitle, CardSubtitle, CardText, Row } from 'reactstrap';
import { MdContactMail, MdContactPhone } from 'react-icons/md';


export const ExistingProspectModal = (props) => {

    const [modal, setModal] = useState(false);
    const [prospectList, setProspectList] = useState([]);

    const toggle = () => {
        if (!modal) {
            fetch("http://localhost:8000/prospects/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    return res.json();
                })
                .then((data) => {
                    setProspectList(data);
                });
        }
        setModal(!modal);
    }

    //template for each prospect item in list
    const ProspectCard = (props) => {
        return (<Card>
            <Row>
                <Col sm="6">
                    <CardBody>
                        <CardTitle>{props.prospect_full_name}</CardTitle>
                        <CardSubtitle>{props.prospect_designation}</CardSubtitle>
                        <CardText>{props.prospect_company}</CardText>
                    </CardBody>
                </Col>
                <Col sm="6">
                    <CardBody>
                    <CardTitle><MdContactMail /></CardTitle>
                    <CardSubtitle>{props.prospect_email}</CardSubtitle>
                    <CardTitle><MdContactPhone /></CardTitle>
                    <CardSubtitle>{props.prospect_phone}</CardSubtitle>
                    </CardBody>
                </Col>
            </Row>
            <Button onClick={()=>{props.selectProspect(props.prospect_id); toggle();}}>Select</Button>
        </Card>)

    }




    return (<>
        <br/>
        <label className="Existing-prospect-label" onClick={toggle}>Existing?</label>
        <Modal className="modal-dailog modal-lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Existing Prospects
        </ModalHeader>
            <ModalBody>
                <ListGroup >
                    {prospectList.map(prospect => {
                        return (
                            <ListGroupItem>
                                <ProspectCard prospect_full_name={prospect.prospect_full_name}
                                    prospect_company={prospect.prospect_company}
                                    prospect_designation={prospect.prospect_designation}
                                    prospect_phone={prospect.prospect_phone}
                                    prospect_email={prospect.prospect_email} 
                                    prospect_id={prospect.prospect_id}
                                    selectProspect={props.selectProspect}/>
                            </ListGroupItem>)
                    })}

                </ListGroup>
            </ModalBody>
        </Modal>
    </>)
}
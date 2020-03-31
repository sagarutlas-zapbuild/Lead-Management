import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
//import {AcceptedModal} from './AcceptedModal'


const NewModal = (props) => {

  const { lead_id, lead_title } = props

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [lead, setLead] = useState(
    {
      lead_description: "",
      lead_source: "",
      lead_url: "",
      lead_domain: "",
      lead_technology: "",
      lead_estimated_budget: "",
      lead_reffered_by: "",
      lead_assignee: "",
      lead_status: "",
      lead_keyword_tags: "",
      lead_date: "",
      lead_prospect: ""
    }
  );

  const [prospect, setProspect] = useState(
    {
      prospect_name:""
    }
  );

  const [closeAll, setCloseAll] = useState(false);
  const toggle = () => {
    if (!modal) {
      fetch("http://localhost:8000/leads/" + lead_id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          return res.json();
        })
        .then((data) => {
          setLead(data);
        })    
    }
    /* if(!modal) {
      
        console.log(lead),
      fetch("http://localhost:8000/prosects/" + lead.lead_prospect, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        return res.json();
      })
      .then((data) => {
        setProspect(data);
      })
    } */
    setModal(!modal);
  }

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }

  return (

    <div>
      <Label className="Radio-label">{lead_title}</Label>
      <input type="radio" name="new" onClick={toggle}></input>
      <Modal className="modal-dailog modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}><b>{lead_title}</b></ModalHeader>
        <ModalBody>
          <div class="container">
            <div class="row">

              <div className="col-sm-8">

                <div
                  className="Description"
                  id="description_new">
                  {lead.lead_description}
                </div>

                
                  <label className="Prospect-label"><b>Prospect Details</b></label>

               
                <div
                  className="top"
                  id="description_new">
                  
                </div>
                
                
                
                <label className="text-center top"><b>Attachements:</b></label>

              </div>
              <div className="col-sm-4">
                <div id="margin1">
                  <div className="sidenav">
                    <div id="margin1">
                      <b>
                        <label style={{ textAlign: "center" }}><font size="3" > NEW</font> </label>
                      </b>
                    </div>

                    <br />
                    <label >TAGS
                    <div
                      id="description_new">
                      {lead.lead_keyword_tags}    
                    </div>
                    </label>
                    <br />

                    
                    <label >DOMAIN<div
                      id="description_new">
                      {lead.lead_domain}    
                    </div></label>
                    
                    <br />

                    
                    <label >TECHNOLOGY
                    <div
                      id="description_new">
                      {lead.lead_technology}    
                    </div>
                    </label>
                    <br />

                    


                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Accept</Button>{' '}
          <Button color="primary" onClick={toggleNested}>Reject</Button>
          {/*props still need to be made.
Hence, complete functionality is still not achieved for second level modal*/}
          <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalHeader>Reason For rejection</ModalHeader>
            <ModalBody>
              <form>
                <div id="margin">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      id="description_new"
                      rows="5" required
                    />

                  </div>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>

              <Button color="primary" onClick={toggle}>Submit</Button>
            </ModalFooter>
          </Modal>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default NewModal; 

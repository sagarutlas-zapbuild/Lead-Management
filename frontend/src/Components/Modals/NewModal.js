
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  setData,
  rawLead,
  rawProspect,
  accepted,
  Header,
  Prospect,
  Description,
  LeadLabel,
  getDate
} from './ModalTools'
//import {AcceptedModal} from './AcceptedModal'


const NewModal = (props) => {

  const { lead_id, lead_title, prospect_id} = props

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [lead, setLead] = useState(rawLead);
  const [prospect, setProspect] = useState(rawProspect);
  const toggle = () => {
    if (!modal) {
      setData(setLead, setProspect, lead_id, prospect_id);
    }
    setModal(!modal);
  }



  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }

  return (

    <div>
      <LeadLabel lead_title={lead_title} toggle={toggle} />
      <Modal className="modal-dailog modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <Header lead_url={lead.lead_url} lead_title={lead_title} />
        </ModalHeader>
        <ModalBody className="Modal-body">
          <div class="container">

            <div class="row">
              <div className="col-sm-8">
                <Description description={lead.lead_description} />
                <Prospect prospect={prospect} />

                <label >
                  <b>Attachements:</b>
                </label>
                
              </div>
              <div className="col-sm-4">
                <div id="margin1">
                  <div className="sidenav">
                      <b><label><font size="3" > NEW</font> </label></b>
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

                    <label >Created on
                    <div
                        id="description_new">
                        {getDate(lead.lead_date)}
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
          <Button color="primary" onClick={e => {
            accepted(lead_id, toggle, props.refresh).then(() => {
              props.refresh();
            });
          }}>
            Accept
              </Button>
          {' '}
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

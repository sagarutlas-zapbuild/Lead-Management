/* eslint-disable */
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { setData, rawLead, rawProspect, Header, Prospect, Description, LeadLabel, MoveTo } from './ModalTools'

export const AcceptedModal = (props) => {
  const { lead_id, lead_title, prospect_id } = props
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [nestedModal1, setNestedModal1] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [lead, setLead] = useState(rawLead);
  const [prospect, setProspect] = useState(rawProspect);
  const toggle = () => {
    if (!modal) {

      setData(setLead, setProspect, lead_id, prospect_id);
      setModal(!modal);

    }
    else {
      setModal(!modal);
    }
  }
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }
  const toggleNested1 = () => {
    setNestedModal1(!nestedModal1);
    setCloseAll(false);
  }





  return (
    <div>
      <LeadLabel lead_title={lead_title} toggle={toggle} />
      <Modal id="acceptedmodal" className="modal-dailog modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <Header lead_url={lead.lead_url} lead_title={lead_title} />
        </ModalHeader>
        <ModalBody>
          <div class="container">
            <div class="row">
              <div class="col-sm-8">
                <Description description={lead.lead_description} />
                <Prospect prospect={prospect} />
                <div className="row">
                  <div class="col-lg-12">
                    <button class="btn btn-secondary float-right">Edit</button>
                  </div>
                </div>
                <div id="margin1" class="float-left w3-border w3-padding">
                  <label className="text-center"><b>Comments</b></label>
                </div>
                <textarea
                  className="top"
                  id="description_new"
                  rows="5" cols="51"
                /*  let value = this.state.data.map(e=>JSON.stringify(e).replace(/{|}/g,'')).join(',\n');
<textarea value={value}  defaultValue="val" /> */
                />
                <div class="row">
                  <div class="col-lg-12">
                    <button onClick={toggleNested} class="btn btn-secondary float-right">Add</button>
                  </div>
                </div>
                <div>
                  <label className="text-center"><b>Attachement</b></label>
                  <input className="control-input col-sm-7" type="file" id="attachment"
                  />
                </div>
              </div>
              <div class="col-sm-4">
                <div id="margin1">
                  <div className="sidenav">
                    <b><label><font size="3" > Accepted</font> </label></b>
                    <MoveTo lead_id={lead_id} toggle={toggle} refresh={props.refresh} />
                    <label >TAGS</label>
                    <textarea
                      id="description_new"
                      rows="3" cols="20" required
                    /*  let value = this.state.data.map(e=>JSON.stringify(e).replace(/{|}/g,'')).join(',\n');
    <textarea value={value}  defaultValue="val" /> */
                    />
                    <div class="row">
                      <div class="col-lg-12">
                        <button class="btn btn-secondary float-right">Edit</button>
                      </div>
                    </div>
                    <label >DOMAIN</label>
                    <br />
                    <textarea
                      id="description_new"
                      rows="3" cols="20" required
                    /*  let value = this.state.data.map(e=>JSON.stringify(e).replace(/{|}/g,'')).join(',\n');
   
    <textarea value={value}  defaultValue="val" /> */
                    />
                    <label >TECHNOLOGY</label>
                    <br />
                    <textarea
                      id="description_new"
                      rows="3" cols="20" required
                    /*  let value = this.state.data.map(e=>JSON.stringify(e).replace(/{|}/g,'')).join(',\n');
   
    <textarea value={value}  defaultValue="val" /> */
                    />
                    <div class="row">
                      <div class="col-lg-12">
                        <button class="btn btn-secondary float-right">Edit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleNested1}>PITCHED</Button>{' '}
          <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalHeader>Comments</ModalHeader>
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
              <Button onClick={toggle} color="primary">Submit</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={nestedModal1} toggle={toggleNested1} onClosed={closeAll ? toggle : undefined}>
            <ModalHeader toggle={toggle}>{lead_title}</ModalHeader>
            <ModalBody>
              <form>
                <label>Estimated Budget ($) : </label>
                <button class="btn btn-secondary float-right">Edit</button>
                <div id="margin">
                  <div className="form-group">
                    <label> Add Remarks/Details</label>
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
              <Button onClick={toggle} color="primary" >Submit</Button>
            </ModalFooter>
          </Modal>

        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AcceptedModal; 
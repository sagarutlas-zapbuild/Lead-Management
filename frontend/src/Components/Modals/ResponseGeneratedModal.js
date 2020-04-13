/* eslint-disable */
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { setData, rawLead, rawProspect, Header, Prospect, Description, LeadLabel, MoveTo } from './ModalTools'

const ReasponseGeneratedModal = (props) => {
  const { lead_id, lead_title, prospect_id } = props
  const [modal, setModal] = useState(false);
  const [lead, setLead] = useState(rawLead);
  const [prospect, setProspect] = useState(rawProspect);
  const toggle = () => {
    if (!modal) {
      setData(setLead, setProspect, lead_id, prospect_id);
      setModal(!modal)
    }
    else {
      setModal(!modal);
    }
  }

  return (
    <div>

      <LeadLabel lead_title={lead_title} toggle={toggle} />

      <Modal className="modal-dailog modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <Header lead_url={lead.lead_url} lead_title={lead_title} />
        </ModalHeader>
        <ModalBody>
          <div class="container">
            <div class="row">

              <div class="col-sm-8">

                <Description description={lead.lead_description} />
                <Prospect prospect={prospect} />
                <div class="row">
                  <div class="col-lg-12">
                    <button class="btn btn-secondary float-right">Edit</button>
                  </div>
                </div>
                <br />
                <br />

                <div id="margin1" class="float-left w3-border w3-padding">
                  <label className="text-center"><b>Comments</b></label>

                </div>
                <textarea
                  className="top"

                  id="description_new"
                  rows="5" cols="51" required
                /*  let value = this.state.data.map(e=>JSON.stringify(e).replace(/{|}/g,'')).join(',\n');
<textarea value={value}  defaultValue="val" /> */
                />
                <br />
                <div>
                  <label className="text-center"><b>Attachement</b></label>
                </div>

              </div>



              <div class="col-sm-4">
                <div id="margin1">
                  <div className="sidenav">
                    <b><label><font size="3" > Response Generated</font> </label></b>
                    <MoveTo lead_id={lead_id} toggle={toggle} refresh={props.refresh} />
                    <br />
                    <label >TAGS</label>
                    <br />

                    <textarea
                      id="description_new"
                      rows="3" cols="20" required
                    /*  let value = this.state.data.map(e=>JSON.stringify(e).replace(/{|}/g,'')).join(',\n');
   ched
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
          <Button color="primary" onClick={e => {
            responseGenerated(lead_id, toggle, props.refresh).then(() => {
              props.refresh();
            });
          }}>Response Generated</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ReasponseGeneratedModal; 
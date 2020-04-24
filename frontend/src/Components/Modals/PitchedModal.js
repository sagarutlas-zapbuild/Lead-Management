/* eslint-disable */
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { setData, rawLead, rawProspect, Header, Prospect, Description, LeadLabel, MoveTo, responseGenerated, SideNav, getDate } from './ModalTools'
import { EditModal } from './EditModal';

const PitchedModal = (props) => {
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

{/*sidebar*/}

              <div className="col-sm-4">
        <div id="margin1">
            <div className="sidenav">
                <b><label><font size="3" > Pitched</font> </label></b>
                <br />
                <MoveTo toggle = {toggle} refresh = {props.refresh} lead_id ={lead.lead_id}></MoveTo>
                <br/>
                <label >TAGS
        <div
                        id="description_new">
                        {lead.lead_keyword_tags}
                    </div>
                    <EditModal lead_id = {lead.lead_id} property = "Tags" data = {lead.lead_keyword_tags}/>
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
                <div class="row">
                    <div class="col-lg-12">
                        <button class="btn btn-secondary float-right">Edit</button>
                    </div>
                </div>
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
            responseGenerated(lead_id, toggle, props.refresh).then(() => {
              props.refresh();
            });
          }}>Response Generated</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PitchedModal; 
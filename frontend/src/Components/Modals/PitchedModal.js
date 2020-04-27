/* eslint-disable */
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { setData, rawLead, rawProspect, Header, Prospect, Description, LeadLabel, MoveTo, responseGenerated, SideNav, getDate } from './ModalTools'
import { EditModal, EditProspectModal } from './EditModal';

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
{console.log(prospect)}
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
                <EditProspectModal update ={() => { setData(setLead, setProspect, lead_id, prospect_id); }} data = {prospect}/>
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
                    <b><label><h3> Pitched</h3> </label></b>
                    <br />
                    <MoveTo toggle={toggle} refresh={props.refresh} lead_id={lead.lead_id}></MoveTo>
                    <br />
                    <label ><b>TAGS</b>
        <div id="description_new">
                        {lead.lead_keyword_tags}
                      </div>
                      <EditModal lead_id={lead.lead_id}
                        title="TAGS"
                        update={() => { setData(setLead, setProspect, lead_id, prospect_id); }}
                        property="lead_keyword_tags"
                        data={lead.lead_keyword_tags} />
                    </label>
                    <br />
                    <label ><b>DOMAIN</b><div
                      id="description_new">
                      {lead.lead_domain}
                    </div></label>
                    <br />
                    <label><b>TECHNOLOGY</b>
        <div id="description_new">
                        {lead.lead_technology}
                      </div>
                      <EditModal lead_id={lead.lead_id}
                        title="TECHNOLOGY"
                        update={() => { setData(setLead, setProspect, lead_id, prospect_id); }}
                        property="lead_technology"
                        data={lead.lead_technology} />
                    </label>
                    <br />
                    <label ><b>Created on</b>
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
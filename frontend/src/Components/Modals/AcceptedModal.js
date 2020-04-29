/* eslint-disable */
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { setData, rawLead, rawProspect, Header, Prospect, Description, LeadLabel, MoveTo, SideNav, getDate } from './ModalTools'
import { EditModal, EditProspectModal } from './EditModal';
import { CommentModal } from './CommentModal';

export const AcceptedModal = (props) => {
  const { lead_id, lead_title, prospect_id } = props
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [nestedModal1, setNestedModal1] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [lead, setLead] = useState(rawLead);
  const [attachments, setAttachments] = useState([{ attachment: "", attachment_id: "" }]);
  const [comments, setComments] = useState([{ comment: "", comment_id: "" }]);
  const [prospect, setProspect] = useState(rawProspect);
  const toggle = () => {
    if (!modal) {

      setData({
        setLead: setLead,
        setProspect: setProspect,
        lead_id: lead_id,
        prospect_id: prospect_id,
        setAttachments: setAttachments,
        setComments: setComments
      });
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
          <div className="container">
            <div class="row">
              <div class="col-sm-8">
                <Description description={lead.lead_description} />
                <Prospect prospect={prospect} />
                <EditProspectModal update={() => { setData(setLead, setProspect, lead_id, prospect_id, setAttachments, setComments); }} data={prospect} />
                <div id="margin1" class="float-left w3-border w3-padding">
                  <label className="text-center"><b>Comments</b></label>
                </div>
                <div className="Description">
                  {comments.map(comment => {
                    return (<label>
                      {" " + comment.comment}
                    </label>)

                  })}
                </div>
                <div class="row">
                  <CommentModal 
                  lead_id = {lead_id}
                  update={() => { setData({lead_id:lead_id, setComments:setComments}); }} />
                </div>
                <div>
                  <label className="text-center"><b>Attachement</b>
                    {attachments.map(attachment => {
                      return (<a href={"http://localhost:8000/get_file/" + attachment.attachment_id + "/"}>
                        {" " + attachment.attachment}
                      </a>)
                    })}
                  </label>
                  <input className="control-input col-sm-7" type="file" id="attachment" onChange={(event)=>{const attachments = new FormData();
    attachments.append('attachment', event.target.files[0]);
    attachments.append('attachment_lead', lead_id);

    fetch("http://127.0.0.1:8000/attachments/",
      {
        method: 'POST',

        body: attachments,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).then(()=>{setData({setComments:setComments, lead_id:lead_id})});}}/>
                </div>
              </div>

              {/*sidebar*/}

              <div className="col-sm-4">
                <div id="margin1">
                  <div className="sidenav">
                    <b><label><h3>Accepted</h3> </label></b>
                    <br />
                    <MoveTo toggle={toggle} refresh={props.refresh} lead_id={lead.lead_id}></MoveTo>
                    <br />
                    <label ><b>TAGS</b>
                      <div id="description_new">
                        {lead.lead_keyword_tags}
                      </div>
                      <EditModal lead_id={lead.lead_id}
                        title="TAGS"
                        update={() => { setData({ setLead: setLead, setProspect: setProspect, lead_id: lead_id, prospect_id: prospect_id }); }}
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
                        update={() => { setData({ setLead: setLead, setProspect: setProspect, lead_id: lead_id, prospect_id: prospect_id }); }}
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
          <Button color="primary" onClick={toggleNested1}>PITCHED</Button>{' '}

        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AcceptedModal; 
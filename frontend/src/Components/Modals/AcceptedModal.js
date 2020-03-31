import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';

 export const AcceptedModal = (props) => {
  const {lead_title, lead_id} = props;
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [nestedModal1, setNestedModal1] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  let lead = {};
  const toggle = () => {
    if (!modal) {
    fetch("http://localhost:8000/leads/"+lead_id, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })
      .then(res => {
          return res.json();
        })
        .then((data) => {
          lead = data
      }) }  
      setModal(!modal);
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
      <Label className="Radio-label">{lead_title}</Label>
      <input type="radio" name="new" onClick={toggle}></input>
      <Modal id="acceptedmodal" className="modal-dailog modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{lead_title}</ModalHeader>
        <ModalBody>
          <div class="container">
            <div class="row">
              <div class="col-sm-8">
                <textarea
                  id="description_new"
                  rows="5" cols="51" required
                /*  let value = this.state.data.map(e=>JSON.stringify(e).replace(/{|}/g,'')).join(',\n')
<textarea value={value}  defaultValue="val" /> */
                />
                <div id="margin1" class="float-left w3-border w3-padding">
                  <label className="text-center "><b>Prospect Detail</b></label>
                </div>
                <textarea
                  className="top"
                  id="description_new "
                  rows="5" cols="51"
                /*  let value = this.state.data.map(e=>JSON.stringify(e).replace(/{|}/g,'')).join(',\n');
<textarea value={value}  defaultValue="val" /> */
                />
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
                    <div id="margin1">
                      <b>
                        <label style={{ textAlign: "center" }}><font size="3" >Accepted</font> </label>
                      </b>
                    </div>
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
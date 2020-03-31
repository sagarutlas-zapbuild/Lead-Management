import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';

const PitchedModal = (props) => {
  const {lead_title, lead_id} = props;

  const [modal, setModal] = useState(false);
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


  return (
    <div>

      <Label className="Radio-label">{lead_title}</Label>
      <input type="radio" name="new" onClick={toggle}></input>

      <Modal className="modal-dailog modal-lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{lead_title}</ModalHeader>
        <ModalBody>
          <div class="container">
            <div class="row">

              <div class="col-sm-8">

                <textarea

                  id="description_new"
                  rows="5" cols="51" required
                /*  let value = this.state.data.map(e=>JSON.stringify(e).replace(/{|}/g,'')).join(',\n');
<textarea value={value}  defaultValue="val" /> */
                />
                <div id="margin1" className="float-left w3-border w3-padding">
                  <label className="text-center"><b>Prospect Detail</b></label>

                </div>
                <textarea
                  className="top"
                  id="description_new"
                  rows="5" cols="51" required
                /*  let value = this.state.data.map(e=>JSON.stringify(e).replace(/{|}/g,'')).join(',\n');
<textarea value={value}  defaultValue="val" /> */

                />
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
                    <div id="margin1">
                      <b>
                        <label className="text-center"><font size="3" >Pitched</font> </label>
                      </b>
                    </div>

                    <br />
                    <label >TAGS</label>
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
          <Button color="primary" onClick={toggle}>Response Generated</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PitchedModal; 
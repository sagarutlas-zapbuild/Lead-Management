import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Label, Button } from 'reactstrap'
import { ExistingProspectModal } from './Modals/ExistingProspectModal';

class Leadform extends React.Component {

  constructor(props) {
    super(props);
    this.initialState =
    {
      lead_title: '',
      lead_source: '',
      lead_description: '',
      lead_url: '',
      lead_domain: '',
      lead_technology: '',
      lead_estimated_budget: '',
      lead_reffered_by: '',
      lead_assignee: '',
      lead_prospect: '',
      lead_keyword_tags: '',

      fixed_prospect: false,

      prospect_full_name: '',
      prospect_company: '',
      prospect_designation: '',
      prospect_skype_id: '',
      prospect_street_address: '',
      prospect_city: '',
      prospect_state: '',
      prospect_country: '',
      prospect_email: '',
      prospect_phone: '',

      attachments: FileList,
      attachment_lead: '',
    }
    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.selectProspect = this.selectProspect.bind(this);
    this.clearProspect = this.clearProspect.bind(this)
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });

  }

  handleFiles(event) {
    const value = (event.target.files[0]);
    this.setState({ attachments: value });
  }

  clearProspect() {
    this.setState({
      lead_prospect: '',
      prospect_full_name: '',
      prospect_company: '',
      prospect_designation: '',
      prospect_skype_id: '',
      prospect_street_address: '',
      prospect_city: '',
      prospect_state: '',
      prospect_country: '',
      prospect_email: '',
      prospect_phone: '',
      fixed_prospect: false
    })
  }

  selectProspect = async (prospect_id) => {
    fetch("http://localhost:8000/prospects/" + prospect_id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        return res.json();
      })
      .then(async (response) => {
        this.setState(response);
        this.setState({ lead_prospect: response.prospect_id });
        this.setState({ fixed_prospect: true });
      });
  }

  
  handleSubmit = async (event) => {
    event.preventDefault();
    //If prospect is not fixed, POST it and then set the lead_prospect

    if (!this.state.fixed_prospect) {
      const prospect = new FormData(); 
      prospect.append('prospect_full_name', this.state.prospect_full_name);
      prospect.append('prospect_company', this.state.prospect_company);
      prospect.append('prospect_designation', this.state.prospect_designation);
      prospect.append('prospect_skype_id', this.state.prospect_skype_id);
      prospect.append('prospect_street_address', this.state.prospect_street_address);
      prospect.append('prospect_city', this.state.prospect_city);
      prospect.append('prospect_state', this.state.prospect_state);
      prospect.append('prospect_country', this.state.prospect_country);
      prospect.append('prospect_phone', this.state.prospect_phone);
      prospect.append('prospect_email', this.state.prospect_email);
      
      let response = await fetch("http://127.0.0.1:8000/prospects/",
        {
          method: 'POST',

          body: prospect,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      response = await response.json();
      this.setState({lead_prospect: response.prospect_id});

        
    }

    const lead = new FormData();


    lead.append('lead_title', this.state.lead_title);
    lead.append('lead_source', this.state.lead_source);
    lead.append('lead_description', this.state.lead_description);
    lead.append('lead_url', this.state.lead_url);
    lead.append('lead_domain', this.state.lead_domain);
    lead.append('lead_technology', this.state.lead_technology);
    lead.append('lead_estimated_budget', this.state.lead_estimated_budget);
    lead.append('lead_reffered_by', this.state.lead_reffered_by);
    lead.append('lead_assignee', this.state.lead_assignee);
    lead.append('lead_prospect', this.state.lead_prospect);
    lead.append('lead_keyword_tags', this.state.lead_keyword_tag);


    let response = await fetch("http://127.0.0.1:8000/leads/",
      {
        method: 'POST',

        body: lead,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    response = await response.json();
    this.setState({attachment_lead: response.lead_id});

    const attachments = new FormData();
    attachments.append('attachment', this.state.attachments);
    attachments.append('attachment_lead', this.state.attachment_lead);

    fetch("http://127.0.0.1:8000/attachments/",
      {
        method: 'POST',

        body: attachments,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

  }

  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <div id="margin">
            <b>
              <label>  <h2>New Lead</h2>
              </label>
              <br />
              <div>
                <Row>
                  <Col>
                    <div className="form-group">
                      <label >
                        Title*
            </label>
                      <input type="text"
                        className="form-control"
                        name="lead_title"
                        value={this.state.lead_title} onChange={this.handleChange}
                      />
                    </div>
                  </Col>
                  <Col >
                    <div className="form-group">
                      <label>Source*</label><br></br>
                      <select name="lead_source" value={this.state.lead_source} onChange={this.handleChange} className="form-control">
                        <option>choose any one</option>
                        <option select>java</option>
                        <option select>php</option>
                      </select>
                    </div>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col>
                  <div className="form-group">
                    <label >
                      Description
            </label>
                    <textarea
                      className="form-control"
                      rows="8" required
                      name="lead_description"
                      value={this.state.lead_description} onChange={this.handleChange}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <label>
                      URL
            </label>
                    <input type="url"
                      className="form-control"
                      name="lead_url"
                      value={this.state.lead_url} onChange={this.handleChange}
                    />
                    <div className="form-group">
                      <label>
                        Domain
            </label>
                      <input type="text"
                        className="form-control"
                        name="lead_domain"
                        value={this.state.lead_domain} onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Keyword Tags
            </label>
                      <input type="text"
                        className="form-control"
                        name="lead_keyword_tags"
                        value={this.state.lead_keyword_tags} onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-group">
                    <label className="control-label col-sm-9">
                      Attachment
            </label>
                    <input type="file" name="attachment" multiple
                      onChange={this.handleFiles}
                    />

                  </div>
                </Col>
                <Col >
                  <div className="form-group">
                    <label>Technology*</label><br></br>
                    <select name="lead_technology" value={this.state.lead_technology} onChange={this.handleChange} className="form-control">
                      <option>choose any one</option>
                      <option select>django</option>
                      <option select>python</option>
                    </select>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-group">
                    <label className="control-label col-sm-5">
                      Estimated Budget($)
            </label>
                    <input className="control-input col-sm-7" name="lead_estimated_budget" type="Text"
                      value={this.state.lead_estimated_budget} onChange={this.handleChange} width="50px">
                    </input>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-5">
                      Referred By
            </label>
                    <input className="control-input col-sm-7"
                      type="Text"
                      name="lead_reffered_by"
                      value={this.state.lead_reffered_by} onChange={this.handleChange}
                      width="50px">
                    </input>
                  </div>
                </Col>
                <Col >
                  <div className="dropdown">
                    <label className="control-label col-sm-6">
                      Assignee*
            </label>
                    <br />
                    <label className="control-label col-sm-6">
                      <input type="radio" ></input>

                      Assigned To

            </label>
                    <select name="lead_assignee" value={this.state.lead_assignee} onChange={this.handleChange} className="control-label col-sm-6">
                      <option>choose any one</option>
                      <option select>Aman</option>
                      <option select>Sagar</option>

                    </select>
                  </div>
                </Col>
              </Row>
              <row>
                <div className="form-group">
                  <Col>
                    <Label value="Prospect Detail" className="text-center">Prospect Details</Label>
                    <ExistingProspectModal selectProspect={this.selectProspect} />
                    <Button onClick={this.clearProspect} >
                      Clear Prospect Details
                      </Button>
                  </Col>
                </div>
              </row>
              <div id="border">
                <div id="margin">

                  <fieldset disabled={this.state.fixed_prospect}>
                    <form className="form-horizontal" action="/action_page.php">

                      <Row>
                        <Col>

                          <div className="form-group">
                            <label className="control-label col-sm-5">
                              Full Name
            </label>
                            <input className="control-input col-sm-6" name="prospect_full_name"
                              value={this.state.prospect_full_name} onChange={this.handleChange}
                              type="Text" width="50px">
                            </input>
                          </div>
                        </Col>
                        <Col >
                          <div className="dropdown">
                            <label className="control-label col-sm-5">
                              Street Address
            </label>
                            <input className="control-input col-sm-6" type="Text" name="prospect_street_address"
                              value={this.state.prospect_street_address} onChange={this.handleChange} width="50px">
                            </input>

                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>

                          <div className="form-group">
                            <label className="control-label col-sm-5">
                              Email
            </label>
                            <input className="control-input col-sm-6"
                              name="prospect_email"
                              value={this.state.prospect_email} onChange={this.handleChange} width="50px">
                            </input>

                          </div>
                        </Col>
                        <Col >
                          <div className="dropdown">
                            <label className="control-label col-sm-5">
                              City
            </label>
                            <input className="control-input col-sm-6" name="prospect_city"
                              value={this.state.prospect_city} onChange={this.handleChange}
                              type="Text" width="50px">
                            </input>

                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col>

                          <div className="form-group">
                            <label className="control-label col-sm-5">
                              Company
            </label>
                            <input className="control-input col-sm-6"
                              type="Text" name="prospect_company" cowidth="50px"
                              value={this.state.prospect_company} onChange={this.handleChange}
                            >
                            </input>
                          </div>
                        </Col>
                        <Col >
                          <div className="dropdown">
                            <label className="control-label col-sm-5">
                              State
            </label>
                            <input className="control-input col-sm-6" type="Text"
                              value={this.state.prospect_state} onChange={this.handleChange}
                              name="prospect_state" width="50px">
                            </input>

                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>

                          <div className="form-group">
                            <label className="control-label col-sm-5">
                              Designation
            </label>
                            <input className="control-input col-sm-6" type="Text" name="prospect_designation"
                              value={this.state.prospect_designation} onChange={this.handleChange} width="50px">
                            </input>
                          </div>
                        </Col>
                        <Col >
                          <div className="form-group">
                            <label className="control-label col-sm-5">
                              Country
            </label>
                            <input className="control-input col-sm-6" type="Text"
                              value={this.state.prospect_country} onChange={this.handleChange}
                              name="prospect_country" width="50px">
                            </input>

                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="form-group">
                            <label className="control-label col-sm-5">
                              Skype Id
            </label>
                            <input className="control-input col-sm-6" type="Text"
                              value={this.state.prospect_skype_id} onChange={this.handleChange}
                              name="prospect_skype_id" width="50px">
                            </input>
                          </div>
                        </Col>
                        <Col >
                          <div className="dropdown">
                            <label className="control-label col-sm-5">
                              Phone
            </label>
                            <input className="control-input col-sm-6" type="Text" width="50px"
                              name="prospect_phone"
                              value={this.state.prospect_phone} onChange={this.handleChange}>
                            </input>


                          </div>

                        </Col>
                      </Row>
                    </form>
                  </fieldset>
                </div>
              </div>
            </b>
            <br />
            <Row>
              <Col>

                <button className="text-center" type="submit" value="Submit And New" id="Submit_and_new">
                  Submit And New
              </button>
              </Col>
              <Col>

                <input className="text-center" type="submit" value="Submit" id="submit">
                </input>
              </Col>
              <Col>

                <input className="text-center" type="Button" value="Cancel" id="cancel">
                </input>
              </Col>

            </Row>
          </div>

        </form>
      </Container>
    );
  }
}

export default Leadform;
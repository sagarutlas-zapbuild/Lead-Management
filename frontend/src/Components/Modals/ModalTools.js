import React from 'react';
import { Label } from 'reactstrap';
import Dropdown from 'react-bootstrap/Dropdown'

//Sample states for lead and prospect 
export const rawLead =
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
};


export const rawProspect =
{
    prospect_id: -1,
    prospect_full_name: "",
    prospect_company: "",
    prospect_designation: "",
    prospect_skype_id: "",
    prospect_street_address: "",
    prospect_city: "",
    prospect_state: "",
    prospect_country: "",
    prospect_phone: "",
    prospect_email: ""
};

//Lead label and toggle button for dashboard
export const LeadLabel = (props) => {
    const { lead_title, toggle } = props;
    return (<><Label className="Radio-label">{lead_title}</Label>
        <input type="radio" name="new" onClick={toggle}></input></>);
}

//To Change Status of the lead
const statusUpdate = (lead_id, status) => {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({ "lead_status": status }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    fetch("http://127.0.0.1:8000/leads/" + lead_id + "/",
        options
    ).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error)
    });

}

/* Remove this one */
export const setToNew = async (lead_id, toggle) => {
    statusUpdate(lead_id, "New");
    toggle();
}
/* Till here */

export const accepted = async (lead_id, toggle) => {
    statusUpdate(lead_id, "Accepted");
    toggle();
}

export const pitched = async (lead_id, toggle) => {
    statusUpdate(lead_id, "Pitched");
    toggle();
}

export const responseGenerated = async (lead_id, toggle) => {
    statusUpdate(lead_id, "Response Generated");
    toggle();
}

export const needAnalysis = async (lead_id, toggle) => {
    statusUpdate(lead_id, "Need Analysis");
    toggle();
}

export const wireframing = async (lead_id, toggle) => {
    statusUpdate(lead_id, "Wireframing");
    toggle();
}

export const negotiation = async (lead_id, toggle) => {
    statusUpdate(lead_id, "Negotiation");
    toggle();
}

export const closedAsWon = async (lead_id, toggle) => {
    statusUpdate(lead_id, "Closed as Won");
    toggle();
}

export const closedAsLost = async (lead_id, toggle) => {
    statusUpdate(lead_id, "Closed as Lost");
    toggle();
}


//Display Header
export const Header = (props) => {
    const { lead_title, lead_url } = props;
    return (<><strong>
        {lead_title + "   "}
    </strong>
        <small>
            <a href={lead_url}>
                {"(" + lead_url + ")"}
            </a>
        </small></>);
}

//Set Lead and Prospect and attachments Data in Modal  setLead: false, setProspect: false, lead_id: false, prospect_id: false, setAttachments: false, setComments: false 
export const setData = async (args = {}) => {
    if (args.setLead) {
        fetch("http://localhost:8000/leads/" + args.lead_id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                return res.json();
            })
            .then((data) => {
                args.setLead(data);
            });
    }

    if (args.setProspect) {
        fetch("http://localhost:8000/prospects/" + args.prospect_id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                return res.json();
            })
            .then((data) => {
                args.setProspect(data);
            });
    }

    if (args.setAttachments) {
        fetch("http://localhost:8000/lead_attachments/" + args.lead_id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                return res.json();
            })
            .then((data) => {
                args.setAttachments(data);
            });
    }

    if (args.setComments) {
        fetch("http://localhost:8000/lead_comments/" + args.lead_id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                return res.json();
            })
            .then((data) => {
                args.setComments(data);
            });
    }

}

export const getDate = (date) => {
    date = new Date(date);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + "-" + mm + "-" + yyyy;
}

export const Prospect = (props) => {
    const { prospect } = props;
    return (<div className="Prospect-box">
        <label className="Prospect-label">
            <b>Prospect Details
                            </b>
        </label>
        <div className="Prospect-details">
            {prospect.prospect_full_name + " "}
                  ({prospect.prospect_designation})
                  <br />
            {prospect.prospect_company}
            <br />
            {prospect.prospect_email}
            <br />
            {prospect.prospect_skype_id}
            <br />
            {prospect.prospect_street_address +
                ", " + prospect.prospect_city +
                ", " + prospect.prospect_state +
                ", " + prospect.prospect_country}
            <br />
            {prospect.prospect_phone}
        </div>
    </div>)
}

export const Description = (props) => {
    const { description } = props;
    return (<div
        className="Description"
        id="description_new">
        {description}
    </div>)
}


const MoveToToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href="/#"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const MoveToMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <ul className="list-unstyled">
                    {React.Children.toArray(children).map((child) => { return (child) })}
                </ul>
            </div>
        );
    },
);





export const MoveTo = (props) => {

    return (
        <Dropdown>
            <Dropdown.Toggle as={MoveToToggle} id="dropdown-custom-components">
                Move to
        </Dropdown.Toggle>

            <Dropdown.Menu as={MoveToMenu}>
                {/* remove this one */}
                <Dropdown.Item onClick={(e) => { setToNew(props.lead_id, props.toggle).then(() => props.refresh()) }}>
                    New
          </Dropdown.Item>
                {/* till here */}
                <Dropdown.Item onClick={(e) => { accepted(props.lead_id, props.toggle).then(() => props.refresh()) }}>
                    Accepted
                    </Dropdown.Item>
                <Dropdown.Item onClick={(e) => { pitched(props.lead_id, props.toggle).then(() => props.refresh()) }}>
                    Pitched
                    </Dropdown.Item>
                <Dropdown.Item onClick={(e) => { responseGenerated(props.lead_id, props.toggle).then(() => props.refresh()) }}>
                    Response Generated
          </Dropdown.Item>
                <Dropdown.Item onClick={(e) => { needAnalysis(props.lead_id, props.toggle).then(() => props.refresh()) }}>
                    Need Analysis
          </Dropdown.Item>
                <Dropdown.Item onClick={(e) => { wireframing(props.lead_id, props.toggle).then(() => props.refresh()) }}>
                    Wireframing
          </Dropdown.Item>
                <Dropdown.Item onClick={(e) => { negotiation(props.lead_id, props.toggle).then(() => props.refresh()) }}>
                    Negotiation
          </Dropdown.Item>
                <Dropdown.Item onClick={(e) => { closedAsWon(props.lead_id, props.toggle).then(() => props.refresh()) }}>
                    Closed as won
          </Dropdown.Item>
                <Dropdown.Item onClick={(e) => { closedAsLost(props.lead_id, props.toggle).then(() => props.refresh()) }}>
                    Closed as lost
          </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>)
}


export const SideNav = (props) => {
    return (<div className="col-sm-4">
        <div id="margin1">
            <div className="sidenav">
                <b><label><font size="3" > {props.status}</font> </label></b>
                <br />
                <MoveTo toggle={props.toggle} refresh={props.refresh}></MoveTo>
                <label >TAGS
        <div
                        id="description_new">
                        {props.lead_keyword_tags}
                    </div>
                </label>
                <div class="row">
                    <div class="col-lg-12">
                        <button class="btn btn-secondary float-right">Edit</button>
                    </div>
                </div>
                <br />
                <label >DOMAIN<div
                    id="description_new">
                    {props.lead_domain}
                </div></label>
                <br />
                <label >TECHNOLOGY
        <div
                        id="description_new">
                        {props.lead_technology}
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
                        {getDate(props.lead_date)}
                    </div>
                </label>
                <br />
            </div>
        </div>
    </div>)
}











//remove any code below this line


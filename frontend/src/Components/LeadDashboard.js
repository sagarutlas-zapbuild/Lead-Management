import React from 'react';
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading, Col, Row } from 'reactstrap'
import ModalConductor from './Conductors/ModalConductor'
import { Redirect } from 'react-router-dom';



class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            leads: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:8000/leads/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                return res.json();
            })
            .then((data) => {
                this.setState({ leads: data })
                console.log(this.state.leads)
            })

    }


    Lead_filter = (status) => {
        return this.state.leads.filter(lead => { return lead.lead_status === status })
    }


    render() {
        try {
            return (
                <Container fluid={true} className="Full-screen">
                    <Row className="Dashboard">

                        <Col sm="11">
                            <Container className="List-container">

                                <h2>Lead Dashboard </h2>
                                <Row>
                                    <Col sm="3">
                                        <ListGroup className="Lead-dashboard-list">
                                            <ListGroupItem color="info">

                                                <ListGroupItemHeading >
                                                    New
                                            </ListGroupItemHeading>
                                            </ListGroupItem>

                                            {this.Lead_filter("New").map(lead => { return <ListGroupItem action><ModalConductor status='New' lead_title={lead.lead_title} lead_id={lead.lead_id} /></ListGroupItem> })}


                                        </ListGroup>
                                    </Col>

                                    <Col sm="3">
                                        <ListGroup className="Lead-dashboard-list">
                                            <ListGroupItem color="info">
                                                <ListGroupItemHeading >
                                                    Accepted
                                            </ListGroupItemHeading>
                                            </ListGroupItem>

                                            {this.Lead_filter("Accepted").map(lead => { return <ListGroupItem action><ModalConductor status='Accepted' lead_title={lead.lead_title} lead_id={lead.lead_id} /></ListGroupItem> })}
                                        </ListGroup>
                                    </Col>
                                    <Col sm="3">



                                        <ListGroup className="Lead-dashboard-list">
                                            <ListGroupItem color="info">

                                                <ListGroupItemHeading >
                                                    Pitched
                            </ListGroupItemHeading>   </ListGroupItem>

                                            {this.Lead_filter("Pitched").map(lead => { return <ListGroupItem action><ModalConductor status='Pitched' lead_title={lead.lead_title} lead_id={lead.lead_id} /></ListGroupItem> })}
                                        </ListGroup>
                                    </Col>
                                    <Col sm="3">
                                        <ListGroup className="Lead-dashboard-list">
                                            <ListGroupItem color="info">

                                                <ListGroupItemHeading >
                                                    Response Generated
                            </ListGroupItemHeading>   </ListGroupItem>
                                            {this.Lead_filter("ResponseGenerated").map(lead => { return <ListGroupItem action><ModalConductor status='ResponseGenerated' lead_title={lead.lead_title} lead_id={lead.lead_id} /></ListGroupItem> })}
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>


                </Container >
            )
        }
        catch (error) {
            return <Redirect to='login' />
        }
    }
}
export default Dashboard
import React from 'react'

import NewModal from '../Modals/NewModal'
import AcceptedModal from '../Modals/AcceptedModal'
import PitchedModal from '../Modals/PitchedModal'
import ResponseGeneratedModal from '../Modals/ResponseGeneratedModal'

const ModalConductor = props => {
  switch (props.status) {
    case 'New':
      return <NewModal {...props}/>;

    case 'Accepted':
      return <AcceptedModal {...props}/>;

    case 'Pitched':
      return  <PitchedModal {...props}/>;

    case 'ResponseGenerated':
      return <ResponseGeneratedModal {...props}/>;

    default:
      return null;
  }
};

export default ModalConductor;
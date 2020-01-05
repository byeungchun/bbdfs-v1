import React, { useContext, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { config } from "../../config";

import ReceiverContext from "../../context/receiver/receiverContext";

const ReceiverList = () => {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const receiverContext = useContext(ReceiverContext);
  const { receivers, current, setCurrent } = receiverContext;
  return (
    <div className="grid-3">
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Receiver
      </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <TransitionGroup>
            {receivers.map(item => (
              <CSSTransition key={item._id} timeout={500}>
                <a className="dropdown-item" href="#" onClick={() => setCurrent(item)}>
                  {item.name}
                </a>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
      <div>
        <h5 className='address-font'>{current ? current.account : ""}</h5>
      </div>
      <div>
        <h5 className='address-font'>{current ? current.contract : ""}</h5>
      </div>
    </div>
  );
};

export default ReceiverList;

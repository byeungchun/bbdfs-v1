import React, { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { config } from "../../config";

import ReceiverContext from "../../context/receiver/receiverContext";

const onChange = e => {
  console.log(e.target.text);
};

const ReceiverList = () => {
  const receiverContext = useContext(ReceiverContext);
  const { receivers } = receiverContext;
  return (
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
              <a className="dropdown-item" href="#" onClick={onChange}>
                {item.name}
              </a>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default ReceiverList;

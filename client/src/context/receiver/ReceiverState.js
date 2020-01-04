import React, { useReducer } from "react";
import ReceiverContext from "./receiverContext";
import receiverReducer from "./receiverReducer";

const ReceiverState = props => {
  const initialState = {
    receivers: [
      {
        _id: "1",
        name: "Bank for International Settlements",
        account: "account1",
        contract1: "contract1"
      },
      {
        _id: "2",
        name: "Bank of Korea",
        account: "account2",
        contract2: "contract2"
      },
      {
        _id: "3",
        name: "International Monetary Fund",
        account: "account3",
        contract2: "contract3"
      }
    ]
  };

  const [state, dispatch] = useReducer(receiverReducer, initialState);

  return (
    <ReceiverContext.Provider
      value={{
        receivers: state.receivers
      }}
    >
      {props.children}
    </ReceiverContext.Provider>
  );
};

export default ReceiverState;

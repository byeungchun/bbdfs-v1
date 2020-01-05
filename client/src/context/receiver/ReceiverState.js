import React, { useReducer } from "react";
import ReceiverContext from "./receiverContext";
import receiverReducer from "./receiverReducer";
import {
  SET_CURRENT
} from '../types';

const ReceiverState = props => {
  const initialState = {
    receivers: [
      {
        _id: "1",
        name: "Bank for International Settlements",
        account: "account1",
        contract: "contract1"
      },
      {
        _id: "2",
        name: "Bank of Korea",
        account: "account2",
        contract: "contract2"
      },
      {
        _id: "3",
        name: "International Monetary Fund",
        account: "account3",
        contract: "contract3"
      }
    ],
    current: null
  };

  const [state, dispatch] = useReducer(receiverReducer, initialState);

  const setCurrent = receiver => {
    dispatch({ type: SET_CURRENT, payload: receiver });
  };

  return (
    <ReceiverContext.Provider
      value={{
        receivers: state.receivers,
        current: state.current,
        setCurrent
      }}
    >
      {props.children}
    </ReceiverContext.Provider>
  );
};

export default ReceiverState;

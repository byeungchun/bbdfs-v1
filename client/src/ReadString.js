import React from "react";

class ReadString extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.DataReporting;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["dataObjectId"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState

    const { DataReporting } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const dataObjectId = DataReporting.dataObjectId[this.state.dataKey];

    // if it exists, then we display its value
    return <p>My stored string: {dataObjectId && dataObjectId.value}</p>;
  }
}

export default ReadString;

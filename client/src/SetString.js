import React from "react";

class SetString extends React.Component {
  state = { stackId: null, objectId: null };

  handleKeyDown = e => {
    // if the enter key is pressed, set the value with the string
    if (e.keyCode === 13) {
      this.setValue(e.target.value);
    }
  };

  setValue = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.DataReporting;

    // let drizzle know we want to call the `set` method with `value`
    // const stackId = contract.methods["setDataOjectId"].cacheSend(value, {
    //   from: drizzleState.accounts[0]
    // });

    // const stackId = contract.methods["getDataObjectId"].cacheSend(
    //   101,
    //   "0xe310ede95fdba52db146d616b18906c91b2117172beda8dc4edfebf1d21e8f6f"
    // );
    const stackId = 0;
    const _nonce = 110;
    contract.methods
      .getDataObjectId(_nonce, value)
      .call({
        from: drizzleState.accounts[1]
      })
      .then(res => {
        const objectId = res;
        console.log(objectId);
        this.setState({ objectId });
      });

    const nonceId = contract.methods["setNonce"].cacheSend(_nonce, value, {
      from: drizzleState.accounts[1]
    });

    // save the `stackId` for later reference
    this.setState({ stackId });
  };

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] &&
      transactions[txHash].status}`;
  };

  render() {
    return (
      <div>
        <input type="text" onKeyDown={this.handleKeyDown} />
        <div>{this.getTxStatus()}</div>
        <div>
          <p>Object ID: {this.state.objectId}</p>
        </div>
      </div>
    );
  }
}

export default SetString;

import React, { Fragment, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import Message from "./Message";
import Progress from "./Progress";

const FileUpload = ({ drizzle, drizzleState }) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    if (e.target.id === 'customFile') {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    } else if (e.target.id === 'receiverAddress') {
      setReceiverAddress(e.target.value);
    }
  };

  const setObjId2Contract = value => {
    //const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.DataReporting;

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods["setDataOjectId"].cacheSend(value, {
      from: drizzleState.accounts[0]
    });
    return drizzle.web3.utils.soliditySha3(
      {
        "address": drizzleState.accounts[0],
        "unit256": 10001,
        "address": receiverAddress
      }
    );
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });
      const objectId = res.data;
      const messageToReceiver = setObjId2Contract(objectId);
      // const { fileName, filePath } = res.data;
      // setUploadedFile({
      //   fileName,
      //   filePath
      // });
      //console.log(messageToReceiver);
      setMessage('message for sender: ' + messageToReceiver);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };
  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            id="receiverAddress"
            placeholder="Receiver address"
            onChange={onChange}
          />
        </div>
        <div className="custom-file mb-4">

          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        ></input>
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.filename}</h3>
            <img
              style={{ width: "100%" }}
              src={uploadedFile.filePath}
              alt=""
            ></img>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

FileUpload.propTypes = {
  drizzle: PropTypes.object.isRequired,
  drizzleState: PropTypes.object.isRequired
};

export default FileUpload;

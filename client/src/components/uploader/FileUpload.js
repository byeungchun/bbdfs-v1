import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import ReceiverList from "./ReceiverList";
import Message from "./Message";
import ReceiverState from "../../context/receiver/ReceiverState";

const FileUploader = () => {
  const [file, setFile] = useState("");

  const [filename, setFilename] = useState("Choose File");

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  return (
    <ReceiverState>
      <Fragment>
        <div className="grid-row-4">
          <div>
            <ReceiverList />
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
        </div>
      </Fragment>
    </ReceiverState>
  );
};

export default FileUploader;

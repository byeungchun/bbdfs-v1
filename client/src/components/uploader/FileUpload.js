import React, { Fragment, useState } from "react";
import axios from "axios";
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
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <ReceiverState>
      <Fragment>
        <form onSubmit={onSubmit}>
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
              <input type="submit"
                value="Upload" className="btn btn-primary btn-block mt-4" />
              <label className="custom-file-label" htmlFor="customFile">
                {filename}
              </label>
            </div>
          </div>

        </form>
      </Fragment>
    </ReceiverState>
  );
};

export default FileUploader;

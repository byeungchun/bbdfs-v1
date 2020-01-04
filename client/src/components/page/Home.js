import React, { Fragment } from "react";
import FileUpload from "../uploader/FileUpload";
const Home = () => {
  return (
    <Fragment>
      <div className="container">
        <FileUpload />
      </div>
    </Fragment>
  );
};

export default Home;

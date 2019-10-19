import React, { Fragment, useEffect } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { listFiles } from "../actions/files";

// import { Button } from "../utils/utilComponents";
import colors from "../styles/colors";

const Files = ({ listFiles, files: { files, loading } }) => {
  console.log(files);
  useEffect(() => {
    listFiles();
  }, [listFiles]);

  return (
    <Fragment>
      {files === null || loading ? (
        <p>loading...</p>
      ) : (
        <FileList>
          {files.map(file => {
            return <FileItem key={file.fileId}>{file.fileName}</FileItem>;
          })}
        </FileList>
      )}
    </Fragment>
  );
};

Files.propTypes = {
  listFiles: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  files: state.files
});

export default connect(
  mapStateToProps,
  { listFiles }
)(Files);

const FileList = styled.ol`
  list-style: none;
`;

const FileItem = styled.li`
  font-size: 2rem;
  color: ${colors.offwhite};
`;

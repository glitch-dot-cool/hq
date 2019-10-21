import React, { Fragment, useEffect } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { listFiles } from "../actions/files";

import colors from "../styles/colors";

const Files = ({ b2Auth, listFiles, files: { files, loading } }) => {
  useEffect(() => {
    listFiles(b2Auth);
  }, [listFiles, b2Auth]);

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
  files: PropTypes.array.isRequired,
  b2Auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  files: state.files,
  b2Auth: state.files.b2Auth
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

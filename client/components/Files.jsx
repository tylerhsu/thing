import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import { shape as patientShape } from '../reducers/patient';
import { shape as filesShape, createFile, deleteFile } from '../reducers/files';

const styles = {
  container: {
    paddingBottom: 60,
  },
  fileList: {
    marginBottom: 20,
  },
  fileInput: {
    width: 0,
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 1,
  },
};

class Files extends Component {
  constructor(props) {
    super(props);

    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFileDelete = this.handleFileDelete.bind(this);
  }

  handleFileUpload(e) {
    const file = e.target.files[0];
    const { patient } = this.props;
    this.props.createFile({
      file,
      patient_id: patient.payload.id
    });
  }

  handleFileDelete(id) {
    return (e) => {
      this.props.deleteFile(id);
    }
  }

  render() {
    const { classes, files } = this.props;
    return (
      <div className={classes.container}>
        {
          files.payload && files.payload.length ?
            <List dense className={classes.fileList}>
              {
                files.payload.map((file) => (
                  <ListItem key={file && file.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <Icon>folder</Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <a href={`/api/files/${file.id}/download`}>
                      <ListItemText primary={file.name} />
                    </a>
                    <IconButton onClick={this.handleFileDelete(file.id)}><Icon>delete_forever</Icon></IconButton>
                  </ListItem>
                ))}
            </List> :
            <div className={classes.fileList}>No files</div>
        }
        <input
          id="file"
          type="file"
          className={classes.fileInput}
          onChange={this.handleFileUpload}
        />
        <Button component="label" htmlFor="file" variant="raised" color="primary">
          Upload File
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ patient, files }) => ({ patient, files });

const mapDispatchToProps = { createFile, deleteFile };

Files.propTypes = {
  classes: PropTypes.object.isRequired,
  patient: patientShape.isRequired,
  files: filesShape.isRequired,
  createFile: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Files));

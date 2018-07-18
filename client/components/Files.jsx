import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

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
  }

  handleFileUpload() {
    // Do something
  }

  render() {
    const { classes, files } = this.props;
    return (
      <div className={classes.container}>
        {
          files.length ?
            <List dense className={classes.fileList}>
              {
                files.map((file) => (
                  <ListItem key={file && file.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <Icon>folder</Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={file.name} />
                  </ListItem>
                ))}
            </List> : null
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

Files.propTypes = {
  classes: PropTypes.object.isRequired,
  files: PropTypes.array,
};

export default withStyles(styles)(Files);

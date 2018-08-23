import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NewMessage from './NewMessage';
import { withRouter } from 'react-router-dom'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });

  };

  onClickMensaje(event) {
    console.log('sdsdsds');

    //this.nMitem.handleClose

  }

  navigateToPage = () => {
    this.context.router.push('/dashboard')
  };

  render() {
    const { anchorEl } = this.state;


    return (

      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          color="inherit"
          onClick={this.handleClick}
        >
          Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}


        >
          <MenuItem id="nMitem" onClick={this.navigateToPage} >Nuevo Mensaje</MenuItem>
          <MenuItem onClick={this.handleClose}>Mis Posts</MenuItem>
          <MenuItem onClick={this.handleClose}>Followed</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;

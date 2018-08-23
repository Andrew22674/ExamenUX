import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Dashboard from './protected/Dashboard';
import { logout } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Toolbar, Typography } from '../../node_modules/@material-ui/core';
import NewMessage from "./NewMessage";
import MisPosts from './protected/MisPosts';
import Following from "./protected/Following";
import MensajesPrivados from "./protected/MensajesPrivados";


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )}
    />
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  console.log('resd: ', { ...rest })
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
            <Redirect to="/dashboard" />
          )}
    />
  );
}
//var staaate = null;

class App extends Component {
  classes = {}
  constructor(props) {
    super(props);
    //const { classes } = this.props;
    this.classes = this.props.classes;
  }

  state = {
    authed: false,
    loading: true
  };
  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        });
        //staaate = true;
      } else {
        this.setState({
          authed: false,
          loading: false
        });
        //staaate = false;
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });

  };

  onClickMensaje(event) {
    console.log('sdsdsds');
    { this.handleClose }

    //this.nMitem.handleClose

  }

  render() {
    const { anchorEl } = this.state;




    const authButtons = this.state.authed ? (
      <span>
        <Button
          label="Logout"
          onClick={() => {
            logout();
            //staaate = false;
          }}
          style={{ color: '#fff' }}
        >Logout</Button>

      </span>

    ) : (
        <span>
          <Link to="/" color="inherit">
            <Button style={{ color: '#fff' }}>Home</Button>
          </Link>
          <Link to="/login">
            <Button style={{ color: '#fff' }} >Login</Button>
          </Link>
          <Link to="/register">
            <Button style={{ color: '#fff' }} >Register</Button>
          </Link>
        </span>
      );

    const menuButtons = this.state.authed ? (
      <span>
        <Link to="/nuevoMensaje" color="inherit">
          <MenuItem id="nMitem" onClick={this.handleClose} >New Post</MenuItem>
        </Link>
        <Link to="/myposts">
          <MenuItem onClick={this.handleClose}>My Posts</MenuItem>
        </Link>
        <Link to="/following">
        <MenuItem onClick={this.handleClose}>Following</MenuItem>
        </Link>
        <Link to="/privatemessages">
        <MenuItem onClick={this.handleClose}>Private posts</MenuItem>
        </Link>
      </span>
    ) : (
        <div>
          <Link to="/" color="inherit">
            <MenuItem id="nMitem" onClick={this.handleClose} >Home</MenuItem>
          </Link>
        </div>);

    const topbarButtons = (
      <div>
        <Link to="/dashboard">
          <Button style={{ color: '#fff' }} >Dashboard</Button>
        </Link>
        {authButtons}
      </div>
    );
    return this.state.loading === true ? (
      <h1>Loading...</h1>
    ) : (
        <div className={this.classes.root}>

          <AppBar position="static"  >
            <Toolbar>
              <div className={this.classes.menuButton} color="inherit">
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
                    {menuButtons}

                  </Menu>
                </div>

              </div>
              <Typography variant="title" color="inherit" className={this.classes.flex}>
                Message App
                  </Typography>
              {topbarButtons}
            </Toolbar>

          </AppBar>
          <br />
          <br />
          <div className="container-fluid justify-content-center d-flex mt-12">
            <div >
              <Switch>
                <Route path="/" exact component={Home} />
                <PublicRoute
                  authed={this.state.authed}
                  path="/login"
                  component={Login}
                />
                <PublicRoute
                  authed={this.state.authed}
                  path="/register"
                  component={Register}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  path="/dashboard"
                  component={Dashboard}
                />

                <PrivateRoute
                  authed={this.state.authed}
                  path="/nuevoMensaje"
                  component={NewMessage}
                />

                <PrivateRoute
                  authed={this.state.authed}
                  path="/myposts"
                  component={MisPosts}
                />

                <PrivateRoute
                  authed={this.state.authed}
                  path="/following"
                  component={Following}
                />

                <PrivateRoute
                  authed={this.state.authed}
                  path="/privatemessages"
                  component={MensajesPrivados}
                />

                <Route render={() => <h3>Testing</h3>} />

              </Switch>
            </div>
          </div>
        </div>

      );
  }
}



App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
//export var staaate;
import React, { Component } from 'react';
import fire from '../config/constants';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { CardHeader, Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import staaate from './index';

/*function welcome() {

  fire.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('This is the user: ', user.displayName);
      //this.uName = this.user.displayName.val;
      this.setState({
        userName: this.user.displayName
      });
      return <div> {fire.auth().currentUser.displayName} </div>;
    } else {
      // No user is signed in.
      console.log('There is no logged in user');
      return <div> guest </div>;
    }
  });
  
}*/

export default class Home extends Component {
  classes = {};


  constructor(props) {
    var uname = null;

    super(props)
    this.classes = props.classes;
    this.state = {
      userName: '',
      mensajes: []
    }

    //this.getUsername = this.getUsername.bind(this);
    //this.autenticado = this.autenticado.bind(this);

    //this.getUsername();
    //this.getUsername();
  }

 


  /*getUsername() {
    fire.auth().onAuthStateChanged(function (user) {
      if (staaate) {
        console.log('This is the user: ', user.displayName);
        this.setState({
          userName: this.user.displayName
        });
      } else {
        // No user is signed in.
        console.log('There is no logged in user');
      }
    });
    console.log(this.state.userName);
  }*/

  componentDidMount() {
    document.title = "Home";
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('This is the user: ', user.displayName);
        //this.uName = this.user.displayName.val;
        /*this.setState({
          userName: this.user.displayName
        });*/
      } else {
        // No user is signed in.
        console.log('There is no logged in user');
      }
    });

    fire.database().ref("messages").on("value", (data) => {
      let list = []
      data.forEach(doc => {
        if (doc.val().acceso === "publico") {
          list.push(doc.val())
          this.setState({
            mensajes: list
          })
        }
        /*else if (doc.val().userId === fire.auth().currentUser.uid) {
          list.push(doc.val())
          this.setState({
            mensajes: list
          })
        }*/

      })
    })
  }

  render() {
    let data = this.state.mensajes.map((doc, i) => {
      return (
        <div key={i} >
          <Card >
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" src = {doc.photo}>
                  
              </Avatar>
              }
              title={doc.userName}
            />

            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {doc.titulo}
              </Typography>
              <Typography component="p">
                {doc.mensaje}
              </Typography>
            </CardContent>
          </Card>
          <br />

        </div>
      )
    })

    /*const message = this.state.authed ? (
      <span>
        
        {fire.auth().currentUser.displayName}
      </span>

    ) : (
        <span>
         guest
        </span>
      );*/


    return (
      <div>
        <div> Welcome guest </div>

        <div id="wall" className="container" >
          <br />
          <hr />
          <br />
          <h2 className="text-center" >Posts</h2>
          <br />

          {data}

        </div>
      </div>
    );



  }
}

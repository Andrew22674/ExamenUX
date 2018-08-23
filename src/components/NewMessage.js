import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import fire from '../config/constants';


import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader, Avatar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SimpleSnackBar from './SnackBar';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export const varMensaje = "Mensaje enviado exitosamente";

const ITEM_HEIGHT = 48;
const id = null;


export default class NewMessage extends Component {
  constructor(props) {
    super(props)
    this.classes = props.classes;
    this.state = {
      currentUser: fire.auth.currentUser,
      titulo: '',
      mensaje: '',
      acceso: 'publico',
      successMsg : 'Mensaje enviado!'
    };
    this.addMessage = this.addMessage.bind(this);
    this.showMessage = this.showMessage.bind(this);
    //this.TextFieldChange = this.TextFieldChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setAcceso = this.setAcceso.bind(this);
    this.getValue = this.getValue.bind(this);
    this.changeMsg = this.changeMsg.bind(this);
    //this.onTodoChange = this.onTodoChange.bind(this);
  }

  changeMsg(){
    this.setState({ successMsg: 'Mensaje enviado!' });
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };



  /*componentWillMount() {
    //Create reference to messages in Firebase Database
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      // Update React state when message is added at Firebase Database 
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.currentUser) });
    })
  }*/

  addMessage(e) {
    var userId = fire.auth().currentUser.uid;
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    //fire.database().ref('messages').push(this.state.mensaje);
    var ref = fire.database().ref().child("messages");
    var userposts = fire.database().ref().child("user-posts");
    var key = ref.push().getKey();

    

  /*ref.child(key).child("likes").child(userId).setValue(true);para los likes del usuario
  deberia ester en el metodo de likeMessage en el Dashboard y en MisPosts*/

    console.log(key);

    ref.child(key).set({
      titulo: this.state.titulo,
      mensaje: this.state.mensaje,
      userName: fire.auth().currentUser.displayName,
      userId: userId,
      acceso: this.state.acceso,
      idMensaje: key,
      photo: fire.auth().currentUser.uid,
      likes: {
        cont : 0
      }
    });

    userposts.child(userId + "/" + this.state.acceso + "/"+ key).set({
      titulo: this.state.titulo,
      mensaje: this.state.mensaje,
      userName: fire.auth().currentUser.displayName,
      userId: userId,
      acceso: this.state.acceso,
      idMensaje: key,
      photo: fire.auth().currentUser.uid,
      likes: {
        cont : 0
      }

    });

    /*ref.child(key).child("likes").child("userIDs").child(userId).set(false);
    ref.child(key).child("likes").update({
      cont: 0
    });*/
    //console.log(this.state.mensaje.value)
  }

  showMessage() {
    // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    console.log(this.state.acceso);
    //console.log(this.state.mensaje.value)
  }


  getValue() {
    var value = this.state.mensajes;
    if (value) {
      console.log(value);
      this.setState({ mensaje: null }); // <-- reset value
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    console.log(event.target.value)
  }

  setAcceso(param) {
    this.setState({
      acceso: param
    });
    console.log(param)
  }




  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return <div> <Card >
      <CardHeader
        //avatar={
        //<Avatar aria-label="Recipe" className={this.classes.avatar}>
        //R
        //</Avatar>
        //}
        action={
          <div>
            <IconButton
              aria-label="More"
              aria-owns={open ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}

            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              onClick={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200,
                },
              }}
            >
              <MenuItem value="publico" onClick={this.handleClose} onClick={() => this.setAcceso("publico")}>
                Publico
        </MenuItem>
              <MenuItem value="privado" onClick={this.handleClose} onClick={() => this.setAcceso("privado")}>
                Privado
        </MenuItem>
              <MenuItem value="followers" onClick={this.handleClose} onClick={() => this.setAcceso("followers")}>
                Followers
        </MenuItem>

            </Menu>
          </div>
        }
        title="Nuevo Mensaje!"

      />

      <CardContent>



        <form noValidate autoComplete="off">
          <div>
            <TextField
              id="titulo"
              label="Titulo"

              value={this.state.name}
              onChange={this.handleChange('titulo')}
              margin="normal"
            />
          </div>

          <TextField
            id="mensaje"
            label="Mensaje"
            multiline
            rowsMax="4"
            value={this.state.multiline}

            onChange={this.handleChange('mensaje')}

            margin="normal"
          />
        </form>

        <br />
        <CardActions style={{ justifyContent: 'center' }}>
          <div variant="outlined" color="primary" onClick={this.addMessage}>
            <SimpleSnackBar changeHandler = {this.changeMsg.bind(this)}>

          </SimpleSnackBar>
          </div>


        </CardActions>

      </CardContent>
    </Card>
      <br />
    </div >;
  }
}

/*  testing button
<Button variant="outlined" color="primary" onClick={this.showMessage}>
            ENVIAR
      </Button>

      */

/* read only text field
<TextField
          id="read-only-input"
          label="Read Only"
          defaultValue="Hello World"

          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        */


        /* card message
        <div> <Card >
    <CardHeader
      //avatar={
      //<Avatar aria-label="Recipe" className={this.classes.avatar}>
      //R
      //</Avatar>
      //}
      action={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }
      title="Nuevo Mensaje!"

    />

    <CardContent>

      
      
  <form  noValidate autoComplete="off">
      <div>
        <TextField
          id="titulo"
          label="Titulo"

          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        </div>
        
        <TextField
          id="multiline-flexible"
          label="Mensaje"
          multiline
          rowsMax="4"
          value={this.state.multiline}
          onChange={this.handleChange('multiline')}

          margin="normal"
        />
        </form>

    </CardContent>
    <div>
    <FormControlLabel
          control={
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />
          }
          label="Custom icon"
        /></div>
    <CardActions>
      <Button size="small" color="primary">
        LIKE POST
  </Button>
      <Button size="small" color="primary">
        FOLLOW USER
  </Button>
    </CardActions>
  </Card>
  <br />
</div>;
  }

  */


  /*  Like card

  <div> <Card >
    <CardHeader
      //avatar={
      //<Avatar aria-label="Recipe" className={this.classes.avatar}>
      //R
      //</Avatar>
      //}
      action={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }
      title="Nuevo Mensaje!"

    />

    <CardContent>

      
      
  <form  noValidate autoComplete="off">
      <div>
        <TextField
          id="titulo"
          label="Titulo"

          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        </div>
        
        <TextField
          id="multiline-flexible"
          label="Mensaje"
          multiline
          rowsMax="4"
          value={this.state.multiline}
          onChange={this.handleChange('multiline')}

          margin="normal"
        />
        </form>

    </CardContent>
    <div>
    <FormControlLabel
          control={
            <Checkbox id = "likeIcon" icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />
          }
          label="Like"
        /></div>
  </Card>
  <br />
</div>;

*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { CardHeader, Avatar, IconButton } from '@material-ui/core';
import { firebase } from 'firebase';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import fire from '../../config/constants';
import Text from 'react';


const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};


function AddButton(props) {
    const { classes } = props;
    return (
        <div>
            <Button variant="fab" color="primary" aria-label="Add" className={classes.button} onClick={() => { console.log('onClick'); }}>
                <AddIcon />
            </Button>
        </div>
    );
}

AddButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

//var addbuttonx = AddButton(this.props);

class Following extends Component {
    classes = {};
    constructor(props) {
        super(props)
        this.classes = props.classes;
        this.state = {
            mensajes: [],
            following: []
        }
        this.likePost = this.likePost.bind(this);
        this.getFollowed = this.getFollowed.bind(this);
        this.followUser = this.followUser.bind(this);

    }

    getFollowed() {
        var userId = fire.auth().currentUser.uid;
        var ref = fire.database().ref().child("users/" + userId).orderByKey();

        ref.on("value", function (snapshot) {
            let list = []
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                console.log("key: " + key);

                list.push(key);
                this.setState({
                    following: list
                })


            })
        });
        console.log("idk");
    }


    prueba() {
        console.log('IDK');
    }

    likePost(param, postUserId, tipoAcceso) {
        var userId = fire.auth().currentUser.uid;
        var ref = fire.database().ref().child("messages/" + param + "/likes");
        var ref2 = fire.database().ref().child("user-posts/" + postUserId + "/" + tipoAcceso + "/" + param + "/likes");
        // var ref = fire.database().ref().child("messages").child(param).child("likes");
        //var likeRef = ref.child("likes");
        //var key = ref.push().getKey();
        //ref.child(param).child("likes").child(userId).set(false);//para los likes del usuario
        console.log(param);
        console.log("like");
        ///messages/-LKUSQsowY9KyTU_Bx__/likes/userIDs/kAV7AfNUhtTDLjvRFdA1eSYj1R63
        //ref("-messages/"+ "-likes/-userIDs"+ userId).update(ref("-messages/"+ "-likes/-userIDs"+ userId) === false ? ( console.log("false") ) : (console.log("true")));
        ref.once("value")
            .then(function (snapshot) {
                //console.log(snapshot.child("userIDs").child(userId).exists() ? ("user likes exists") : ("does not exist"));
                var contador = snapshot.child("cont").val();
                if (snapshot.child("userIDs").child(userId).exists()) {
                    console.log("user like exists");
                    ref.child("userIDs").child(userId).remove();
                    ref.update({ cont: contador - 1 });

                    ref2.child("userIDs").child(userId).remove();
                    ref2.update({ cont: contador });

                    //cont--
                } else {
                    console.log("user like does not exist");
                    ref.child("userIDs").child(userId).set(true);
                    ref.update({ cont: contador + 1 });

                    ref2.child("userIDs").child(userId).set(true);
                    ref2.update({ cont: contador });
                }

                console.log("Cont likes: " + contador);


                /*var a = snapshot.exists();  // true
                var b = snapshot.child("name").exists(); // true
                var c = snapshot.child("name/first").exists(); // true
                var d = snapshot.child("name/middle").exists(); // false*/
            });
    }

    followUser(userToFollow) {
        var userId = fire.auth().currentUser.uid;
        var ref = fire.database().ref().child("users/" + userId + "/");
    
        ref.once("value").then(function (snapshot) {
          if (snapshot.child(userToFollow).exists()) {
            console.log("user already followed");
            ref.child(userToFollow).remove();
          } else {
            if (userToFollow != userId) {
              console.log("user is not followed");
              ref.child(userToFollow).set(true);
            } else {
              console.log("can't follow yourself");
            }
    
          }
        });
      }


    //mostrar mensajes publicos y los del usuario autenticado
    componentDidMount() {
        let currentComponent = this;
        document.title = "My follows";

        var userId = fire.auth().currentUser.uid;
        var ref = fire.database().ref().child("users/" + userId).orderByKey();

        ref.on("value", function (snapshot) {
            let list = []
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                console.log();

                var messagesRef = fire.database().ref().child("user-posts").child(key).child("followers");
                //console.log("exists? " + fire.database().ref().child("user-posts").child(key).child("followers").exists());
                console.log(key);

                messagesRef.on("value", function (snapshot) {
                    if (snapshot.exists()) {
                        console.log("exists");

                        snapshot.forEach(function (childSnapshot) {
                            console.log(childSnapshot.val());
                            list.push(childSnapshot.val());
                            currentComponent.setState({
                                following: list
                            })
                            //var childData = childSnapshot.val();
                            // ...
                        });
                    } else {
                        console.log("not exists");
                    }
                    
                    //console.log(snapshot.val().key);

                });

                /*list.push(key);
                currentComponent.setState({
                    following: list
                })*/


            })
        });
        /*fire.database().ref("messages").on("value", (data) => {
            let list = []
            data.forEach(doc => {
                //if (doc.val().acceso === "publico") {
                  //list.push(doc.val())
                  //this.setState({
                    //mensajes: list
                  //})
                //} 
                if (doc.val().userId === fire.auth().currentUser.uid) {
                    list.push(doc.val())
                    this.setState({
                        mensajes: list
                    })
                }

            })
        })*/
        //this.getFollowed();
    }



    render() {

        let data = this.state.following.map((doc, i) => {
            console.log(JSON.stringify(doc.val));
            return (
                <div key={i} >
                    <Card className={this.classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" className={this.classes.avatar}>
                                    {doc.photo}
              </Avatar>
                            }
                            action={
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                                
                            }
                            subheader= {"Likes: "   + doc.likes.cont}
                            title= {doc.userName}
                        />

                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                {doc.titulo}
                            </Typography>
                            <Typography component="p">
                                {doc.mensaje}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => this.likePost(doc.idMensaje, doc.userId, doc.acceso)}>
                                LIKE POST
          </Button>
                            <Button size="small" color="primary">
                                FOLLOW USER
          </Button>
                        </CardActions>
                    </Card>
                    <br />

                </div>
            )
        })

        

        return (

            <div id="wall" className="container" >
                <br />
                <hr />
                <br />
                <h2 className="text-center" >Posts</h2>
                <br />
                {data}
                

            </div>



        );
    }
}

Following.propTypes = {
    classes: PropTypes.object.isRequired,
};


function printUser() {
    var user = firebase.auth().currentUser;
    console.log(user.uid);
    // console.log('1');
}

function createNewComment() {
    var user = firebase.auth().currentUser;
    //firebase.database().ref('users/'+user.uid)
    firebase.database().ref('post-comments/' + 123).push({
        text: 578578,
        author: 7676,
        uid: 234
    });
    console.log('boton');
}

export default withStyles(styles)(Following);

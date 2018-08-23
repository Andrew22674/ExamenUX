import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


/*const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});*/

export default class AddButton extends React.Component {
    constructor(props){
        super(props)
        this.classes = this.props.classes;
    }
    //const { classes } = props;
    render() {
        return (
            <Button variant="fab" color="primary" aria-label="Add" className={classes.button} onClick={() => { console.log('onClick'); }}>
                <AddIcon />
            </Button>
        );
    }
}
AddButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };

import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Card, CardActionArea, CardMedia, Typography, Button, makeStyles, CardContent, CardActions } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { FcBusinessContact } from 'react-icons/fc'
import ContactImage from '../../../../../../../assets/contact.png'

const useStyles = makeStyles({
    root: {
      width: 985,
    },

    contactBackground:{
        backgroundImage: `url(${ContactImage})`,
        backgroundSize: '70px 70px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
});

function Presentation(props) {
    const { contact } = props
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <IconButton onClick={handleClickOpen} >
                <VisibilityIcon />
            </IconButton>
            <Dialog
                open={open}
                fullWidth={true}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Contact details"}</DialogTitle>
                <DialogContent className={classes.contactBackground} >
                    <div className="d-flex justify-content-between">
                        <table>
                            <tbody>
                                <tr className="p-2" >
                                    <td><span><h3>Representative name</h3></span></td>
                                    <td><span style={{fontSize:'20px'}} >:&nbsp;&nbsp;{contact.representativeName} </span></td>
                                </tr>
                                <tr className="p-2" >
                                    <td><span><h3>Job title</h3></span></td>
                                    <td><span style={{fontSize:'20px'}} >:&nbsp;&nbsp;{contact.jobTitle} </span></td>
                                </tr>
                                <tr className="p-2" >
                                    <td><span><h3>Gender</h3></span></td>
                                    <td><span style={{fontSize:'20px'}} >:&nbsp;&nbsp;{contact.gender} </span></td>
                                </tr>
                                <tr className="p-2" >
                                    <td><span><h3>Mobile</h3></span></td>
                                    <td><span style={{fontSize:'20px'}} >:&nbsp;&nbsp;{contact.mobile} </span></td>
                                </tr>
                                <tr className="p-2" >
                                    <td><span><h3>Work phone</h3></span></td>
                                    <td><span style={{fontSize:'20px'}} >:&nbsp;&nbsp;{contact.workPhone} </span></td>
                                </tr>
                                <tr className="p-2" >
                                    <td><span><h3>Home phone</h3></span></td>
                                    <td><span style={{fontSize:'20px'}} >:&nbsp;&nbsp;{contact.homePhone} </span></td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                                <tr className="p-2" >
                                    <td><span><h3>Address Line 1</h3></span></td>
                                    <td><span style={{fontSize:'20px'}} >:&nbsp;&nbsp;{contact.line1} </span></td>
                                </tr>
                                <tr className="p-2" >
                                    <td><span><h3>Address Line 2</h3></span></td>
                                    <td><span style={{fontSize:'20px'}} >:&nbsp;&nbsp;{contact.line2} </span></td>
                                </tr>
                                <tr className="p-2" >
                                    <td><span><h3>Country</h3></span></td>
                                    <td><span style={{fontSize:'20px'}} >:&nbsp;&nbsp;{contact.country} </span></td>
                                </tr>
                                <tr className="p-2" >
                                    <td><span><h3>State</h3></span></td>
                                    <td><span style={{fontSize:'20px'}} >:&nbsp;&nbsp;{contact.state_name} </span></td>
                                </tr>
                                <tr className="p-2" >
                                    <td><span><h3>City</h3></span></td>
                                    <td><span style={{fontSize:'20px'}} >:&nbsp;&nbsp;{contact.city} </span></td>
                                </tr>
                                <tr className="p-2" >
                                    <td><span><h3>Zip</h3></span></td>
                                    <td><span style={{fontSize:'20px'}} >:&nbsp;&nbsp;{contact.zip} </span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Close
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Presentation

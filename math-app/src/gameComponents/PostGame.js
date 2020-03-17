import React from 'react'
import { connect } from "react-redux"; //HOC
import { useHistory, useLocation } from 'react-router-dom';
import { closePostGame } from '../actions';


// modal
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    minWidth: 300
  },

}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const PostGame = props => {
    // const [open, setOpen] = React.useState(false);
    const history = useHistory();

    // const handleClickOpen = () => {
    // setOpen(true);
    // };
    // const handleClose = () => {
    // setOpen(false);
    // };

    const clickDone = () => {
      props.closePostGame();
      history.push('/');
    }

    return (
        <>
            <Dialog aria-labelledby="customized-dialog-title" open={props.postGameModal}>
            <DialogTitle id="customized-dialog-title" >
                Nice Job!
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                <DialogTitle>Score: {props.postGameStats}</DialogTitle>
                </Typography>

            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={clickDone} color="primary">
                done
                </Button>
                {/* <Button variant='contained' color='primary'  onClick={restartTimer}>Restart</Button> */}


            </DialogActions>
            </Dialog>
        </>
    )
}


const mapStateToProps = state => {
  return {
    postGameModal: state.postGameModal,
    postGameStats: state.postGameStats,
    gameId: state.gameId,
  }
}

export default connect(
  mapStateToProps,
  { closePostGame }
)(PostGame)
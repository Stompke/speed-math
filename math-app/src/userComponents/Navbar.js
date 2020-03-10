import React, { useState } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';


//components
import MathBoard from '../gameComponents/MathBoard';
import SelectGame from '../gameComponents/SelectGame';
// import Dashboard from '../userComponents/Dashboard';
import Account from '../userComponents/Account';


//app bar
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
//drawer
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },  
    list: {
    width: 250,
    },
    fullList: {
    width: 'auto',
    },
  }));

  
  const Navbar = () => {
      const classes = useStyles();
      const [drawer, setDrawer] = useState({
          top: false,
          left: false,
          bottom: false,
          right: false,
        });
        
        const history = useHistory()
        const logout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            history.push('/login');
        }
            
        const toggleDrawer = (side, open) => event => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

    setDrawer({ ...drawer, [side]: open });
     };        
     
     const sideList = side => (
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(side, false)}
          onKeyDown={toggleDrawer(side, false)}
        >
          <List>
            <NavLink to='/'>
                <ListItem button>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText>Home</ListItemText>
                </ListItem>
            </NavLink>
            <Link to='/select-game'>
                <ListItem button>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText>Select Game</ListItemText>
                </ListItem>
            </Link>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <Link to='/account'>
                  <ListItem button>
                  <ListItemIcon><InboxIcon /></ListItemIcon>
                  <ListItemText>Account</ListItemText>
                  </ListItem>
              </Link>
          </List>
        </div>
      );


    return (
        <>
        
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              MathGame
            </Typography>
            <Button onClick={logout} variant='contained' color="secondary">Logout</Button>
          </Toolbar>
        </AppBar>
      </div>

        

      <div>
      <Drawer open={drawer.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
    <div className="Logged-in-header">
    <Switch>
      <Route path='/account'>
          <Account />
      </Route>
      <Route path='/select-game/:type/:levelA/:sign/:levelB'>
          <MathBoard />
      </Route>
      <Route path='/'>
          <SelectGame />
      </Route>

      {/* <Route path='/'>
        <Dashboard />
      </Route> */}
    </Switch>
    </div>

      </>
    );
}

export default Navbar;
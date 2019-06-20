import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Trackers from "../dashboard/trackers";
import DrawerBody from "../common/drawerBody"

import { withStyles } from '@material-ui/core/styles';
const drawerWidth = 240;


const useStyles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});

class MiniDrawer extends React.Component {
    //const classes = useStyles();
    //const theme = useTheme();
    //[open, setOpen] = React.useState(false);
    
    classes=this.props.classes;   

    menuItemData=[
        { value:"All Trackers", icon:<InboxIcon />, name:'allTrackers' },
        { value:"API failures", icon:<InboxIcon />, name:'apiFailures' },
    ];

    state = {
        drawerOpened: false,
        selectedMenuItem: 'allTrackers000',
    }

    setOpen = (boolValue) =>{
        this.setState({ drawerOpened: boolValue });
    }

    handleDrawerOpen = () => {
        this.setOpen(true);
    }

    handleDrawerClose = () => {
        this.setOpen(false);
    }

    showBodyContent = () => {
        //console.log("showBodyContent selectedMenuItem:", stateData.selectedMenuItem);
        // if(stateData.selectedMenuItem=="allTrackers")
        //     //return( <TrackersConfig /> );
        //     return( <Trackers /> );
        // else
        //     return( defaultView() );
    }

    setBodyContent = (menuItemName) => {
        //stateData.selectedMenuItem=menuItemName;
        //return showBodyContent();
        this.showBodyContent();
    }

    viewAllTrackers = () =>{
        return(
            <Trackers />
        )
    }

    defaultView = () =>{
        return(
            <React.Fragment>
                <div className={this.classes.toolbar} />
                <Typography paragraph>
                    Consequat Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </React.Fragment>
        );
    }

    render(){
        return (
            <div className={this.classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(this.classes.appBar, {
                        [this.classes.appBarShift]: this.state.drawerOpened,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={ () => { this.handleDrawerOpen() } }
                            edge="start"
                            className={clsx(this.classes.menuButton, {
                                [this.classes.hide]: this.state.drawerOpened,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Mini variant drawer
            </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(this.classes.drawer, {
                        [this.classes.drawerOpen]: this.state.drawerOpened,
                        [this.classes.drawerClose]: !(this.state.drawerOpened),
                    })}
                    classes={{
                        paper: clsx({
                            [this.classes.drawerOpen]: this.state.drawerOpened,
                            [this.classes.drawerClose]: !(this.state.drawerOpened),
                        }),
                    }}
                    open={this.state.drawerOpened}
                >
                    <div className={this.classes.toolbar}>
                        <IconButton onClick={ () => { this.handleDrawerClose() } }>
                            Close Drawer
                {/*theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />*/}
                <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        { this.menuItemData.map((data, index) => (
                            <ListItem 
                                button key={data.name} 
                                onClick={ ()=>{ 
                                    this.setBodyContent( "data.name" )
                                    //stateData.selectedMenuItem='x'
                                    //stateData.selectedMenuItem='allTrackers';
                                    //console.log(stateData.selectedMenuItem) 
                                } } 
                            >
                                <ListItemIcon>{ data.icon }</ListItemIcon>
                                <ListItemText primary={data.value} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />

                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>

                <main className={this.classes.content}>
                    <div className={this.classes.toolbar} />
                    <Typography paragraph={ false }>
                        { //showBodyContent() 
                        }
                        <DrawerBody
                            elementToRender={ "trackers" }
                            //elementToRender={ stateData.selectedMenuItem }
                        />
                        
                    </Typography>
                </main>
            </div>
        );
    };
}

//export default MiniDrawer;
export default withStyles(useStyles)(MiniDrawer);
//export default connect(mapStateToProps)(withStyles(useStyles)(MiniDrawer));


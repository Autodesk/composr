import cx from 'classnames';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Firebase from 'firebase/firebase';
import {Link} from 'react-router';
import { clearCurrentUser } from 'actions/authActions';

import {FlatButton, RaisedButton, FontIcon, Popover, MenuItem, Divider} from 'material-ui';

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signUp: false,
            openUserPopover: false,
            openAppPopover: false
        }
    }

    toggleModal(state) {
        this.setState({ signUp: state });
    }

    componentDidMount() {
        this.offAuthStateChange = Firebase.firebase.auth().onAuthStateChanged(
            (user) => this.setState({currentUser: user})
        )
    }

    componentWillUnmount() {
        this.offAuthStateChange();
    }

    handleRequestClose() {
        this.setState({
            openUserPopover: false,
            openAppPopover: false
        });
    }

    handleTouchUserPopup (event) {
        event.preventDefault();

        this.setState({
            openUserPopover: true,
            anchorEl: event.currentTarget
        });
    }

    handleLogOut() {
        Firebase.firebase.auth().signOut();
        this.handleRequestClose();
    }

    renderUserMenu() {
        if (this.state.currentUser) {
            return (
                <div style={{marginTop: '6px'}}>
                    <Link to="/visualizer">
                        <RaisedButton
                        primary={true}
                        label="New Composition"
                        style={{color: 'white'}}
                        icon={<FontIcon style={{fontSize: '12px'}} className="fa fa-plus"/>}
                    />
                        </Link>

                    <FlatButton
                        label={this.state.currentUser.email}
                        labelPosition="before"
                        style={{color: 'white'}}
                        icon={<FontIcon style={{fontSize: '12px'}} className="fa fa-chevron-down"/>}
                        onTouchTap = {this.handleTouchUserPopup.bind(this)}
                    />

                    <Popover
                        open={this.state.openUserPopover}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={this.handleRequestClose.bind(this)}
                        style={{padding: '20px', overflowY: 'hidden'}}
                        zDepth={3}
                    >
                        <MenuItem primaryText="Settings" />
                        <MenuItem primaryText="Help" />
                        <Divider/>
                        <MenuItem primaryText="Log Out" onTouchTap={this.handleLogOut.bind(this)} />
                    </Popover>
                </div>
            )
        } else {
            return (<div style={{marginTop: '6px'}}><Link to="/login"><FlatButton style={{color: 'white'}} label="Log In" /></Link></div>)
        }
    }

    handleLeftIconButtonTouchTap(event) {
        this.setState({
            openAppPopover: true,
            anchorEl: event.currentTarget
        });
    }

    render() {
        return (
            <div className="top_navigation">
                <AppBar
                    title={<Link to="/"><span style={{marginTop: '11px'}} className="logo"> </span></Link> }
                    iconElementRight={this.renderUserMenu()}
                    onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap.bind(this)}
                />

                <Popover
                    open={this.state.openAppPopover}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose.bind(this)}
                    style={{padding: '20px', overflowY: 'hidden'}}
                    zDepth={3}
                >
                    <MenuItem primaryText="New Composition" />
                </Popover>
            </div>
        );
    }
}

export default Navigation;

import cx from 'classnames';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import StoreAPI from 'StoreAPI';
import {Link} from 'react-router';
import { clearCurrentUser } from 'actions/authActions';

import {FlatButton, FontIcon, Popover, MenuItem, Divider} from 'material-ui';

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signUp: false,
            openUserPopover: false
        }
    }

    toggleModal(state) {
        this.setState({ signUp: state });
    }

    handleRequestClose() {
        this.setState({
            openUserPopover: false
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
        this.props.clearCurrentUser();
        this.handleRequestClose();
    }

    renderUserMenu() {
        if (this.props.currentUser.get('uid')) {
            return (
                <div>
                    <FlatButton
                        label={this.props.currentUser.get('email')}
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
            return (<Link to="/login"><FlatButton style={{color: 'white'}} label="Log In" /></Link>)
        }
    }

    render() {
        return (
            <div className="top_navigation">
                <AppBar
                    title={<Link to="/"><span style={{marginTop: '11px'}} className="logo"> </span></Link> }
                    iconElementRight={this.renderUserMenu()}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser:  StoreAPI.getCurrentUser()
    };
}


export default connect(mapStateToProps, {
    clearCurrentUser
})(Navigation);

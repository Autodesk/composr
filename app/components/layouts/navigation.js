import cx from 'classnames';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import StoreAPI from 'StoreAPI';
import {Link} from 'react-router';

import {FlatButton, FontIcon} from 'material-ui';

class Navigation extends React.Component {

    static get propTypes() {
        return {
            pushState: React.PropTypes.func
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            signUp: false
        }
    }

    toggleModal(state) {
        this.setState({ signUp: state });
    }

    renderUserMenu() {
        if (this.props.currentUser) {
            return (
                <FlatButton
                    label={this.props.currentUser.get('email')}
                    labelPosition="before"
                    icon={<FontIcon style={{fontSize: '12px'}} className="fa fa-chevron-down"/>}
                />
            )
        } else {
            return (<FlatButton label="Log In" />)
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

function mapDispatchToProps(dispatch) {
    return {
    };
}

function mapStateToProps(state) {
    return {
        currentUser:  StoreAPI.getCurrentUser()
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

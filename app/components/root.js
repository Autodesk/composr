import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import FirebaseAPI from 'firebase/firebase';
import { getCurrentUser, clearCurrentUser } from 'actions/authActions';

class Root extends React.Component {
    static get propTypes() {
        return {
            pushState: React.PropTypes.func,
            replaceState: React.PropTypes.func
        };
    }

    componentDidMount() {
        FirebaseAPI.getCurrentUser(this.props.getCurrentUser, this.props.clearCurrentUser);
        if (this.props.location.pathname === '/') {
            //return this.props.replaceState('index');
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                { this.props.children && React.cloneElement(this.props.children, {
                    pushState: this.props.pushState
                }) }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
};

export default connect(mapStateToProps, {
    getCurrentUser,
    clearCurrentUser,
    replaceState: routerActions.replace,
    pushState: routerActions.push
})(Root);

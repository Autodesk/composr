import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import Firebase from 'firebase/firebase';

class Root extends React.Component {
    static get propTypes() {
        return {
            pushState: React.PropTypes.func,
            replaceState: React.PropTypes.func
        };
    }

    componentDidMount() {
        this.offAuthStateChange = Firebase.firebase.auth().onAuthStateChanged (
            (user) => {
               if (user) {
                   if (this.props.location.pathname === 'login') {
                       return this.props.replaceState('/');
                   }
               }
            }
        )
    }

    componentWillUnmount() {
        this.offAuthStateChange();
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

export default connect(null, {
    replaceState: routerActions.replace,
    pushState: routerActions.push
})(Root);

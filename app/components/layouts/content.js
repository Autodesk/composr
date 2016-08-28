import Navigation from 'layouts/navigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { routerActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { getCurrentUser, clearCurrentUser } from 'actions/authActions';
import store from 'store';

const ComposrPurple = '#563d7c';


const muiTheme = getMuiTheme({
    palette: {
        primary1Color: ComposrPurple,
    },
});

class Content extends React.Component {

    static get propTypes() {
        return {
            children: React.PropTypes.object,
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser.toJS().uid && window.location.pathname != '/visualizer') {
            //this.props.pushState('/visualizer');
        } else {
            //this.props.pushState('/');
        }
    }

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <Navigation pushState={ this.props.pushState } />

                <div className="content">
                    { this.props.children && React.cloneElement(this.props.children, {})}
                </div>
            </div>
                </MuiThemeProvider>
        );
    }
}



function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, {
    getCurrentUser,
    clearCurrentUser,
    replaceState: routerActions.replace,
    pushState: routerActions.push
})(Content);

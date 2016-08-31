import Navigation from 'layouts/navigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { routerActions } from 'react-router-redux';
import { connect } from 'react-redux';

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

    constructor(props) {
        super(props);
    }


    render() {
        const fullscreen = this.props.params.viewtype === 'full';

        const contentClass = "content " + ( fullscreen ? 'content-fullscreen' : '');

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Navigation pushState={ this.props.pushState } fullscreen={ fullscreen } />

                    <div className={contentClass}>
                        { this.props.children && React.cloneElement(this.props.children, {})}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}


function mapStateToProps(state) {
    return {
        fullscreen: state.runtime.display.get('fullscreen')
    }
}

export default connect(mapStateToProps, {
    replaceState: routerActions.replace,
    pushState: routerActions.push
})(Content);

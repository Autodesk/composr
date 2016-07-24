import Navigation from 'common/navigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
            pushState: React.PropTypes.func
        };
    }

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <Navigation
                    pushState={ this.props.pushState } />

                <div className="content">
                    { this.props.children && React.cloneElement(this.props.children, {})
                    }
                </div>
            </div>
                </MuiThemeProvider>
        );
    }
}

export default Content;

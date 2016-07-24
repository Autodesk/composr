import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

class Root extends React.Component {
    static get propTypes() {
        return {
            pushState: React.PropTypes.func.isRequired
        };
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

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
    {
        pushState: routeActions.push,
    })(Root);

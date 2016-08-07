import cx from 'classnames';
import { connect } from 'react-redux';

import store from 'store';
import {addSceneComponent} from 'actions/sceneActions';

import VisController from 'js/VisController';
import ControlsDrawer from './ControlsDrawer';
const CANVAS_ID = "three-canvas";

class Visualizer extends React.Component {
    static get propTypes() {
        return {

        };
    }

    constructor(props) {
        super(props);
        this.state = {
            renderElement: null,
            controller: null
        };

    }

    componentWillMount() {
        const controller = new VisController();

        this.setState({
            controller
        });
    }

    componentDidMount() {
        const element = this.refs[CANVAS_ID];

        this.state.controller.init(element);
        store.dispatch(addSceneComponent(this.state.controller));
        element.appendChild(this.state.controller.renderer.domElement);
        this.state.controller.render();
    }

    render() {
        return (
            <div className="container-fluid visualizer-container">
                <div className="three" ref={CANVAS_ID}></div>
                <ControlsDrawer open={true} controller={this.state.controller}></ControlsDrawer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, { })(Visualizer);


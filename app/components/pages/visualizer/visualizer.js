import cx from 'classnames';
import { connect } from 'react-redux';

import store from 'store';
import {addSceneComponent} from 'actions/sceneActions';

import VisController from 'js/VisController';
import ControlsDrawer from './ControlsDrawer';
import TopMenu from 'layouts/topMenu';


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

        setTimeout( ()=> {
            this.state.controller.init(element);
            element.appendChild(this.state.controller.renderer.domElement);

            this.state.controller.render();

        },1)
    }

    render() {
        return (
            <div className="container-fluid visualizer-container">
                <TopMenu/>
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


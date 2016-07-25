import cx from 'classnames';
import { connect } from 'react-redux';

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
            renderElement: null
        };

    }

    componentDidMount() {
        const element = document.getElementById(CANVAS_ID)
        const renderElement = new VisController(element);
        element.appendChild(renderElement.renderer.domElement);

        this.setState({ renderElement });

        renderElement.render();
    }

    render() {
        return (
            <div className="container-fluid visualizer-container">
                <div className="row" style={{height: '100%'}}>
                    <div className="col-sm-9 three" id={CANVAS_ID}></div>
                    <ControlsDrawer open={true}></ControlsDrawer>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, { })(Visualizer);


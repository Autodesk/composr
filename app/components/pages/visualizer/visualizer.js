import cx from 'classnames';
import StoreAPI from 'StoreAPI';
import ControlsDrawer from './controlsDrawer';
import TopMenu from 'layouts/topMenu';
import VisController from 'js/VisController';

const CANVAS_ID = "three-canvas";

class Visualizer extends React.Component {

    componentWillMount() {
        new VisController();
    }

    componentDidMount() {
        const element = this.refs[CANVAS_ID];

        setTimeout( ()=> StoreAPI.initVisualizer(element), 1);
    }

    render() {
        return (
            <div className="container-fluid visualizer-container">
                <TopMenu/>
                <div className="three" ref={CANVAS_ID}></div>
                <ControlsDrawer/>
            </div>
        );
    }
}


export default Visualizer;


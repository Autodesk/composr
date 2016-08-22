import cx from 'classnames';
import StoreAPI from 'StoreAPI';
import VisController from 'js/VisController';
import ControlsDrawer from './controlsDrawer';
import TopMenu from 'layouts/topMenu';
import connector from 'js/connector';
import {debounce} from 'lodash/function';

const CANVAS_ID = "three-canvas";

class Visualizer extends React.Component {

    componentWillMount() {
        new VisController();
    }

    componentDidMount() {
        const element = this.refs[CANVAS_ID];

        setTimeout( ()=> {
            StoreAPI.initVisualizer(element);
            StoreAPI.loadStateRemote(this.props.params.visName, () => {
                StoreAPI.listenRemote(this.props.params.visName);
            });

            const update = debounce(() => StoreAPI.saveStateRemote(this.props.params.visName), 200, { 'maxWait': 100 });

            //new connector(
            //    (state) => state.scene,
            //    update);

        }, 10);
    }

    render() {
        return (
            <div className="container-fluid visualizer-container">
                <TopMenu visName={this.props.params.visName}/>
                <div className="three" ref={CANVAS_ID}></div>
                <ControlsDrawer/>
            </div>
        );
    }
}


export default Visualizer;
import cx from 'classnames';
import StoreAPI from 'StoreAPI';
import FirebaseAPI from 'firebase/firebase';

import VisController from 'js/VisController';
import ControlsDrawer from './controlsDrawer';
import TopMenu from 'layouts/topMenu';
//import connector from 'js/connector';
import {debounce} from 'lodash/function';
import { connect } from 'react-redux';


const CANVAS_ID = "three-canvas";

class Visualizer extends React.Component {
    componentWillMount() {
        new VisController();

        if (this.props.params.compId) {
            FirebaseAPI.setDatabaseCompRef(this.props.params.uid, this.props.params.compId);
        }
    }

    componentDidMount() {
        document.body.classList.toggle('noScroll');

        const element = this.refs[CANVAS_ID];
        if (this.props.params.compId) {
            StoreAPI.loadStateRemote(() => {
                StoreAPI.initVisualizer(element);
                StoreAPI.listenRemote(this.props.params.visName);
            });
        } else {
            StoreAPI.initVisualizer(element);
        }

        StoreAPI.getController().render();

        //setTimeout( ()=> {
        //
        //
        //
        //    const update = debounce(() => StoreAPI.saveStateRemote(this.props.params.visName), 200, { 'maxWait': 100 });
        //
        //    //new connector(
        //    //    (state) => state.scene,
        //    //    update);
        //
        //}, 10);
    }

    componentDidUpdate() {
        StoreAPI.initVisualizer(this.refs[CANVAS_ID]);
    }

    render() {
        const fullscreen = this.props.params.viewType === 'full';

        const compData = {uid: this.props.params.uid, compId: this.props.params.compId};

        const three = <div className="three" ref={CANVAS_ID}></div>;

        const ui = fullscreen ? three : [
            <TopMenu compData={ compData }/>,
            three,
            <ControlsDrawer/>
        ];

        return (
            <div className="container-fluid visualizer-container">
                {ui}
            </div>
        );
    }
}

export default Visualizer;
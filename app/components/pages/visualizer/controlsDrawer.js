import cx from 'classnames';
import { connect } from 'react-redux';
import {Drawer, Tabs, Tab, FontIcon} from 'material-ui';
import Layers from './layers';
import Deformers from './deformers';
import Materials from './materials';
import DataControls from './dataControls';

class ControlsDrawer extends React.Component {
    static get propTypes() {
        return {
            open: React.PropTypes.bool,
            controller: React.PropTypes.object
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            renderElement: null
        };

    }

    render() {
        return (
            <div className="controlsDrawer col-sm-3">
                <Tabs>
                    <Tab icon={<FontIcon className="fa fa-cubes"/>} >
                        <div className="controlsDrawerInner" >
                            <div style={{marginBottom: '10px'}}>Layers</div>
                            <Layers></Layers>
                        </div>
                    </Tab>

                    <Tab icon={<FontIcon className="fa fa-circle-thin"/>} >
                        <div className="controlsDrawerInner" >
                            <div style={{marginBottom: '10px'}}>Materials</div>
                            <Materials></Materials>
                        </div>
                    </Tab>

                    <Tab icon={<FontIcon className="fa fa-asterisk"/>} >
                        <div className="controlsDrawerInner" >
                            <div style={{marginBottom: '10px'}}>Deformers</div>
                            <Deformers></Deformers>
                        </div>
                    </Tab>

                    <Tab icon={<FontIcon className="fa fa-camera-retro"/>} >
                        <div className="controlsDrawerInner" >
                            Controls
                        </div>
                    </Tab>

                    <Tab icon={<FontIcon className="fa fa-volume-up"/>} >
                        <div className="controlsDrawerInner" >
                            Sound Controls
                            <DataControls></DataControls>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default ControlsDrawer;


import cx from 'classnames';
import { connect } from 'react-redux';
import VisController from 'js/VisController';
import {Drawer, Tabs, Tab, FontIcon} from 'material-ui';

import DataDisplay from 'common/dataDisplay'
import Layers from 'common/layers'

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
                            <DataDisplay data={this.props.controller.data}></DataDisplay>

                            <Layers></Layers>
                        </div>
                    </Tab>

                    <Tab icon={<FontIcon className="fa fa-circle-thin"/>} >
                        <div className="controlsDrawerInner" >
                            Material
                        </div>
                    </Tab>

                    <Tab icon={<FontIcon className="fa fa-asterisk"/>} >
                        <div className="controlsDrawerInner" >
                            Deformers
                        </div>
                    </Tab>

                    <Tab icon={<FontIcon className="fa fa-camera-retro"/>} >
                        <div className="controlsDrawerInner" >
                            Controls
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default ControlsDrawer;


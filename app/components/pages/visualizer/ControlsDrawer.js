import cx from 'classnames';
import { connect } from 'react-redux';
import VisController from 'js/VisController';
import Drawer from 'material-ui/Drawer';

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
            <div className="controlsDrawer col-sm-3" >
                <div  open={this.props.open}>
                    <DataDisplay data={this.props.controller.data}></DataDisplay>
                    <Layers></Layers>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, { })(ControlsDrawer);


import cx from 'classnames';
import { connect } from 'react-redux';

import VisController from 'js/VisController';
import Drawer from 'material-ui/Drawer';

const CANVAS_ID = "three-canvas";

class ControlsDrawer extends React.Component {
    static get propTypes() {
        return {
            open: React.PropTypes.bool
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


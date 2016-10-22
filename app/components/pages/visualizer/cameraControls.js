/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import { connect } from 'react-redux';
import {updateDatasourceSettings} from 'actions/mainActions';

import StoreAPI from 'StoreAPI';

import {FlatButton} from 'material-ui';

class CameraControls extends React.Component {
    render() {
        if (this.props.controls === undefined) return null;

        const controls = []
        this.props.controls.forEach((v) => {
            controls.push(<div>{
                StoreAPI.getObjectById(v.toJS().uuid).renderUI()
            }</div>);
        })

        return (
            <div>
                {controls}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        controls: state.scene.get('controls')
    }
}

export default connect(mapStateToProps)(CameraControls);


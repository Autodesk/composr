/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import { connect } from 'react-redux';
import ValueSlider from 'common/valueSlider';

import {updateDatasourceSettings} from 'actions/mainActions';

import store from 'store';

class DataControls extends React.Component {

    //static get propTypes() {
    //    //return {
    //    //    maxDataSize: React.PropTypes.number,
    //    //};
    //}

    handleMaxDataSize(e,v) {
        store.dispatch(updateDatasourceSettings({
            maxDataSize: v
        }));
    }

    render() {
        return (
            <div>
                <ValueSlider name="Time Buffer Size" min={1} max={250} step={1} value={this.props.maxDataSize} onChange={this.handleMaxDataSize.bind(this)}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        maxDataSize: state.dataSource.settings.get('maxDataSize')
    }
}

export default connect(mapStateToProps)(DataControls);

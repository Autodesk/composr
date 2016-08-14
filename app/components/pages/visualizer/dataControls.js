/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import { connect } from 'react-redux';
import ValueSlider from 'common/valueSlider';

class DataControls extends React.Component {

    static get propTypes() {
        return {
            layers: React.PropTypes.object,
        };
    }



    renderLayerList() {
        const listItems = [];

        if (this.props.layers) {
            for (let layer of this.props.layers.values()) {
                listItems.push(<ComposeElement key={layer.get('uuid')} uuid = {layer.get('uuid')} />);
            }
        }

        return listItems;
    }

    render() {
        return (
            <div>
                <ValueSlider name="Length" min={1} max={250} step={1} value={this.props.maxDataSize} />
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

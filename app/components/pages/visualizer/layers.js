/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import ComposeElement from 'common/composeElement';
import {List, ListItem} from 'material-ui/List';

class Layers extends React.Component {
    renderLayerList() {
        const listItems = [];

        if (this.props.layers) {
            for (let layer of this.props.layers.values()) {
                listItems.push(<ComposeElement key={layer.get('uuid')} type={layer.get('type')} uuid={layer.get('uuid')} />);
            }
        }

        return listItems;
    }

    render() {
        return (
            <div>
                    {this.renderLayerList()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        layers: state.scene.get('layer')
    }
}

export default connect(mapStateToProps)(Layers);

/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Layer from 'common/layer';
import store from 'store';
import {addSceneComponent} from 'actions/sceneActions';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import ComposeLayer from 'js/Scene/ComposeLayer';

class Layers extends React.Component {

    static get propTypes() {
        return {
            layers: React.PropTypes.object,
        };
    }

    addLayer(e) {
        store.dispatch(addSceneComponent(new ComposeLayer({name: 'Unnamed Layer'})));
    }

    renderLayerList() {
        const listItems = [];

        if (this.props.layers) {
            for (let layer of this.props.layers.values()) {

                listItems.push(<Layer key={layer.get('uuid')} {...layer.toJS()} />);
            }
        }

        return listItems;
    }

    render() {
        console.log('render list');

        return (
            <div>
                <FlatButton label="Add Layer" onClick={this.addLayer}/>
                <List>
                    {this.renderLayerList()}
                </List>
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

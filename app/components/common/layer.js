/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import FlatButton from 'material-ui/FlatButton';
import store from 'store';
import {removeSceneComponent} from 'actions/sceneActions';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

class Layer extends React.Component {

    static get propTypes() {
        return {
            uuid: React.PropTypes.string,
            name: React.PropTypes.string,
            type: React.PropTypes.string
        };
    }

    removeLayer(e) {
        store.dispatch(removeSceneComponent( {uuid: this.props.uuid, type: this.props.type } ));
    }

    render() {
        return (
            <ListItem primaryText={this.props.name}
                      rightIcon={<FontIcon onClick={()=>this.removeLayer()} className="fa fa-times"/>} />
        )
    }
}

export default Layer;

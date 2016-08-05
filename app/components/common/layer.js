/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import FlatButton from 'material-ui/FlatButton';
import storeAPI from 'StoreAPI';
import {removeSceneComponentById} from 'actions/sceneActions';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import cx from 'classnames';

class Layer extends React.Component {

    componentWillMount( ) {
        this.state = {
            object: storeAPI.getObjectById(this.props.uuid)
        }
    }

    static get propTypes() {
        return {
            uuid: React.PropTypes.string,
            name: React.PropTypes.string,
            visible: React.PropTypes.bool
        };
    }

    removeLayer(e) {
        this.state.object.destroy();
    }

    toggleHidden(e) {
        this.state.object.setState({visible: !this.props.visible});
    }

    render() {
        const visibleClass = cx('fa', {'fa-eye': this.props.visible, 'fa-eye-slash': !this.props.visible});

        return (
            <ListItem primaryText={this.props.name}
                      leftIcon={<FontIcon onClick={()=>this.toggleHidden()} className={visibleClass}/>}
                      rightIcon={<FontIcon onClick={()=>this.removeLayer()} className="fa fa-times"/>} />
        )
    }
}

export default Layer;

/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import storeAPI from 'StoreAPI';
import {removeSceneComponentById} from 'actions/sceneActions';
import {ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import cx from 'classnames';
import {debounce} from 'lodash/function';

class ComposeElement extends React.Component {
    constructor(props) {

        super(props);

        this.state = { object: storeAPI.getObjectById(props.uuid) }
        this.shouldUpdate = false;

        this.lazy = () => {
            this.shouldUpdate = true;
        }

        this.lazyUpdate = debounce(this.lazy, 10, { 'maxWait': 100 });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props !== nextProps) {
            this.lazyUpdate();
        }

        return this.shouldUpdate;
    }

    static get propTypes() {
        return {
            uuid: React.PropTypes.string,
            type: React.PropTypes.string
        };
    }

    render() {
        this.shouldUpdate = false;
        return(this.state.object.renderUI());
    }
}


function mapStateToProps(state, ownProp) {
    const object = storeAPI.getObjectById(ownProp.uuid);
    const type = object.constructor.type();

    return {
        store: state.scene.getIn([type, ownProp.uuid])
    }
}

export default connect(mapStateToProps)(ComposeElement);

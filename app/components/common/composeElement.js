/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import storeAPI from 'StoreAPI';
import {removeSceneComponentById} from 'actions/sceneActions';
import {ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import cx from 'classnames';
import {debounce} from 'lodash/function';

class ComposeElement extends React.Component {
    constructor(props) {

        super(props);

        this.state = { object: storeAPI.getObjectById(props.uuid) }

        this.lazyUpdate = debounce(this.forceUpdate, 100, { 'maxWait': 100 });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props !== nextProps) {
            this.lazyUpdate();
        }

        return false;
    }

    static get propTypes() {
        return {
            uuid: React.PropTypes.string,
            type: React.PropTypes.string,
            initiallyExpanded: React.PropTypes.bool
        };
    }

    getDefaultProps() {
        return {
            initiallyExpanded: false
        };
    }

    render() {
        return this.state.object.renderUI();
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

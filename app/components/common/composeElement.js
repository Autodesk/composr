/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import StoreAPI from 'StoreAPI';
import {ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import cx from 'classnames';
import {debounce} from 'lodash/function';

class ComposeElement extends React.Component {
    constructor(props) {
        super(props);

        this.lazyUpdate = debounce(this.forceUpdate, 60, { 'maxWait': 100 });
    }

    shouldComponentUpdate(nextProps, nextState) {
        for (let k of Object.keys(this.props)) {
            if (this.props[k] !== nextProps[k]) {
                this.lazyUpdate();
                return false;
            }
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

    static defaultProps() {
        return {
            initiallyExpanded: false
        };
    }

    render() {
        if (!this.props.object.get('isMounted'))
            return null;

        const object = StoreAPI.getObjectById(this.props.uuid);

        return (object.renderUI());
    }
}


function mapStateToProps(state, ownProp) {
    return {
        object: state.scene.getIn([ownProp.type, ownProp.uuid])
    }
}

export default connect(mapStateToProps)(ComposeElement);

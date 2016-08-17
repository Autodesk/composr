/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import ComposeElement from 'common/composeElement';
import {List, ListItem} from 'material-ui/List';

class Materials extends React.Component {

    static get propTypes() {
        return {
            materials: React.PropTypes.object,
        };
    }

    renderList() {
        const listItems = [];

        //if (this.props.layers) {
        //    for (let layer of this.props.layers.values()) {
        //        listItems.push(<ComposeElement key={layer.get('uuid')} uuid = {layer.get('uuid')} />);
        //    }
        //}

        return listItems;
    }

    render() {
        return (
            <div>
                    Material list
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        //materials: state.scene.get('material')
    }
}

export default connect(mapStateToProps)(Materials);

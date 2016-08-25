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

        if (this.props.materials) {
            for (let material of this.props.materials.values()) {
                listItems.push(<ComposeElement key={material.get('uuid')} type={material.get('type')} uuid={material.get('uuid')} />);
            }
        }

        return listItems;
    }

    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        materials: state.scene.get('material')
    }
}

export default connect(mapStateToProps)(Materials);

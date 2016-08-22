/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import ComposeElement from 'common/composeElement';
import {List, ListItem} from 'material-ui/List';

class Deformers extends React.Component {

    static get propTypes() {
        return {
            materials: React.PropTypes.object,
        };
    }

    renderList() {
        const listItems = [];

        if (this.props.deformers) {
            for (let deformer of this.props.deformers.values()) {
                listItems.push(<ComposeElement key={deformer.get('uuid')} type={deformer.get('type')} uuid = {deformer.get('uuid')} />);
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
        deformers: state.scene.get('deformer')
    }
}

export default connect(mapStateToProps)(Deformers);

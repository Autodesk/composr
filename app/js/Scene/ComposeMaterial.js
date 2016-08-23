/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import ComposeObject from 'js/ComposeObject';

import EditableLabel from 'common/editableLabel';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {FontIcon, FlatButton, Subheader} from 'material-ui';

class ComposeMaterial extends ComposeObject {
    componenetDidMount() {
        this.material = null;
    }

    static type() {
        return 'material';
    }

    renderTypeUI() {
        console.log('rendered', this.name)
        // Implement this in extended class
    }

    renderUI() {
        return (<Card>
            <CardActions
                title={this.state.get('name')}
                textStyle={{padding: '10px'}}
                showExpandableButton={true}>
                <EditableLabel label={this.state.get('name')} onChange={this.handleRename.bind(this)} />
                <Subheader style={{lineHeight: '14px', padding: 0}}>{this.constructor.name}</Subheader>
            </CardActions>

            <CardText expandable={true}>
                { this.renderTypeUI() }
            </CardText>
        </Card>)
    }
}

export default ComposeMaterial;
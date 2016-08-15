/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import ComposeObject from 'js/ComposeObject';
import ComposeMesh from 'js/Scene/ComposeMesh';

import StoreAPI from 'StoreAPI';
import {ListItem, Divider} from 'material-ui';
import ValueSlider from 'common/valueSlider';
import FontIcon from 'material-ui/FontIcon';
import ComposeElement from 'common/composeElement';
import EditableLabel from 'common/editableLabel';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import LayerActions from 'common/layerActions';

class ComposeLayer extends ComposeObject {
    constructor(options = {}) {
        options = ComposeLayer.setDefaults(options,{
            visible: true
        });

        super(options);

        this.addReference('composeMesh');
        if (this.createReferenceById('composeMesh', options.composeMesh) === undefined) {
            this.composeMesh = new ComposeMesh();
        }

        this.setVisibiltyFromState();
    }

    setVisibiltyFromState() {
        if (this.state.get('visible')) {
            StoreAPI.getController().scene.add(this.composeMesh.mesh);
        } else {
            StoreAPI.getController().scene.remove(this.composeMesh.mesh);
        }
    }

    objectWillUnmount() {
        StoreAPI.getController().scene.remove(this.composeMesh.mesh);
    }

    update(ctx) {
        this.composeMesh.update(ctx.data);
    }

    static type() {
        return 'layer'
    }

    toggleHidden() {
        this.setState({visible: !this.state.get('visible')});
    }

    destroy() {
        super.destroy();
        this.composeMesh.destroy();
    }

    sliderChange(e, value) {
        this.setState({value})
    }

    onStateChange(changedKeys, prevState) {
        if (changedKeys.indexOf('visible') > -1) {
            this.setVisibiltyFromState();
        }
    }

    handleRename(newName) {
        this.setState({name: newName});
    }

    renderUI() {


        return (<Card showExpandableButton={true}>
            <LayerActions
                removeLayer={()=>this.destroy()}
                toggleHidden={()=>this.toggleHidden()}
                visible= {this.state.get('visible')}
            />
                    <CardActions
                        title={this.state.get('name')}
                        textStyle={{padding: '10px'}}
                        showExpandableButton={true}

                    >
                        <EditableLabel label={this.state.get('name')} onChange={this.handleRename.bind(this)} />

                    </CardActions>



                    <CardText expandable={true}>
                        <ComposeElement key={this.composeMesh.uuid} uuid={this.composeMesh.uuid} />
                    </CardText>
                </Card>)

    }
}

ComposeLayer.registerObject('ComposeLayer', ComposeLayer);


export default ComposeLayer;
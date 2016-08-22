/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import ComposeObject from 'js/ComposeObject';
import ComposeMesh from 'js/Scene/ComposeMesh';

import StoreAPI from 'StoreAPI';

import ComposeElement from 'common/composeElement';
import EditableLabel from 'common/editableLabel';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {FontIcon, FlatButton} from 'material-ui';
import LayerActions from 'common/layerActions';

class ComposeLayer extends ComposeObject {
    defaults() {
        return {
            visible: true
        }
    }

    componenetDidMount() {
        this.addReference('composeMesh');
        if (this.createReferenceById('composeMesh', this.get('composeMesh')) === undefined) {
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
        if (!this.get('isMounted')) return;
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

    renderUI() {
        return (<Card>
                    <LayerActions
                        removeLayer={()=>this.destroy()}
                        toggleHidden={()=>this.toggleHidden()}
                        visible= {this.state.get('visible')}
                    />
                    <CardActions
                        title={this.state.get('name')}
                        textStyle={{padding: '10px'}}
                        showExpandableButton={true} >
                        <EditableLabel label={this.state.get('name')} onChange={this.handleRename.bind(this)} />
                    </CardActions>



                    <CardText expandable={true}>
                        <ComposeElement key={this.composeMesh.uuid} uuid={this.composeMesh.uuid} type={this.composeMesh.type}/>
                    </CardText>
                </Card>)

    }
}

ComposeLayer.registerObject('ComposeLayer', ComposeLayer);


export default ComposeLayer;
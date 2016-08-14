/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import ComposeObject from 'js/ComposeObject';
import ComposeMesh from 'js/Scene/ComposeMesh';

import StoreAPI from 'StoreAPI';
import {ListItem, Divider} from 'material-ui';
import ValueSlider from 'common/valueSlider';
import cx from 'classnames';
import FontIcon from 'material-ui/FontIcon';
import ComposeElement from 'common/composeElement';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class ComposeLayer extends ComposeObject {
    constructor(options = {}) {
        options = ComposeLayer.setDefaults(options,{
            visible: true
        });

        super(options);

        this.composeMesh = new ComposeMesh();
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

    renderUI() {
        const visibleClass = cx('fa', {
            'fa-eye': this.state.get('visible'),
            'fa-eye-slash': !this.state.get('visible')
        });

        return (<Card>
                    <CardHeader
                        title={this.state.get('name')}
                        actAsExpander={true}
                        showExpandableButton={true}
                        initiallyExpanded={true}
                    />
            <ListItem primaryText={this.state.get('name')}
                      leftIcon={<FontIcon onClick={()=>this.toggleHidden()} className={visibleClass}/>}
                      rightIcon={<FontIcon onClick={()=>this.destroy()} className="fa fa-times"/>} />

                    <CardText expandable={true}>
                        <ComposeElement key={this.composeMesh.uuid} uuid={this.composeMesh.uuid} />
                    </CardText>
                </Card>)

    }
}

ComposeLayer.registerObject('ComposeLayer', ComposeLayer);


export default ComposeLayer;
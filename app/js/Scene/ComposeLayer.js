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
        this.hideMesh();
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
        this.composeMesh.destroy();
        super.destroy();
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

        return (
            <div>

                <ListItem primaryText={this.state.get('name')}
                          leftIcon={<FontIcon onClick={()=>this.toggleHidden()} className={visibleClass}/>}
                          rightIcon={<FontIcon onClick={()=>this.destroy()} className="fa fa-times"/>} />

                <Divider />

                <ComposeElement key={this.composeMesh.uuid} uuid={this.composeMesh.uuid} />

            </div>
        )
    }
}

export default ComposeLayer;
/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import ComposeObject from 'js/ComposeObject';
import ComposeMesh from 'js/Scene/ComposeMesh';

import {defaults} from 'lodash';
import StoreAPI from 'StoreAPI';
import {ListItem, Divider} from 'material-ui';
import ValueSlider from 'common/valueSlider';
import cx from 'classnames';
import FontIcon from 'material-ui/FontIcon';
import ComposeElement from 'common/composeElement';

class ComposeLayer extends ComposeObject {
    constructor(options = {}) {
        super(options);

        options = defaults(options, {
            visible: true
        });

        this.setState({
            visible: options.visible
        });
        this.composeMesh = new ComposeMesh();
        this.showMesh();
    }

    showMesh() {
        StoreAPI.getController().scene.add(this.composeMesh.mesh);
    }

    hideMesh() {
        StoreAPI.getController().scene.remove(this.composeMesh.mesh);
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

        if (this.state.get('visible')) {
            this.showMesh();
        } else {
            this.hideMesh();
        }
    }

    destroy() {
        this.composeMesh.destroy();
        super.destroy();
    }

    sliderChange(e, value) {
        this.setState({value})
    }

    onStateChange() {
        if (this.composeMesh) {
            this.composeMesh.material.color.setRGB(this.state.get('value'),  0.2, 0.2);
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

                <ValueSlider value={this.state.get('value')} onChange={this.sliderChange.bind(this)} />
                <Divider />

                <ComposeElement key={this.composeMesh.uuid} uuid={this.composeMesh.uuid} />

            </div>
        )
    }
}

export default ComposeLayer;
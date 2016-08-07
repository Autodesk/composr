/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import ComposeObject from 'js/ComposeObject';
import ComposeMesh from 'js/Scene/ComposeMesh';

import {defaults} from 'lodash';
import StoreAPI from 'StoreAPI';

import {ListItem, Slider} from 'material-ui';
import cx from 'classnames';
import FontIcon from 'material-ui/FontIcon';

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
            //<ListItem primaryText={this.state.get('name')}
            //          leftIcon={<FontIcon onClick={()=>this.toggleHidden()} className={visibleClass}/>}
            //          rightIcon={<FontIcon onClick={()=>this.destroy()} className="fa fa-times"/>} />
            <Slider onChange = {(e, v) => this.sliderChange(e, v)}/>
        )
    }
}

export default ComposeLayer;
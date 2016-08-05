/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import ComposeObject from 'js/ComposeObject';
import ComposeMesh from 'js/Scene/ComposeMesh';

import {defaults} from 'lodash';
import StoreAPI from 'StoreAPI';

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
}

export default ComposeLayer;
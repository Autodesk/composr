/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import ComposeObject from 'js/ComposeObject';

class ComposeLayer extends ComposeObject {
    constructor(options) {
        super(options);

        this.type = 'layer';
    }

    selector(state) {
        return state.scene.getIn(['layers', this.uuid]);
    }
}

export default ComposeLayer;
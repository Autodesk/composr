/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import ComposeObject from 'js/ComposeObject';
import SND from 'js/Deformers/SimplexNoiseDeformer';

class ComposeGeometry extends ComposeObject {
    componenetDidMount() {
        this._geometry = null;
    }

    static type() {
        return 'geometry';
    }

    get geometry() {
        return this._geometry;
    }

    onStateChange() {
        this.updateGeometry();
    }

    setDeformerAttributes() {
        SND.setGeometry(this.geometry);
    }
}

export default ComposeGeometry;
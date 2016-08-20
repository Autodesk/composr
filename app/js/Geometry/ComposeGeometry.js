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

    renderUI() {
        return (<div>
            <ValueSlider value={this.state.get('value')} onChange={this.sliderChange.bind(this)} />
        </div>);
    }
}

export default ComposeGeometry;
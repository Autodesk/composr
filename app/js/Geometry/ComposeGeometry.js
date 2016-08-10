/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import ComposeObject from 'js/ComposeObject';
import SND from 'js/Deformers/SimplexNoiseDeformer';

class ComposeGeometry extends ComposeObject {
    constructor(options) {
        super(options);
    }

    static type() {
        return 'geometry';
    }

    setDeformerAttributes() {
        SND.setGeometry(this.geometry);
    }

    renderUI() {
        return (<div>
            <ValueSlider value={this.state.get('value')} onChange={this.sliderChange.bind(this)} />
        </div>)
    }
}

export default ComposeGeometry;
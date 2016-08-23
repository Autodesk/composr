import ComposeMaterial from 'js/Scene/ComposeMaterial';
import ValueSlider from 'common/valueSlider';
import { SketchPicker } from 'react-color';


class StandardMaterial extends ComposeMaterial {
    defaults() {
        return {
            color: 0x563d7c,
            emissive: 0x250734,
            roughness: 0.1,
            metalness: 0.1
        }
    }

    componenetWillMount() {

    }

    renderTypeUI() {
        return (<div>
            <SketchPicker />
        </div>)
    }
}
//<ValueSlider name="Width" min={0.1} max={50} step={0.1} value={this.state.get('width')} onChange={this.sliderChange.bind(this, 'width')} />

StandardMaterial.registerObject('StandardMaterial', StandardMaterial)

export default StandardMaterial
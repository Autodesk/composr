/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import Deformer from 'js/Scene/ComposeDeformer';
import ValueSlider from 'common/valueSlider';

class NormalPushDeformer extends Deformer {
    defaults() {
        return {
            scale: 1,
            direction: [0,1,0]
        }
    }

    apply(geometry, data) {
        const position = geometry.getAttribute('position').array;
        const bPosition = geometry.getAttribute(Deformer.BASE_POSITION).array;
        const uv = geometry.getAttribute(Deformer.UV).array;

        const direction = this.get('direction').toJS();

        for (var i= 0, j=0; i < position.length; i+=3, j+=2){
            const val = ( this.getValFromData(data,  uv[j], uv[j+1])) * this.get('scale');

            position[i  ] = bPosition[i  ] + direction[0] * val;
            position[i+1] = bPosition[i+1] + direction[1] * val;
            position[i+2] = bPosition[i+2] + direction[2] * val;
        }

        geometry.getAttribute('position').needsUpdate = true;
    }

    sliderChange(propName, e, v) {
        this.setState({
            [propName]: v
        })
    }

    renderValueSliderFromState(stateKey, name, {min, max, step}) {
        return (
            <ValueSlider name={name} min={min} max={max} step={step} value={this.state.get(stateKey)} onChange={this.sliderChange.bind(this, stateKey)} />
        )
    }

    renderTypeUI() {
        return (
            <div>
                {this.renderValueSliderFromState('scale', 'Effect Scale', {min: -5, max: 5, step: 0.01})}
            </div>
        );
    }
}

NormalPushDeformer.registerObject('NormalPushDeformer', NormalPushDeformer);

export default NormalPushDeformer;
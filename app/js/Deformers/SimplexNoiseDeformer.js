/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import Noise from './PerlinNoiseFunction';
import Deformer from 'js/Scene/ComposeDeformer';
import ValueSlider from 'common/valueSlider';

class SimplexNoiseDeformer extends Deformer {
    componenetDidMount() {
        this.time = 0;
    }

    defaults() {
        return {
            scale: 0.5,
            octaves: 1,
            speed: 0.0,
            density: 15,
            pointiness: 1,
            center: [0,0,0]
        }
    }

    apply(geometry, data) {
        const time = this.time++;
        const position = geometry.getAttribute('position').array;
        const bPosition = geometry.getAttribute(Deformer.BASE_POSITION).array;
        const uv = geometry.getAttribute(Deformer.UV).array;
        let p, val, d;
        const phase = 0.1 * this.get('speed') * time;
        const center = this.get('center').toJS();

        for (var i= 0, j=0; i < position.length; i+=3, j+=2){
            p = 0, d = this.get('density');
            for (var k=0; k < this.get('octaves'); k++){
                p += Math.pow(Noise.simplex2(uv[j] * d + phase, uv[j+1] * d + phase) , this.get('pointiness')) * this.get('scale') / this.get('octaves');
                d *= d;
            }

            val = 0.5 * p * ( this.getValFromData(data,  uv[j], uv[j+1]));

            position[i  ] = bPosition[i  ] + (bPosition[i  ] - center[0]) * val;
            position[i+1] = bPosition[i+1] + (bPosition[i+1] - center[1]) * val;
            position[i+2] = bPosition[i+2] + (bPosition[i+2] - center[2]) * val;
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
                {this.renderValueSliderFromState('density', 'Density', {min: 0.1, max: 50, step: 0.1})}
                {this.renderValueSliderFromState('scale', 'Effect Scale', {min: -5, max: 5, step: 0.01})}
                {this.renderValueSliderFromState('speed', 'Phase Speed', {min: -2, max: 2, step: 0.01})}
                {this.renderValueSliderFromState('pointiness', 'Pointiness', {min: 1, max: 5, step: 1})}
                {this.renderValueSliderFromState('octaves', 'Octaves', {min: 1, max: 4, step: 1})}
            </div>
        );
    }
}

SimplexNoiseDeformer.registerObject('SimplexNoiseDeformer', SimplexNoiseDeformer);

export default SimplexNoiseDeformer;
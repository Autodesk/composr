/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import Deformer from 'js/Scene/ComposeDeformer';
import ValueSlider from 'common/valueSlider';
import Vector3Input from 'common/vector3Input';
import Noise from './PerlinNoiseFunction';
import {Toggle, Divider} from 'material-ui';

class NormalPushDeformer extends Deformer {
    defaults() {
        return {
            scale: 1,
            direction: [0,1,0],
            directionVariation: [0,0,0],
            variationSpeed: 1,

            noise: false,
            octaves: 1,
            speed: 0.0,
            density: 15,
            pointiness: 1
        }
    }

    componenetDidMount() {
        this.time = 0;
    }

    apply(geometry, data) {
        this.time++;

        const position = geometry.getAttribute('position').array;
        const bPosition = geometry.getAttribute(Deformer.BASE_POSITION).array;
        const uv = geometry.getAttribute(Deformer.UV).array;

        const direction = this.get('direction').toJS();
        const directionVariation = this.get('directionVariation').toJS();
        let p, val, d;
        const phase = 0.1 * this.get('speed') * this.time;

        const dir = [
            direction[0] + directionVariation[0] * Math.sin(this.get('variationSpeed') * 0.1 * this.time),
            direction[1] + directionVariation[1] * Math.sin(this.get('variationSpeed') * 0.1 * this.time),
            direction[2] + directionVariation[2] * Math.sin(this.get('variationSpeed') * 0.1 * this.time)
        ];

        for (var i= 0, j=0; i < position.length; i+=3, j+=2){
            p = 0, d = this.get('density');

            if (this.get('noise')) {
                for (let k=0; k < this.get('octaves'); k++){
                    p += Math.pow(Noise.simplex2(uv[j] * d + phase, uv[j+1] * d + phase) , this.get('pointiness')) * this.get('scale') / this.get('octaves');
                    d *= d;
                }

                val = this.getValFromData(data,  uv[j], uv[j+1]) * p;
            } else {
                val = this.getValFromData(data,  uv[j], uv[j+1]) * this.get('scale');
            }

            position[i  ] = bPosition[i  ] + dir[0] * val;
            position[i+1] = bPosition[i+1] + dir[1] * val;
            position[i+2] = bPosition[i+2] + dir[2] * val;
        }

        geometry.getAttribute('position').needsUpdate = true;
    }

    sliderChange(propName, e, v) {
        this.setState({
            [propName]: v
        })
    }

    renderValueSliderFromState(stateKey, name, {min, max, step, disabled=false}) {
        return (
            <ValueSlider name={name} min={min} max={max} step={step} disabled={disabled} value={this.state.get(stateKey)} onChange={this.sliderChange.bind(this, stateKey)} />
        )
    }

    handleDirectionChange(e, v) {
        this.setState({direction: v});
    }

    handleDirectionVariationChange(e, v) {
        this.setState({directionVariation: v});
    }

    renderTypeUI() {
        const disabled = !this.get('noise');

        return (
            <div>
                {this.renderValueSliderFromState('scale', 'Effect Scale', {min: -5, max: 5, step: 0.01})}
                <Vector3Input name="Direction" value={this.state.get('direction').toArray()}
                              onChange={this.handleDirectionChange.bind(this)}/>

                <Divider/>

                <Vector3Input name="Direction Variation" value={this.state.get('directionVariation').toArray()}
                              onChange={this.handleDirectionVariationChange.bind(this)}/>

                {this.renderValueSliderFromState('variationSpeed', 'Varietion Speed', {min: 0, max: 5, step: 0.01})}

                <Divider/>

                <Toggle
                    label="Noise"
                    toggled={this.get('noise')}
                    onToggle={(e,v) => this.setState({noise: v})}
                />

                {this.renderValueSliderFromState('density', 'Density', {min: 0.1, max: 50, step: 0.1, disabled})}
                {this.renderValueSliderFromState('speed', 'Phase Speed', {min: -2, max: 2, step: 0.01, disabled})}
                {this.renderValueSliderFromState('pointiness', 'Pointiness', {min: 1, max: 5, step: 1, disabled})}
                {this.renderValueSliderFromState('octaves', 'Octaves', {min: 1, max: 4, step: 1, disabled})}
            </div>
        );
    }
}

NormalPushDeformer.registerObject('NormalPushDeformer', NormalPushDeformer);

export default NormalPushDeformer;
/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import Deformer from 'js/Scene/ComposeDeformer';
import ValueSlider from 'common/valueSlider';
import Vector3Input from 'common/vector3Input';

class NormalPushDeformer extends Deformer {
    defaults() {
        return {
            scale: 1,
            direction: [0,1,0],
            directionVariation: [0,0,0],
            variationSpeed: 1
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

        const dir = [
            direction[0] + directionVariation[0] * Math.sin(this.get('variationSpeed') * 0.1 * this.time),
            direction[1] + directionVariation[1] * Math.sin(this.get('variationSpeed') * 0.1 * this.time),
            direction[2] + directionVariation[2] * Math.sin(this.get('variationSpeed') * 0.1 * this.time)
        ];

        for (var i= 0, j=0; i < position.length; i+=3, j+=2){
            const val = ( this.getValFromData(data,  uv[j], uv[j+1])) * this.get('scale');

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

    renderValueSliderFromState(stateKey, name, {min, max, step}) {
        return (
            <ValueSlider name={name} min={min} max={max} step={step} value={this.state.get(stateKey)} onChange={this.sliderChange.bind(this, stateKey)} />
        )
    }

    handleDirectionChange(e, v) {
        this.setState({direction: v});
    }

    handleDirectionVariationChange(e, v) {
        this.setState({directionVariation: v});
    }

    renderTypeUI() {
        return (
            <div>
                {this.renderValueSliderFromState('scale', 'Effect Scale', {min: -5, max: 5, step: 0.01})}
                <Vector3Input name="Direction" value={this.state.get('direction').toArray()}
                              onChange={this.handleDirectionChange.bind(this)}/>

                <Vector3Input name="Direction Variation" value={this.state.get('directionVariation').toArray()}
                              onChange={this.handleDirectionVariationChange.bind(this)}/>

                {this.renderValueSliderFromState('variationSpeed', 'Varietion Speed', {min: 0, max: 5, step: 0.01})}
            </div>
        );
    }
}

NormalPushDeformer.registerObject('NormalPushDeformer', NormalPushDeformer);

export default NormalPushDeformer;
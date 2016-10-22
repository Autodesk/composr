import ValueSlider from 'common/valueSlider';
import ComposeObject from 'js/ComposeObject';

class ComposeCamera extends ComposeObject {
    defaults() {
        return {
            fov: 45,
            near: 0.1,
            far: 15000,
            position: [0, 10, 10],
        }
    }

    componenetWillMount() {
        this._camera = new THREE.PerspectiveCamera(
            this.get('fov'), 16 / 9, this.get('near'), this.get('far')
        );
    }

    componenetDidMount() {

    }

    setCameraAspectRatio(size) {
        this.camera.aspect = size.width / size.height;
        this.camera.updateProjectionMatrix();
    }

    get camera() {
        return this._camera;
    }

    static type() {
        return 'camera';
    }

    onStateChange(changedKeys, prevState) {
        this.camera.position.fromArray(this.get('position').toArray());
    }

    // handleColorChange(color) {
    //     this.setState({color: parseInt(color.hex.substr(1), 16)})
    // }
    //
    // sliderChange(propName, e, v) {
    //     this.setState({
    //         [propName]: v
    //     })
    // }
    //
    // renderValueSliderFromState(stateKey, name, {min, max, step, disabled=false}) {
    //     return (
    //         <ValueSlider name={name} min={min} max={max} step={step} disabled={disabled} value={this.state.get(stateKey)} onChange={this.sliderChange.bind(this, stateKey)} />
    //     )
    // }

    renderUI() {
        return null;

        // return (<div>
        //     <PopupColorPicker name='Color' onChange={this.handleColorChange.bind(this)} color={`#${this.get('color').toString(16)}`} />
        //     <PopupColorPicker name='Emissive' color={`#${this.get('emissive').toString(16)}`} />
        //
        //     {this.renderValueSliderFromState('roughness', 'Roughness', {min: 0, max: 1, step: 0.01})}
        //     {this.renderValueSliderFromState('metalness', 'Metalness', {min: 0, max: 1, step: 0.01})}
        // </div>)
    }
}

ComposeCamera.registerObject('ComposeCamera', ComposeCamera);

export default ComposeCamera;
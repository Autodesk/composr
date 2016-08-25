import ComposeMaterial from 'js/Scene/ComposeMaterial';
import ValueSlider from 'common/valueSlider';
import PopupColorPicker from 'common/popupColorPicker';


class StandardMaterial extends ComposeMaterial {
    defaults() {
        return {
            color: 0x563d7c,
            emissive: 0x250734,
            roughness: 0.5,
            metalness: 0.5
        }
    }

    componenetWillMount() {
        this._material = new THREE.MeshStandardMaterial();
    }

    updateMaterialFromState() {
        for (let i of ['color', 'emissive']) {
            this._material[i].setHex(this.get(i));
        }

        for (let i of ['roughness', 'metalness']) {
            this.material[i] = this.get(i);
        }
    }

    onStateChange(changedKeys, prevState) {
        this.updateMaterialFromState();
    }

    handleColorChange(color) {
        this.setState({color: parseInt(color.hex.substr(1), 16)})
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

    renderTypeUI() {
        return (<div>
            <PopupColorPicker name='Color' onChange={this.handleColorChange.bind(this)} color={`#${this.get('color').toString(16)}`} />
            <PopupColorPicker name='Emissive' color={`#${this.get('emissive').toString(16)}`} />

            {this.renderValueSliderFromState('roughness', 'Roughness', {min: 0, max: 1, step: 0.01})}
            {this.renderValueSliderFromState('metalness', 'Metalness', {min: 0, max: 1, step: 0.01})}
        </div>)
    }
}

StandardMaterial.registerObject('StandardMaterial', StandardMaterial)

export default StandardMaterial
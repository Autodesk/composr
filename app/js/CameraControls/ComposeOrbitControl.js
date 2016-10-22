import ComposeControls from 'js/Scene/ComposeControls';

class ComposeOrbitControl extends ComposeControls {

    update(ctx) {
        this.controls.update();
    }

    onStateChange(changedKeys, prevState) {

    }

    renderUI() {
        return <div>Compose Orbit Controls</div>;
    }
}

ComposeOrbitControl.registerObject('ComposeOrbitControl', ComposeOrbitControl);

export default ComposeOrbitControl;
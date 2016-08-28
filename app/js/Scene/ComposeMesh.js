/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import ComposeObject from 'js/ComposeObject';

import PlaneGeometry from 'js/Geometry/PlaneGeometry';
import SphereGeometry from 'js/Geometry/SphereGeometry';

import SimplexNoiseDeformer from 'js/Deformers/SimplexNoiseDeformer';
import NormalPushDeformer from 'js/Deformers/NormalPushDeformer';

import StandardMaterial from 'js/Materials/StandardMaterial';

import {SelectField, MenuItem,Divider} from 'material-ui';
import Vector3Input from 'common/vector3Input';
import ValueSlider from 'common/valueSlider';
import ComposeElement from 'common/composeElement';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import StoreAPI from 'StoreAPI';

class ComposeMesh extends ComposeObject {
    defaults() {
        const geometryClasses = StoreAPI.getObjectClassesByType('geometry');

        return {
            geometryName: Object.keys(geometryClasses)[0],
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1]
        }
    }

    componenetDidMount() {
        this.geometryClasses = StoreAPI.getObjectClassesByType('geometry');

        this.addReference('deformer');
        if (this.createReferenceById('deformer', this.get('deformer')) === undefined) {
            this.deformer = null;
        }

        this.addReference('material');
        if (this.createReferenceById('material', this.get('material')) === undefined) {
            this.material = new StandardMaterial()//new StandardMaterial();
        }

        this.addReference('geometry');
        if (this.createReferenceById('geometry', this.get('geometry')) === undefined) {
            this.setGeometry();
        } else {
            SimplexNoiseDeformer.setGeometry(this.geometry.geometry);
        }

        this._mesh = new THREE.Mesh(new THREE.BufferGeometry(), this.material.material);
    }

    updateGeometryClasses() {
        this.geometryClasses = StoreAPI.getObjectClassesByType('geometry');
    }

    setGeometry() {
        if (this.geometry) {
            this.geometry.destroy();
        }
        this.geometry = new this.geometryClasses[this.state.get('geometryName')]({udiv: 150, vdiv: 150});
    }

    setMaterial() {
        if (this.material) {
            this.material.destroy();
        }

    }

    handleGeometryChange(e, v, payload) {
        // need To change this implementaion to a direct change of new geometry
        if (payload) {
            this.setState({
                geometryName: payload,
                geometry: ''
            });
        }
    }

    handlePositionChange(e, v) {
        this.setState({position: v});
    }

    handleRotationChange(e, v) {
        this.setState({rotation: v});
    }

    handleScaleChange(e, v) {
        this.setState({scale: [v, v, v]});
    }

    onStateChange(lastState, prevState) {
        this._mesh.position.fromArray(this.state.get('position').toArray());

        const rot = this.state.get('rotation').toArray();
        rot[0] = THREE.Math.degToRad(rot[0]);
        rot[1] = THREE.Math.degToRad(rot[1]);
        rot[2] = THREE.Math.degToRad(rot[2]);

        this._mesh.rotation.fromArray(rot);
        this._mesh.scale.fromArray(this.state.get('scale').toArray());

        if (lastState.changedKeys.indexOf('geometryName') > -1) {
            if (this.createReferenceById('geometry', this.get('geometry')) === undefined) {
                this.setGeometry();
            }
        }
    }

    update(data) {
        if (!this.get('isMounted')) return;

        this.mesh.geometry = this.geometry.geometry;

        if (this.deformer) {
            this.deformer.apply(this.mesh.geometry, data);
        }

        this.mesh.geometry.computeVertexNormals();
    }

    get mesh() {
        return this._mesh;
    }

    static type() {
        return 'mesh';
    }

    destroy() {
        super.destroy();

        if (this.deformer) {
            this.deformer.destroy();
        }

        this.geometry.destroy();
    }

    handleDeformerChange(e, v, payload) {
        return this.createReferenceById('deformer', payload);
    }

    renderUI() {
        const geometryOptions = [];
        let i=0;
        for (let type of Object.keys(this.geometryClasses)) {
            geometryOptions.push(<MenuItem value={type} key={i++} primaryText={`${this.geometryClasses[type].name}`}/>)
        }

        const deformerOptions = [ <MenuItem value={null} key={i++} primaryText={'No Deformation'}/> ];

        if (StoreAPI.getObjectByType('deformer')) {
            for (let deformer of StoreAPI.getObjectByType('deformer')) {
                deformerOptions.push(<MenuItem value={deformer.uuid} key={i++} primaryText={deformer.name}/>)
            }
        }

        const deformerValue = this.deformer ? this.deformer.uuid : null;

        return (
            <div>
                <SelectField value={this.state.get('geometryName')} onChange={this.handleGeometryChange.bind(this)}
                    floatingLabelText="Geometry Type"
                    floatingLabelFixed={true} >
                    {geometryOptions}
                </SelectField>

                <SelectField value={deformerValue} onChange={this.handleDeformerChange.bind(this)}
                    floatingLabelText="Active Geometry Deformer"
                    floatingLabelFixed={true}>
                    {deformerOptions}
                </SelectField>

                <Vector3Input name="Position" value={this.state.get('position').toArray()}
                              onChange={this.handlePositionChange.bind(this)}/>

                <Vector3Input name="Rotation" value={this.state.get('rotation').toArray()}
                              onChange={this.handleRotationChange.bind(this)}/>

                <ValueSlider name="Scale" min={0} max={100} value={this.state.get('scale').toJS()[0]} onChange={this.handleScaleChange.bind(this)} />

                Geometry
                <div style={{ borderLeft: '1px solid #e0e0e0'}}>
                <CardText expandable={true}>
                        <ComposeElement key={this.geometry.uuid} uuid={this.geometry.uuid} type={this.geometry.type}/>
                </CardText>
                </div>


            </div>
        )
    }
}

ComposeMesh.registerObject('ComposeMesh', ComposeMesh);

export default ComposeMesh;
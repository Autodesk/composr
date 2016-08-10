/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import ComposeObject from 'js/ComposeObject';
import GeometryTypes from 'js/Geometry/geometry-types';
import SimplexNoiseDeformer from 'js/Deformers/SimplexNoiseDeformer';

import {SelectField, MenuItem,Divider} from 'material-ui';
import Vector3Input from 'common/vector3Input';
import ComposeElement from 'common/composeElement';

class ComposeMesh extends ComposeObject {
    constructor(options) {
        options = ComposeMesh.setDefaults(options,{
            geometryName: Object.keys(GeometryTypes)[0],
            position: [0,0,0],
            rotation: [0,0,0]
        });

        super(options);

        this.material = new THREE.MeshStandardMaterial({
            color: 0x123524,
            emissive: 0x072534,
            roughness: 0.1,
            metalness: 0.1});

        this._mesh = new THREE.Mesh(new THREE.BufferGeometry(), this.material);


        this.deformer = new SimplexNoiseDeformer();
        this.setGeometry();
    }

    setGeometry() {
        this.geometry = new GeometryTypes[this.state.get('geometryName')]({udiv: 150, vdiv: 150});
        SimplexNoiseDeformer.setGeometry(this.geometry.geometry);
    }

    handleGeometryChange(e, v, payload) {
        if (payload) {
            this.setState({geometryName: payload});
        }
    }

    handlePositionChange(e,v) {
        this.setState({position: v});
    }

    onStateChange(changedKeys, prevState) {
        this._mesh.position.fromArray(this.state.get('position'));
        this._mesh.position.fromArray(this.state.get('rotation'));

        if (changedKeys.indexOf('geometryName') > -1) {
            this.setGeometry();
        }

    }

    update(data) {
        this.mesh.geometry = this.geometry.geometry;
        this.deformer.apply(this.mesh.geometry, data);
        this.mesh.geometry.computeVertexNormals();
    }

    get mesh () {
        return this._mesh;
    }

    static type() {
        return 'mesh';
    }

    destroy() {
        this.deformer.destroy();
        super.destroy();
    }

    renderUI() {
        const items = [];
        for (let type of Object.keys(GeometryTypes) ) {
            items.push(<MenuItem value={type} key={type} primaryText={`${GeometryTypes[type].name}`} />)
        }

        return (
            <div>
                <SelectField value={this.state.get('geometryName')} onChange={this.handleGeometryChange.bind(this)} maxHeight={200}>
                    {items}
                </SelectField>

                <Vector3Input name="Position" value = {this.state.get('position')} onChange={this.handlePositionChange.bind(this)}/>

                <ComposeElement key={this.geometry.uuid} uuid={this.geometry.uuid} />
            </div>
        )
    }
}

export default ComposeMesh;
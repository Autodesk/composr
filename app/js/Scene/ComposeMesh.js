/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import ComposeObject from 'js/ComposeObject';
import GeometryTypes from 'js/Geometry/geometry-types';
import SimplexNoiseDeformer from 'js/Deformers/SimplexNoiseDeformer';

import {SelectField, MenuItem,Divider} from 'material-ui';
import Vector3Input from 'common/vector3Input';

class ComposeMesh extends ComposeObject {
    constructor(options) {
        super(options);

        this.t = 0;

        this.material = new THREE.MeshStandardMaterial({
            color: 0x123524,
            emissive: 0x072534,
            roughness: 0.1,
            metalness: 0.1});

        this._mesh = new THREE.Mesh(new THREE.BufferGeometry(), this.material);
        this.setState({
            geometryName: Object.keys(GeometryTypes)[0],
            position: [0,0,0]
        });


        this.deformer = new SimplexNoiseDeformer();
        this.setGeometry();
    }

    setGeometry() {
        this.geometry = GeometryTypes[this.state.get('geometryName')].createBufferGeometry({udiv: 150, vdiv: 150});
        SimplexNoiseDeformer.setGeometry(this.geometry);
        this.mesh.geometry = this.geometry;
    }

    handleGeometryChange(e, v, payload) {
        if (payload) {
            this.setState({geometryName: payload});
        }
    }

    handlePositionChange(e,v) {
        this.setState({position: v});
    }

    onStateChange() {
        this._mesh.position.fromArray(this.state.get('position').toJS());
    }

    update(data) {
        this.deformer.apply(this.geometry, data);
        this.geometry.computeVertexNormals();

        this.setState({
            position: [10*Math.sin(0.01 * (++this.t)),0,0]
        })
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

                <Vector3Input text="Position" value = {this.state.get('position').toJS()} onChange={this.handlePositionChange.bind(this)}/>
            </div>
        )
    }
}

export default ComposeMesh;
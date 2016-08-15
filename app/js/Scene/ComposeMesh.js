/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import ComposeObject from 'js/ComposeObject';

import PlaneGeometry from 'js/Geometry/PlaneGeometry';
import SphereGeometry from 'js/Geometry/SphereGeometry';

import SimplexNoiseDeformer from 'js/Deformers/SimplexNoiseDeformer';

import {SelectField, MenuItem,Divider} from 'material-ui';
import Vector3Input from 'common/vector3Input';
import ComposeElement from 'common/composeElement';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import StoreAPI from 'StoreAPI';

class ComposeMesh extends ComposeObject {
    constructor(options) {
        const geometryClasses = StoreAPI.getObjectClassesByType('geometry');

        options = ComposeMesh.setDefaults(options, {
            geometryName: Object.keys(geometryClasses)[0],
            position: [0, 0, 0],
            rotation: [0, 0, 0]
        });

        super(options);

        this.geometryClasses = geometryClasses;

        this.material = new THREE.MeshStandardMaterial({
            color: 0x123524,
            emissive: 0x072534,
            roughness: 0.1,
            metalness: 0.1
        });

        this._mesh = new THREE.Mesh(new THREE.BufferGeometry(), this.material);

        this.addReference('deformer');
        if (this.createReferenceById('deformer', options.deformer) === undefined) {
            this.deformer = new SimplexNoiseDeformer();
        }

        this.addReference('geometry');
        if (this.createReferenceById('geometry', options.geometry) === undefined) {
            this.setGeometry();
        } else {
            SimplexNoiseDeformer.setGeometry(this.geometry.geometry);
        }

    }

    updateGeometryClasses() {
        this.geometryClasses = StoreAPI.getObjectClassesByType('geometry');
    }

    setGeometry() {
        if (this.geometry) {
            this.geometry.destroy();
        }
        this.geometry = new this.geometryClasses[this.state.get('geometryName')]({udiv: 150, vdiv: 150});
        SimplexNoiseDeformer.setGeometry(this.geometry.geometry);
    }

    handleGeometryChange(e, v, payload) {
        if (payload) {
            this.setState({geometryName: payload});
        }
    }

    handlePositionChange(e, v) {
        this.setState({position: v});
    }

    onStateChange(changedKeys, prevState) {
        this._mesh.position.fromArray(this.state.get('position').toArray());

        if (changedKeys.indexOf('geometryName') > -1) {
            this.setGeometry();
        }
    }

    update(data) {
        this.mesh.geometry = this.geometry.geometry;
        this.deformer.apply(this.mesh.geometry, data);
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
        this.deformer.destroy();
        this.geometry.destroy();
    }

    renderUI() {
        const items = [];
        for (let type of Object.keys(this.geometryClasses)) {
            items.push(<MenuItem value={type} key={type} primaryText={`${this.geometryClasses[type].name}`}/>)
        }

        return (
            <div>
                <SelectField value={this.state.get('geometryName')} onChange={this.handleGeometryChange.bind(this)}
                             maxHeight={200}>
                    {items}
                </SelectField>

                <Vector3Input name="Position" value={this.state.get('position').toArray()}
                              onChange={this.handlePositionChange.bind(this)}/>

                Geometry
                <div style={{ borderLeft: '1px solid #e0e0e0'}}>
                <CardText expandable={true}>
                        <ComposeElement key={this.geometry.uuid} uuid={this.geometry.uuid}/>
                </CardText>
                </div>


            </div>
        )
    }
}

ComposeMesh.registerObject('ComposeMesh', ComposeMesh);

export default ComposeMesh;
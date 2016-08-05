/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import ComposeObject from 'js/ComposeObject';
import SphereGeometry from 'js/Geometry/SphereGeometry';
import PlaneGeometry from 'js/Geometry/PlaneGeometry';
import SimplexNoiseDeformer from 'js/Deformers/SimplexNoiseDeformer';

class ComposeMesh extends ComposeObject {
    constructor(options) {
        super(options);

        this.material = new THREE.MeshStandardMaterial({
            color: 0x123524,
            emissive: 0x072534,
            roughness: 0.1,
            metalness: 0.1});
        this.geometry = SphereGeometry(1, 250,250);
        SimplexNoiseDeformer.setGeometry(this.geometry);

        this.deformer = new SimplexNoiseDeformer();

        this._mesh = new THREE.Mesh(this.geometry, this.material);
        this._mesh.position.set(THREE.Math.randFloat(-3, 3), THREE.Math.randFloat(-3, 3), THREE.Math.randFloat(-3, 3));
    }

    update(data) {
        this.deformer.apply(this.geometry, data);
        this.geometry.computeVertexNormals();
    }

    get mesh () {
        return this._mesh;
    }

    static type() {
        return 'mesh';
    }
}

export default ComposeMesh;
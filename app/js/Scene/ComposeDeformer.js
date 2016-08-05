/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import ComposeObject from 'js/ComposeObject';
import Noise from './../Deformers/SimplexNoiseDeformer';

class Deformer extends ComposeObject {
    constructor(options = {}) {
        super(options);
    }

    getValFromDataInterpolated(data, u, v) {
        u = (u + 100) % (MOD_EPS);
        v = (v + 100) % (MOD_EPS);

        const int_u = ~~((data.length - 1) * u);
        const int_v = ~~((data[0].length - 1) * v);
        const frac_u = (data.length - 1) * u - int_u;
        const frac_v = (data[0].length - 1) * v - int_v;

        return (1 - frac_u) *
            ((1 - frac_v) * data[int_u][int_v] +
            frac_v * data[int_u][(int_v + 1) % (data[0].length - 1)]) +
            frac_u *
            ((1 - frac_v) * data[(int_u + 1) % (data.length - 1)][int_v] +
            frac_v * data[(int_u + 1) % (data.length - 1)][(int_v + 1) % (data[0].length - 1)]);
    }

    getValFromData(data, u, v) {
        u = Math.abs(u % (Deformer.MOD_EPS));
        v = Math.abs(v % (Deformer.MOD_EPS));

        return data[~~((data.length - 1) * u )][~~((data[0].length - 1) * v )]
    }

    apply(geometry, data) {

    }

    static setGeometry(geometry) {
        geometry.addAttribute(Deformer.BASE_POSITION, geometry.attributes.position.clone());
        geometry.addAttribute(Deformer.UV, geometry.attributes.uv.clone());
    }

    static type() {
        return 'deformer'
    }
}

Deformer.BASE_POSITION = 'base_position';
Deformer.UV = 'deform_uv';
Deformer.MOD_EPS = 1.00000001;

export default Deformer;
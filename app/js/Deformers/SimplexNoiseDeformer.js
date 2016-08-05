/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import Noise from './PerlinNoiseFunction';
import Deformer from 'js/Scene/ComposeDeformer';

class SimplexNoiseDeformer extends Deformer {
    constructor(options = {}) {
        super(options);

        this.ocatves = options.ocatves || 1;
        this.speed = options.speed || 0.01;
        this.scale = options.scale || 0.5;
        this.density = options.density || 15;
        this.pointiness = options.pointiness || 1;
        this.center = options.center || [0,0,0];
        this.time = 0;
    }

    apply(geometry, data) {
        const time = this.time++;

        const position = geometry.getAttribute('position').array;
        const bPosition = geometry.getAttribute(Deformer.BASE_POSITION).array;
        const uv = geometry.getAttribute(Deformer.UV).array;
        let p, val, d;
        const phase = this.speed * time;

        for (var i= 0, j=0; i < position.length; i+=3, j+=2){
            p = 0, d = this.density;
            for (var k=0; k < this.ocatves; k++){
                p += Math.pow(Noise.simplex2(uv[j] * d + phase, uv[j+1] * d + phase) , this.pointiness) * this.scale / this.ocatves;
                d *= d;
            }

            val = ( this.getValFromData(data,  uv[j], uv[j+1]));

            position[i  ] = bPosition[i  ] + (bPosition[i  ] - this.center[0]) * 0.5 * ( (p)*val);
            position[i+1] = bPosition[i+1] + (bPosition[i+1] - this.center[1]) * 0.5 * ( (p)*val);
            position[i+2] = bPosition[i+2] + (bPosition[i+2] - this.center[2]) * 0.5 * ( (p)*val);
        }

        geometry.getAttribute('position').needsUpdate = true;
    }
}

export default SimplexNoiseDeformer;
/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import PlaneGeometry from './PlaneGeometry';

function SphereGeometry(radius = 1, udiv, vdiv){
    const geom = PlaneGeometry(udiv, vdiv, true);
    const pos = geom.attributes.position.array;
    const uvs = geom.attributes.uv.array;
    const pi = Math.PI;

    for (let i = 0, u= 0, v = 1; i < pos.length; i+=3, u += 2, v += 2){
        pos[i] =   radius *   Math.sin(uvs[u] * pi) * Math.cos(uvs[v] * 2*pi);
        pos[i+1] = radius * Math.sin(uvs[u] * pi) * Math.sin(uvs[v] * 2*pi);
        pos[i+2] = radius * Math.cos(uvs[u] * pi);
    }

    geom.computeVertexNormals();

    return geom;
}

export default SphereGeometry;
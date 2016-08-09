/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import Plane from './PlaneGeometry';
import Sphere from './SphereGeometry';


const types = {
    [Sphere.name]: Sphere,
    [Plane.name]: Plane
}

export default types;
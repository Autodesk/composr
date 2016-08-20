import ComposeGeometry from './ComposeGeometry';
import ValueSlider from 'common/valueSlider';

class PlaneGeometry extends ComposeGeometry {
    defaults() {
        return {
            uDiv: 50,
            vDiv: 50,
            width: 1,
            length: 1,
            loopIndices: false
        }
    }

    componenetDidMount() {
        this.updateGeometry();
    }

    static createBufferGeometry(
        {width = 1, length = 1, uDiv = 50, vDiv= 50, loopIndices = false}) {
        const geom = new THREE.BufferGeometry();

        var vertices = [];
        var uvs = [];
        var indices = [];
        var uDiv1 = uDiv + 1, vDiv1 = vDiv + 1;

        for (var i=0; i < uDiv1; i++){
            for (var j=0; j < vDiv1; j++){
                vertices.push (
                    (i - 0.5) * width / uDiv,
                    0,
                    (j - 0.5) * length / vDiv);

                uvs.push(
                    i / uDiv,
                    j / vDiv);
            }
        }

        for (var i=0; i < uDiv; i++){
            for (var j=0; j < vDiv; j++){

                // face vertices
                var a = i * vDiv1 + j;
                var b = i * vDiv1 + (j + 1);
                var c = (i+1) * vDiv1 + j;
                var d = (i+1) * vDiv1 + (j + 1);

                // face indices
                indices.push(a, c, b);
                indices.push(b, c, d);

            }
        }

        // connects both ends of the plane so convex shapes mapping can be used.
        if (loopIndices) {
            for (var i=0; i < uDiv; i++){
                const j = vDiv - 1;

                // face vertices
                var a = i * vDiv1 + j;
                var b = i * vDiv1 ;
                var c = (i+1) * vDiv1 + j;
                var d = (i+1) * vDiv1 ;

                // face indices
                indices.push(a, c, b);
                indices.push(b, c, d);

            }
        }

        var positions = new Float32Array(vertices);
        var uv = new Float32Array(uvs);
        var index = new Uint32Array(indices);

        geom.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geom.addAttribute( 'uv', new THREE.BufferAttribute( uv, 2 ) );
        geom.setIndex(new THREE.BufferAttribute( index, 1 ) );

        geom.computeVertexNormals();

        return geom;
    }

    updateGeometry() {
        this._geometry = PlaneGeometry.createBufferGeometry(this.state.toJS());
        this.setDeformerAttributes(this.geometry);
    }

    sliderChange(propName, e, v) {
        this.setState({
            [propName]: v
        })
    }

    renderUI() {

        return (<div>
            <ValueSlider name="uDiv" min={4} max={250} step={1} value={this.state.get('uDiv')} onChange={this.sliderChange.bind(this, 'uDiv')} />
            <ValueSlider name="vDiv" min={4} max={250} step={1} value={this.state.get('vDiv')} onChange={this.sliderChange.bind(this, 'vDiv')} />
            <ValueSlider name="Length" min={0.1} max={50} step={0.1} value={this.state.get('length')} onChange={this.sliderChange.bind(this, 'length')} />
            <ValueSlider name="Width" min={0.1} max={50} step={0.1} value={this.state.get('width')} onChange={this.sliderChange.bind(this, 'width')} />
        </div>)
    }
}

PlaneGeometry.registerObject('PlaneGeometry', PlaneGeometry)

export default PlaneGeometry
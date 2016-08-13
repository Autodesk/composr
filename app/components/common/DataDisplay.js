/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import { connect } from 'react-redux';

class DataDisplay extends React.Component {

    static get propTypes() {
        return {
            data: React.PropTypes.object,
            height: React.PropTypes.number
        };
    }

    updateCanvas() {
        const height = this.props.height;
        const ctx = this.refs.canvas.getContext('2d');
        const data = this.props.data.data[this.props.data.data.length -1];

        ctx.clearRect(0, 0, data.length, height);

        for (let i = 0; i < data.length; i++) {
            ctx.beginPath();
            ctx.moveTo(i, height);
            ctx.lineTo(i, height - data[i] * height);
            ctx.stroke();
        }
    }


    shouldComponentUpdate(e) {
        this.updateCanvas();

        return false;
    }

    render() {
        const canvasStyle = {
            //width: '100%',
            //height: '100%',
            borderBottom: '1px solid #d1c0e6',
            background: 'rgba(255,255,255,0.1)'
        }

        return (
            <canvas height={this.props.height-1} width={this.props.dataSize} ref="canvas" style ={canvasStyle} />
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.dataSource,
        dataSize: state.dataSource.maxDataSize
    }
}

export default connect(mapStateToProps)(DataDisplay);

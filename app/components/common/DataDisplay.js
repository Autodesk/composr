/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import { connect } from 'react-redux';

class DataDisplay extends React.Component {

    static get propTypes() {
        return {
            data: React.PropTypes.object,
        };
    }

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        const data = this.props.data.data[this.props.data.data.length -1];

        ctx.clearRect(0, 0, 300, 150);

        for (let i = 0; i < data.length; i++) {
            ctx.beginPath();
            ctx.moveTo(i, 150);
            ctx.lineTo(i, 150 - data[i] * 150);
            ctx.stroke();
        }
    }


    shouldComponentUpdate(e) {
        this.updateCanvas();

        return false;
    }

    render() {
        const height = 50;

        const canvasStyle = {
            width: '100%',
            height: '100%',
            borderBottom: '1px solid #d1c0e6',
            background: 'rgba(255,255,255,0.1)'
        }

        return (
            <div style={{width: '100%', height: `${height}px`}}>
                <canvas ref="canvas" style ={canvasStyle} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.dataSource
    }
}

export default connect(mapStateToProps)(DataDisplay);

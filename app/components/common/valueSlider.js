/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import {Slider, TextField} from 'material-ui';

class ValueSlider extends React.Component {

    static get propTypes() {
        return {
            value: React.PropTypes.number,
            onChange: React.PropTypes.func
        }
    }

    handleChange(e,v) {
        if (this.props.onChange) {
            this.props.onChange(e,v);
        }
    }

    render() {
        return (<div>
            <Slider onChange = {this.handleChange.bind(this)} value={this.props.value} className="ValueSlider"/>
            <TextField  onChange={this.handleChange.bind(this)} value={this.props.value} className="TextValueSlider"/>
        </div>)
    }

}

export default ValueSlider
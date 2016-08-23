/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import {Slider, TextField} from 'material-ui';

class ValueSlider extends React.Component {

    static get propTypes() {
        return {
            value: React.PropTypes.number,
            onChange: React.PropTypes.func,
            min: React.PropTypes.number,
            max: React.PropTypes.number,
            step: React.PropTypes.number,
            disabled: React.PropTypes.bool
        }
    }

    handleChange(e,v) {
        if (this.props.onChange) {
            this.props.onChange(e,v);
        }
    }

    render() {
        return (<div className="value-slider">
            <span className="ui-label">{this.props.name}</span>

            <Slider
                min={this.props.min}
                max={this.props.max}
                step={this.props.step}
                onChange = {this.handleChange.bind(this)}
                value={this.props.value}
                disabled={this.props.disabled}
                className="ValueSlider"/>

            <TextField
                onChange={this.handleChange.bind(this)}
                value={this.props.value}
                className="TextValueSlider"/>

        </div>)
    }

}

export default ValueSlider
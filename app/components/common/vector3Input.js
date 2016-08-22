/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import {TextField} from 'material-ui';

class Vector3Input extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            value: props.value
        }
    }

    static get propTypes() {
        return {
            name: React.PropTypes.string,
            value: React.PropTypes.array,
            onChange: React.PropTypes.func
        }
    }

    handleKeyDown(e) {
        const regex = /\d|\.|-/;
        if( !regex.test(e.key) && e.key != 'Backspace' && e.key != 'ArrowLeft' && e.key != 'ArrowRight') {
            e.returnValue = false;
            if(e.preventDefault) e.preventDefault();
        }
    }

    handleChange(i, e, v) {
        const new_val = [this.refs.x.props.value,
            this.refs.y.props.value,
            this.refs.z.props.value];

        new_val[i] = Number.isNaN(v) ? '' : v;

        const regex = /^-?[0-9]?\.?[0-9]*$/;
        if( regex.test(new_val[i]) ) {
            if (this.props.onChange) {
                this.props.onChange(e, new_val);
            }

            this.setState({value: new_val });
        }
    }

    render() {
        return (<div>
            <span className="ui-label">{this.props.name}</span>

            <TextField floatingLabelFixed={true} inputStyle={{type: 'number'}} floatingLabelText="x" ref="x" value={this.state.value[0]} onChange={this.handleChange.bind(this, 0)} onKeyDown={this.handleKeyDown} className="TextValueVector3"/>
            <TextField floatingLabelFixed={true} inputStyle={{type: 'number'}} floatingLabelText="y" ref="y" value={this.state.value[1]} onChange={this.handleChange.bind(this, 1)} onKeyDown={this.handleKeyDown} className="TextValueVector3"/>
            <TextField floatingLabelFixed={true} inputStyle={{type: 'number'}} floatingLabelText="z" ref="z" value={this.state.value[2]} onChange={this.handleChange.bind(this, 2)} onKeyDown={this.handleKeyDown} className="TextValueVector3"/>
        </div>)
    }

}

export default Vector3Input;
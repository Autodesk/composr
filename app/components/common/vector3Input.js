/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import {TextField} from 'material-ui';

class Vector3Input extends React.Component {

    static get propTypes() {
        return {
            text: React.PropTypes.string,
            value: React.PropTypes.array,
            onChange: React.PropTypes.func
        }
    }

    handleChange(i,e,v) {
        if (this.props.onChange) {
            console.log(this.refs.x.props.value)
            console.log(this.refs.y.props.value)
            console.log(this.refs.z.props.value)

            const new_val = [this.refs.x.props.value,
                this.refs.y.props.value,
                this.refs.z.props.value];

            if (Number.isNaN(parseFloat(v))){
                new_val[i] = 0;
            } else {
                new_val[i] = parseFloat(v);
            }


            this.props.onChange(e, new_val);
        }
    }

    render() {
        return (<div>
            <p>{this.props.text}</p>
            <TextField floatingLabelFixed="true" inputStyle="type: number" floatingLabelText="x" ref="x" onChange={this.handleChange.bind(this,0)} value={this.props.value[0]} className="TextValueVector3"/>
            <TextField floatingLabelFixed="true" floatingLabelText="y" ref="y" onChange={this.handleChange.bind(this,1)} value={this.props.value[1]} className="TextValueVector3"/>
            <TextField floatingLabelFixed="true" floatingLabelText="z" ref="z" onChange={this.handleChange.bind(this,2)} value={this.props.value[2]} className="TextValueVector3"/>
        </div>)
    }

}

export default Vector3Input;
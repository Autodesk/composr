/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import cx from 'classnames';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class EditableLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdited: false,
            newVal: props.label
        };
    }

    static get propTypes() {
        return {
            onChange: React.PropTypes.func,
            label: React.PropTypes.string
        }
    }

    handleEditRequest() {
        this.setState({
            isEdited: true
        });
    }

    handleKeyDown(event) {
        console.log(event.target.value);
        this.setState({
            newVal: event.target.value
        });
    }

    handleBlur() {
        this.props.onChange(this.state.newVal);
        this.setState({
            isEdited: false
        });
    }


    render() {
        const style = { padding:'0 2px' };

        if (this.state.isEdited){
            return (
                <TextField
                    ref="editable"
                id="text-field-default"
                defaultValue={this.props.label}
                onChange={this.handleChange}
                onBlur={this.handleBlur.bind(this)}
                onChange={this.handleKeyDown.bind(this)}
                underlineShow={false}
            />
            )
        } else {
            return (
                <FlatButton
                    labelStyle={style}
                    label={this.props.label}
                    onClick={this.handleEditRequest.bind(this)}
                />
            )
        }

    }

}

export default EditableLabel;
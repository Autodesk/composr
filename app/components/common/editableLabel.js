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
            label: React.PropTypes.string,
            className: React.PropTypes.string,
            labelStyle: React.PropTypes.object,
        }
    }

    handleEditRequest() {
        this.setState({
            isEdited: true
        });
    }

    handleKeyDown(event) {
        this.setState({
            newVal: event.target.value
        });
    }

    handleBlur() {
        if (this.props.onChange) {
            this.props.onChange(this.state.newVal);
        }

        this.setState({
            isEdited: false
        });
    }


    render() {

        const style = this.props.labelStyle || {};
        style.padding = '0 2px';

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
                    className = {this.props.className}
            />
            )
        } else {
            return (
                <FlatButton
                    labelStyle={style}
                    label={this.props.label}
                    onClick={this.handleEditRequest.bind(this)}
                    className = {this.props.className}
                />
            )
        }

    }

}

export default EditableLabel;
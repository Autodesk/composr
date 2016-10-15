/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import cx from 'classnames';
import TextField from 'material-ui/TextField';
import {FlatButton, FontIcon} from 'material-ui';

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
            displayEditIcon: React.PropTypes.bool
        }
    }

    handleEditRequest() {
        this.setState({
            isEdited: true
        });
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.handleBlur();
        }
    }

    handleChange(event) {
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

    componentDidUpdate() {
        if (this.refs.editable)
            this.refs.editable.focus();
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
                    onBlur={this.handleBlur.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    onKeyUp={this.handleKeyDown.bind(this)}
                    underlineShow={false}
                    className = {this.props.className}
            />
            )
        } else {
            const fontIcon = this.props.displayEditIcon ? <FontIcon style={{fontSize: '12px', color: 'white'}} className="fa fa-pencil"/> : null;

            return (
                <FlatButton
                    labelStyle={style}
                    label={this.props.label}
                    onClick={this.handleEditRequest.bind(this)}
                    className = {this.props.className}
                    labelPosition="before"
                    icon={fontIcon}
                />

            )
        }

    }

}

export default EditableLabel;
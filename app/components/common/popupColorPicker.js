/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import { SketchPicker } from 'react-color';
import {FlatButton, Popover} from 'material-ui';

class PopupColorPicker extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            color: props.color || '#44444'
        }
    }

    static get propTypes() {
        return {
            name: React.PropTypes.string,
            value: React.PropTypes.array,
            color: React.PropTypes.string,
            onChange: React.PropTypes.func
        }
    }

    handleTouchTap (event){
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    }

    handleRequestClose (){
        this.setState({
            open: false,
        });
    }

    handleColorChange(color) {
        this.setState({ color: color.hex });

        if (this.props.onChange) this.props.onChange(color);
    }

    render() {
        return (<div>
            {this.props.name}
            <FlatButton
                onTouchTap={this.handleTouchTap.bind(this)}
                backgroundColor={this.state.color}
            />
            <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestClose.bind(this)}
            >
                <SketchPicker
                    color={this.state.color}
                    onChangeComplete={this.handleColorChange.bind(this)}
                />

            </Popover>
        </div>)
    }

}

export default PopupColorPicker;
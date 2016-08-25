/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import FontIcon from 'material-ui/FontIcon';
import ComposeElement from 'common/composeElement';
import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import cx from 'classnames';

class LayerActions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    static get propTypes() {
        return {
            removeLayer: React.PropTypes.func,
            toggleHidden: React.PropTypes.func,
            visible: React.PropTypes.bool,
        }
    }

    handleRequestOpen(event) {
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        })
    }

    handleRequestClose() {
        this.setState({
            open: false
        })
    }

    render() {
        const visibleClass = cx('fa fa-sm-icon', {
            'fa-eye': this.props.visible,
            'fa-eye-slash': !this.props.visible
        });

        const iconStyle = { width: '28%', padding: '3px'};
        const fontIconStyle = {'height': '40px'};

        return (
            <CardActions style={{padding: '0 8px'}}>
                <IconButton tooltip="Toggle Visible" tooltipPosition="top-center" style={iconStyle}>
                    <FontIcon onClick={this.props.toggleHidden} className={visibleClass} style={fontIconStyle}/>
                </IconButton>
                <IconButton tooltip="Remove Layer" tooltipPosition="top-center" iconStyle={iconStyle}>
                    <FontIcon onClick={this.props.removeLayer} className="fa-sm-icon fa fa-times" style={fontIconStyle}/>
                </IconButton>
                <IconButton tooltip="Layer Settings" tooltipPosition="top-center" iconStyle={iconStyle}>
                    <FontIcon onClick= {this.handleRequestOpen.bind(this)} className="fa-sm-icon fa fa-cog" style={fontIconStyle}/>
                </IconButton>

                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose.bind(this)}
                >
                    <Menu>
                        <MenuItem primaryText="Layer"  />
                        <MenuItem primaryText="Deformer" />
                        <MenuItem primaryText="Material" />
                    </Menu>
                </Popover>
            </CardActions>)
    }

}

export default LayerActions;
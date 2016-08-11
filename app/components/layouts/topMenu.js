/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import cx from 'classnames';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import ComposeLayer from 'js/Scene/ComposeLayer';

class VisualizerTopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };
    }

    handleTouchTap(event) {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose(event) {
        this.setState({
            open: false,
        });
    }

    addLayer(e) {
        new ComposeLayer({name: 'Unnamed Layer'});
        this.handleRequestClose();
    }


    render() {
        const labelStyle = {fontSize: '12px'};

        return (
            <Toolbar style={{ height: '36px', backgroundColor: 'white' }}>
                <ToolbarGroup firstChild={true}>
                    <FlatButton
                        className="top-nav-button"
                        onTouchTap={this.handleTouchTap.bind(this)}
                        label="Create"
                        labelStyle={labelStyle} />

                    <Popover
                        open={this.state.open}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={this.handleRequestClose.bind(this)}
                    >
                        <Menu>
                            <MenuItem primaryText="Layer" onClick={this.addLayer.bind(this)} />
                            <MenuItem primaryText="Deformer" />
                            <MenuItem primaryText="Material" />
                        </Menu>
                    </Popover>
                </ToolbarGroup>

            </Toolbar>
        );
    }
}

export default VisualizerTopMenu;


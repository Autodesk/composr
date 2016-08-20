/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import cx from 'classnames';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {MenuItem, Snackbar, FlatButton, Popover, Menu} from 'material-ui';

import DataDisplay from 'common/dataDisplay'

import ComposeLayer from 'js/Scene/ComposeLayer';
import StoreAPI from 'StoreAPI';
import Firebase from 'firebase/firebase';

window.load = StoreAPI.loadState;

class VisualizerTopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: -1,
            sanckbarOpen: false
        };
    }

    handleTouchTap(item, event) {
        // This prevents ghost click.
        //event.preventDefault();

        this.setState({
            open: item,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose(event) {
        this.setState({
            open: -1,
        });
    }

    addLayer(e) {
        new ComposeLayer({name: 'Unnamed Layer'});
        this.handleRequestClose();
    }

    handleSave() {
        StoreAPI.exportToJson();
        this.setState({
            sanckbarOpen: true,
            open: -1
        });
    }

    handleLoad() {
        StoreAPI.loadState(JSON.parse(localStorage.getItem('openComposer')).scene);
        this.setState({
            open: -1
        });
    }

    handleLoad2() {
        StoreAPI.loadState(JSON.parse(localStorage.getItem('openComposer2')));
        this.setState({
            open: -1
        });
    }

    handleLoadFirbase() {
        Firebase.getData('/scene', (data) => {
            //window.load = StoreAPI.loadFromJson;
            //console.log('firebase savet to openComposr2');

            StoreAPI.loadState(data);
        })

        this.setState({
            open: -1
        });
    }

    handleSnackbarRequestClose() {
        this.setState({
            sanckbarOpen: false
        });
    }


    render() {
        const labelStyle = {fontSize: '12px'};

        return (
            <Toolbar style={{ height: '36px', backgroundColor: 'white' }}>
                <ToolbarGroup firstChild={false}>
                    <FlatButton
                        className="top-nav-button"
                        onTouchTap={this.handleTouchTap.bind(this, 0)}
                        label="File"
                        labelStyle={labelStyle} />

                    <Popover
                        open={this.state.open === 0}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={this.handleRequestClose.bind(this)}
                    >
                        <Menu>
                            <MenuItem primaryText="Reset" onClick={StoreAPI.reset} />
                            <MenuItem primaryText="Save" onClick={this.handleSave.bind(this)} />
                            <MenuItem primaryText="Save To File" onClick={()=>(console.log(StoreAPI.exportToJson()))} />
                            <MenuItem primaryText="Load..." onClick={this.handleLoad.bind(this)} />
                            <MenuItem primaryText="Load2..." onClick={this.handleLoad2.bind(this)} />
                            <MenuItem primaryText="Load Remote" onClick={this.handleLoadFirbase.bind(this)} />
                        </Menu>
                    </Popover>

                    <FlatButton
                        className="top-nav-button"
                        onTouchTap={this.handleTouchTap.bind(this, 1)}
                        label="Create"
                        labelStyle={labelStyle} />

                    <Popover
                        open={this.state.open === 1}
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

                <ToolbarGroup>
                    <DataDisplay height={36}/>
                </ToolbarGroup>

                <Snackbar
                    open={this.state.sanckbarOpen}
                    message="Current composition saved"
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackbarRequestClose.bind(this)}
                />
            </Toolbar>
        );
    }
}

export default VisualizerTopMenu;


/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import cx from 'classnames';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {MenuItem, Snackbar, FlatButton, Popover, Menu, Divider, RefreshIndicator} from 'material-ui';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import DataDisplay from 'common/dataDisplay'
import { connect } from 'react-redux';

import ComposeLayer from 'js/Scene/ComposeLayer';

import StoreAPI from 'StoreAPI';
import Firebase from 'firebase/firebase';
import EditableLabel from 'common/editableLabel';

window.load = StoreAPI.loadState;

class VisualizerTopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: -1,
            sanckbarOpen: false
        };
    }

    static get propTypes() {
        return {
            compData: React.PropTypes.object
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

    handleSnackbarRequestClose() {
        this.setState({
            sanckbarOpen: false
        });
    }

    addLayer(e) {
        new ComposeLayer({name: 'Unnamed Layer'});
        this.handleRequestClose();
    }

    addDeformer(e) {
        new SimplexNoiseDeformer();
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
        StoreAPI.loadState(JSON.parse(localStorage.getItem('openComposer')));
        this.handleRequestClose();
    }

    handleLoadRemote() {
        StoreAPI.loadStateRemote(this.props.visName);
        this.handleRequestClose();
    }

    handleSaveRemote() {
        if (Firebase.firebase.auth().currentUser) {
            if (this.props.compData.compId) {
                StoreAPI.saveStateRemote();

                this.setState({
                    sanckbarOpen: true
                });

            } else {
                this.handleCreateRemotePath();
            }

            this.handleRequestClose();
        }
    }

    handleCreateRemotePath() {
        const comp = Firebase.createCompRef();
        if (comp) {
            StoreAPI.updateMetadata({compId: comp.compId})
            StoreAPI.saveStateRemote();
            StoreAPI.replacePath(comp.url)
        }
    }

    // handleNameChange(compName) {
    //     StoreAPI.updateMetadata({compName})
    // }

    renderDeformersMenu() {
        const menuItems = [];
        if (this.props.deformerTypes) {
            for (let dtype of Object.keys(this.props.deformerTypes)) {
                const handleClick = () => {
                    new this.props.deformerTypes[dtype]()
                    this.handleRequestClose();
                }

                menuItems.push(<MenuItem
                    primaryText={dtype}
                    onClick={ handleClick }
                />);
            }
        }

        return menuItems;
    }

    renderMaterialsMenu() {
        const menuItems = [];
        if (this.props.materialTypes) {
            for (let dtype of Object.keys(this.props.materialTypes)) {
                const handleClick = () => {
                    new this.props.materialTypes[dtype]()
                    this.handleRequestClose();
                }

                menuItems.push(<MenuItem
                    primaryText={dtype}
                    onClick={ handleClick }
                />);
            }
        }

        return menuItems;
    }


    render() {
        const labelStyle = {fontSize: '12px'};

        const loadStatus = this.props.remoteState.get('isFetching') ? 'loading' : 'ready';

        return (
            <Toolbar style={{ height: '36px', backgroundColor: 'white' }}>
                <ToolbarGroup firstChild={false}>
                    <RefreshIndicator left={0} top={5} size={26} status={loadStatus} />
                    { (()=> { if (this.props.compData.compId )
                        return (<EditableLabel
                        className="top-nav-button"
                        primary={true}
                        onChange={this.handleNameChange}
                        label={ this.props.metadata.get('compName') }
                        labelStyle={labelStyle} />)
                    })()
                    }

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
                        <Menu width={150}>
                            <MenuItem primaryText="Reset" onClick={StoreAPI.reset} />
                            <Divider/>
                            <MenuItem primaryText="Save" onClick={this.handleSave.bind(this)} />
                            <MenuItem primaryText="Save Remote" onClick={this.handleSaveRemote.bind(this)} />
                            <Divider/>
                            <MenuItem primaryText="Load..." onClick={this.handleLoad.bind(this)} />
                            <MenuItem primaryText="Load Remote" onClick={this.handleLoadRemote.bind(this)} />
                        </Menu>
                    </Popover>

                    <FlatButton
                        className="top-nav-button"
                        onTouchTap={this.handleTouchTap.bind(this, 1)}
                        label="Add"
                        labelStyle={labelStyle} />

                    <Popover
                        open={this.state.open === 1}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={this.handleRequestClose.bind(this)}
                    >
                        <Menu width={150}>
                            <MenuItem primaryText="Layer" onClick={this.addLayer.bind(this)} />
                            <MenuItem primaryText="Deformer"
                                      rightIcon={<ArrowDropRight />}
                                      menuItems={this.renderDeformersMenu()}
                            />
                            <MenuItem primaryText="Material"
                                      rightIcon={<ArrowDropRight />}
                                      menuItems={this.renderMaterialsMenu()}
                            />
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

function mapStateToProps(state, ownProp) {
    return {
        remoteState: state.runtime.remoteState,
        deformerTypes: StoreAPI.getObjectClassesByType('deformer'),
        materialTypes: StoreAPI.getObjectClassesByType('material'),
        metadata: StoreAPI.getMetadata()
    }
}

export default connect(mapStateToProps)(VisualizerTopMenu);

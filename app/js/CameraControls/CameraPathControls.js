/**
 * Created by mzohar on 10/18/16.
 */
import ComposeControls from 'js/Scene/ComposeControls';
import StoreAPI from 'StoreAPI';

import {Toggle} from 'material-ui';
import {List, ListItem} from 'material-ui/List';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import AddIcon from 'material-ui/svg-icons/content/add';
import VideocamIcon from 'material-ui/svg-icons/av/videocam';
import Tween from 'tween.js';

class CameraPathControls extends ComposeControls {
    defaults() {
        return {
            pathPoints: [],
            targetPathPoints: [],
            currentPoint: 0,
            isPlaying: false,
            timeout: 2000
        }
    }

    addPoint() {
        const pathPoints = this.get('pathPoints').toArray();
        const targetPathPoints = this.get('targetPathPoints').toArray();

        const camera = StoreAPI.getActiveComposeCamera();

        const cameraPosition = camera.camera.position.toArray();
        const cameraQuaternion = camera.controls.target.toArray();

        pathPoints.push(cameraPosition);
        targetPathPoints.push(cameraQuaternion);
        this.setState({pathPoints, targetPathPoints});
    }

    remPoint(i) {
        const pathPoints = this.state.get('pathPoints').toArray();
        pathPoints.splice(i,1);

        this.setState({pathPoints});
    }

    setPoint(i) {
        this.setState({currentPoint: i});
    }

    selectPoint(i) {
        this.setPoint(i);
        const camera = StoreAPI.getActiveComposeCamera();

        camera.camera.position.fromArray(this.get('pathPoints').get(i).toArray());
        camera.controls.target.fromArray(this.get('targetPathPoints').get(i).toArray())
    }

    movePoint() {
        if (!this.get('isPlaying')) return;

        const cp = this.get('currentPoint');
        const np = (this.get('currentPoint') + 1) % this.get('pathPoints').size;
        this.setPoint( np );
        const toPos = new THREE.Vector3();
        const toTarget = new THREE.Vector3();

        toPos.fromArray(this.get('pathPoints').get(np).toArray())
        toTarget.fromArray(this.get('targetPathPoints').get(np).toArray())

        this.posTween = new Tween.Tween( StoreAPI.getActiveComposeCamera().camera.position )
            .to(toPos, this.get('timeout'))
            .onComplete(()=>this.movePoint())
            .onUpdate(function() {
                // console.log(this.x, this.y);
            })
            .start();

        this.targetTween = new Tween.Tween( StoreAPI.getActiveComposeCamera().controls.target )
            .to(toTarget, this.get('timeout'))
            .onUpdate(function() {
                // console.log(this.x, this.y);
            })
            .start();
    }

    togglePlay() {
        this.setState({isPlaying: !this.get('isPlaying')});
        if (this.get('isPlaying')) {
            this.movePoint();
        } else {
            if (this.posTween) this.posTween.stop();
            if (this.targetTween) this.targetTween.stop();
        }
    }

    update() {

    }

    renderUI() {
        const points = [];
        this.get('pathPoints').forEach( (v, i)=> {
            const selectedIcon = i === this.get('currentPoint') ? ( <VideocamIcon /> ) : null;
            points.push(<ListItem className="listItemPoint"
                                  onClick={()=>this.selectPoint(i)}
                                  value={i}
                                  disabled = {this.get('isPlaying')}
                                  primaryText= { `${v.toArray()[0].toPrecision(3)}, ${v.toArray()[1].toPrecision(3)}, ${v.toArray()[2].toPrecision(3)}`}
                                  rightIcon={<ClearIcon onClick={()=>this.remPoint(i) }/>}
                                  leftIcon={selectedIcon}
            />);
        })


        return (
            <div>
                <Toggle
                    label="Play" toggled={this.get('isPlaying')} onToggle={this.togglePlay.bind(this)}
                />

                <List>
                    <ListItem  primaryText="Add Point"
                               onClick={()=>this.addPoint()}
                               leftIcon={<AddIcon  />  }
                               disabled = {this.get('isPlaying')}
                    />
                    {points}
                </List>
            </div>
        );
    }
}

CameraPathControls.registerObject('CameraPathControls', CameraPathControls);

export default CameraPathControls;

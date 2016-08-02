/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

import DataSource from './DataSource';
import AudioAnalyser from './AudioAnalyser';
import 'js/3rdParty/modernizr';

import {updateData} from 'actions/mainActions'
import store from 'store';

class MicrophoneSource extends DataSource{
    constructor () {
        super();
        this.context = this.createAudioContext();
        this.analyser = new AudioAnalyser();
        this.analyserNode = this.analyser.getNode(this.context);

        this.analyser.onFrameCallback = (buffer) => store.dispatch(updateData(buffer));

        this.gainNode = this.createGainNode();
        this.sourceNode = null;
        this.getMicrophoneSource();

        this.gainNode.connect(this.analyserNode);
    }

    get data() {
        return this.analyser.buffers;
    }

    createGainNode() {
        try {
            return this.context.createGainNode();
        }
        catch (e) {
            return this.context.createGain();
        }

    }

    createAudioContext() {
        const AudioCtor = (window.AudioContext || webkitAudioContext)

        const desiredSampleRate = typeof desiredSampleRate === 'number'
            ? desiredSampleRate
            : 44100
        var context = new AudioCtor()

        // Check if hack is necessary. Only occurs in iOS6+ devices
        // and only when you first boot the iPhone, or play a audio/video
        // with a different sample rate
        if (/(iPhone|iPad)/i.test(navigator.userAgent) &&
            context.sampleRate !== desiredSampleRate) {
            const buffer = context.createBuffer(1, 1, desiredSampleRate)
            const dummy = context.createBufferSource()
            dummy.buffer = buffer
            dummy.connect(context.destination)
            dummy.start(0)
            dummy.disconnect()

            context.close() // dispose old context
            context = new AudioCtor()
        }

        return context
    }

    getMicrophoneSource() {
        const gUM = Modernizr.prefixed('getUserMedia', navigator);
        gUM({audio: true},  (stream) => {
            const microphone = this.context.createMediaStreamSource(stream);

            // Create a buffer source node
            this.sourceNode = microphone; //context.createBufferSource();

            microphone.connect(this.gainNode, 0, 0);

        }, function () {
        });
    }
}

export default MicrophoneSource;
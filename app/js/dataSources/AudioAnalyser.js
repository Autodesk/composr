/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */

// script Constants
const OUT_MIN_FREQUENCY = 30;
const OUT_MAX_FREQUENCY = 1500;

const BASS_MAX_FREQUENCY = 600;
const MID_MAX_FREQUENCY = 1000;

const BASS_BIN_SKIP  = 1;
const MID_BIN_SKIP   = 2;
const HIGH_BIN_SKIP  = 4;

class AudioAnalyser {
    constructor() {
        this.analyserNode = null;
        this.scriptNode = null;

        this.outputBinCount = 0;

        // fft Settings
        this.settings = {
            timeSmoothingConstant: 0.5,
            kernelSize: 16,
            fftSize: 2048,
            //signalPadding: 10,
            binsIndices: {
                first: 0,
                bass: 0,
                mid: 0,
                last: 0
            }
        }

        this.workBuffer = null;
    }

    setScriptParameters(context) {
        console.log("Sampling at rate: " + context.sampleRate + " Hz");

        const binSize = (context.sampleRate / 2) / this.settings.fftSize;
        console.log("Each FFT bin is of size: " + binSize  + " Hz");

        const indices = this.settings.binsIndices;

        indices.first = Math.floor(OUT_MIN_FREQUENCY / binSize);
        indices.bass  = Math.ceil(BASS_MAX_FREQUENCY / binSize);
        indices.mid   = Math.ceil(MID_MAX_FREQUENCY / binSize);
        indices.last  = Math.ceil(OUT_MAX_FREQUENCY / binSize);

        this.outputBinCount = ~~(
            (1 / BASS_BIN_SKIP) * (indices.bass - indices.first) +
            (1 / MID_BIN_SKIP)  * (indices.mid - indices.bass) +
            (1 / HIGH_BIN_SKIP) * (indices.last - indices.mid))
            //this.settings.signalPadding );

        console.log("Bins " +   this.outputBinCount);
        console.log("Starting bin index: " + indices.first);
        console.log("Ending bin index: " + indices.last);
    }

    initBinBuffers() {
        this.workBuffer = new Uint8Array(this.analyserNode.frequencyBinCount);
        this.outputBuffer = new Float32Array( this.outputBinCount);
    }

    getNode(context) {
        const bufferSize = 512;
        const inputChannels = 2;
        const outputChannels = 1;

        this.scriptNode = context.createScriptProcessor(bufferSize, inputChannels, outputChannels)
        this.scriptNode.connect(context.destination);
        //this.scriptNode.onaudioprocess = (e) => {this.audioProcessCallback(e)};

        this.analyserNode = context.createAnalyser();
        this.analyserNode.connect(this.scriptNode);

        this.setScriptParameters(context);
        this.initBinBuffers();

        return this.analyserNode;
    }

    update() {
        return this.processAudio();
    }

    processAudio() {
        const curBuffer = this.outputBuffer;
        const binIndices = this.settings.binsIndices;

        this.analyserNode.getByteFrequencyData(this.workBuffer);

        for (let i = 0; i < this.workBuffer.length; i ++) {
            this.workBuffer[i] = this.workBuffer[i] > 64 ? 2 * (this.workBuffer[i] - 64) : 0;
        }

        let bufferIndex = 0;
        for (let i = binIndices.first; i < binIndices.bass; i += BASS_BIN_SKIP) {
            curBuffer[bufferIndex] = this.workBuffer[i] / 256;
            bufferIndex++;
        }

        for (let i = binIndices.bass; i < binIndices.mid; i += MID_BIN_SKIP) {
            curBuffer[bufferIndex] = this.workBuffer[i] / 256;
            bufferIndex++;
        }

        for (let i = binIndices.mid; i < binIndices.last; i += HIGH_BIN_SKIP) {
            curBuffer[bufferIndex] = this.workBuffer[i] / 256;
            bufferIndex++;
        }


        return curBuffer;

    }

    get buffers() {
        return this.outputBuffers;
    }

    disconnect() {
        this.scriptNode.disconnect();
        this.analyserNode.disconnect();
    }
}

export default AudioAnalyser;
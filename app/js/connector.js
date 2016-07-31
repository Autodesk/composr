/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
class connector {
    constructor(select, callback) {
        this.select = select;
        this.currentValue = null;
        store.subscribe(()=>this.handleChange())
        this.callback = callback;
    }

    handleChange() {
        let previousValue = this.currentValue;
        this.currentValue = this.select(store.getState());

        if (this.currentValue !== previousValue) {
            this.callback(this.currentValue, previousValue);
        }
    }
}

export default connector;
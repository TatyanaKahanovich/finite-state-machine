class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        try {
            this.state = config.initial;
            this.config = config;
            if (!config){
                throw new Error();
            }
        } catch(e) {
            throw e;
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        try {
			var keys = Object.keys(this.config.states);
			if (keys.indexOf(state)<0){
				throw new Error();
			} else {
			    this.back = this.state;
			    this.state = state;
				this.cancel = this.state;
			    return this.state;
			}
        } catch(e) {
        //console.log('caught inner "Error"');
        throw e;
        }

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
		try {
			var keys = Object.keys(this.config.states[this.state].transitions);
			if (keys.indexOf(event)<0){
				throw new Error();
			} else {
				var back = this.config.states[this.state].transitions[event];
				this.back = this.state;
				this.state = back;
				this.cancel = this.state;
				return this;
			}
		} catch(e) {
		//console.log('caught inner "Error"');
			throw e;
		}
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
        return this;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
		var keys = Object.keys(this.config.states),
			arr = [],
			res = [];

		if (!event){
			return keys;
		} else {

            for(var i = 0; i < 4; i++){
                arr.push(this.config.states[keys[i]].transitions);
            }

            for (var j = 0; j < 4; j++){

                for (var key in arr[j]){
                    var a = arr[j][key];

                    if (key == event){
                        res.push(keys[j]);
                    }
                }
            }
            return res;
		}
	}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.back){
            this.state = this.back;
            this.back = false;
			return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
		if (this.cancel){
            this.state = this.cancel;
            this.cancel = false;
			return true;
        } else {
            return false;
        }
	}

    /**
     * Clears transition history
     */
    clearHistory() {
        this.cancel = false;
        this.back = false;
        return this;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

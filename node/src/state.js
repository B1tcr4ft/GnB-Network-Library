"use strict";

class State {
    /**
     * Build a state instance
     * @param name {string} the state name
     * @param trigger {string} the state trigger
     */
    constructor(name, trigger) {
        this.name = name;
        this.trigger = trigger;
    }

    /**
     * Check whether the trigger has been fired or not
     * @param currentValue {number} the current node value to check
     * @return {boolean} true, if the trigger is fired, false otherwise
     */
    isTriggered(currentValue) {
        let split = this.trigger.split('%v').filter(val => val !== "");

        if (split.length === 1) {
            return eval(this.trigger.replace("%v", currentValue));
        } else {
            return eval(split[0] + currentValue) && eval(currentValue + split[1]);
        }
    }

    /**
     * Get a state instance from a JSON containing
     * its definition
     * @param json {JSON} the json definition
     * @return {State} the state instance
     */
    static fromJSON(json) {
        return new State(json.name, json.trigger);
    }
}
exports.State = State;
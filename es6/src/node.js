import { State } from "./state";
import { Sensor } from "./sensor";

export class Node {
    /**
     * Build a node instance
     * @param id {string} the node id
     * @param name {string} the node name
     * @param parents {string[]} list of parent nodes' ID
     * @param states {State[]} list of states
     * @param cpt {array} list of cpts
     * @param sensor {Sensor} the sensor specs
     */
    constructor(id, name, parents, states, cpt, sensor) {
        this.id = id;
        this.name = name;
        this.parents = parents;
        this.states = states;
        this.cpt = cpt;
        this.sensor = sensor;
    }

    /**
     * Check whether the node has a sensor attached or not
     * @return {boolean} true, if the node has a sensor, false otherwise
     */
    hasSensor() {
        return this.sensor.hasOwnProperty('databaseSensorName');
    }

    /**
     * Updates the node's current state
     * @param value the sensor's value
     * @returns {string} the current state's name
     */
    getState(value) {
        return this.states.find(state => {
            return state.isTriggered(value);
        }).name;
    }

    /**
     * Get a node instance from a JSON containing
     * its definition
     * @param json {JSON} the json definition
     * @return {Node} the node instance
     */
    static fromJSON(json) {
        let id = json.id;
        let name = json.name;
        let parents = json.parents;
        let states = json.states;

        let cpt = [];
        if(json.cpt.length === 1) {
            cpt = json.cpt[0].map(num => parseFloat(num));
        } else {
            json.cpt.forEach(entry => cpt.push(entry.map(num => parseFloat(num))));
        }

        let sensor = json.sensor;

        return new Node(id, name, parents, states, cpt, sensor);
    }
}
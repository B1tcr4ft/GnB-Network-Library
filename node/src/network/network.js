"use strict";

var _node = require("./node");

var Node = _node.Node;

var _utilJsonUtil = require("../util/json-util");

var getNetworkFromJSON = _utilJsonUtil.getNetworkFromJSON;
var getJSONFromNetwork = _utilJsonUtil.getJSONFromNetwork;

var _jsbayes = require('jsbayes');

var jsbayes = _jsbayes;
class Network {
    /**
     * Build a network instance
     * @param id {string} the network id
     * @param name {string} the network name
     * @param DBWriteName {string} the database name (as it is called on Grafana's database list) where the nodes' probabilities will be registered
     * @param refreshTime {number} the interval time (in milliseconds) between the node updates
     * @param nodes {Node[]} the list of nodes
     */
    constructor(id, name, DBWriteName, refreshTime, nodes) {
        this.id = id;
        this.name = name;
        this.DBWriteName = DBWriteName;
        this.refreshTime = refreshTime;
        this.nodes = nodes;
        this.graph = this.makeGraph();
    }

    makeGraph() {
        let graph = jsbayes.newGraph();

        //creating the nodes
        this.nodes.forEach(node => {
            let states = node.states.map(state => state.name);
            graph.addNode(node.id, states);
        });

        //adding data to nodes
        this.nodes.forEach(node => {
            let graphNode = graph.node(node.id);

            //setting parent nodes
            node.parents.forEach(parent => graphNode.addParent(graph.node(parent)));

            //setting cpt
            graphNode.setCpt(node.cpt);
        });

        graph.sample(20000);

        return graph;
    }

    /**
     * TODO
     * Calculates and updates current node values and state
     * both in jsbayes and in the database
     */
    update() {}

    /**
     * Get a JSON definition of the network instance
     * @returns {JSON} the JSON definition
     */
    toJSON() {
        return getJSONFromNetwork(this);
    }

    /**
     * Get a network instance from a JSON containing
     * its definition
     * @param json {JSON} the json file
     * @returns {Network} the network instance
     */
    static fromJSON(json) {
        return getNetworkFromJSON(json);
    }
}
exports.Network = Network;
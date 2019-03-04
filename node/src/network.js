"use strict";

var _node = require("./node");

var Node = _node.Node;

var _jsbayes = require('jsbayes');

var jsbayes = _jsbayes;
class Network {
    /**
     * Build a network instance
     * @param id {string} the network id
     * @param name {string} the network name
     * @param refreshTime {number} the interval time (in milliseconds) between the node updates
     * @param databaseWriteName {string} the database name (as it is called on Grafana's database list) where the nodes' probabilities will be registered
     * @param databaseWriteUrl {string} url of the database where the nodes' probabilities will be registered
     * @param databaseWriteUser {string} user of the database where the nodes' probabilities will be registered
     * @param databaseWritePassword {string} password of the database where the nodes' probabilities will be registered
     * @param nodes {Node[]} the list of nodes
     */
    constructor(id, name, refreshTime, databaseWriteName, databaseWriteUrl, databaseWriteUser, databaseWritePassword, nodes) {
        this.id = id;
        this.name = name;
        this.databaseWriteName = databaseWriteName;
        this.databaseWriteUrl = databaseWriteUrl;
        this.databaseWriteUser = databaseWriteUser;
        this.databaseWritePassword = databaseWritePassword;
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

        return graph;
    }

    /**
     * Updates the database credentials
     * @param databaseWriteName {string} the database name (as it is called on Grafana's database list) where the nodes' probabilities will be registered
     * @param databaseWriteUrl {string} url of the database where the nodes' probabilities will be registered
     * @param databaseWriteUser {string} user of the database where the nodes' probabilities will be registered
     * @param databaseWritePassword {string} password of the database where the nodes' probabilities will be registered
     */
    setDatabase(databaseWriteName, databaseWriteUrl, databaseWriteUser, databaseWritePassword) {
        this.databaseWriteName = databaseWriteName;
        this.databaseWriteUrl = databaseWriteUrl;
        this.databaseWriteUser = databaseWriteUser;
        this.databaseWritePassword = databaseWritePassword;
    }

    /**
     * Get a JSON definition of the network instance
     * @returns {JSON} the JSON definition
     */
    toJSON() {
        let network = {};
        network.id = this.id;
        network.name = this.name;
        network.refreshTime = this.refreshTime;
        network.databaseWriteName = this.databaseWriteName;
        network.databaseWriteUrl = this.databaseWriteUrl;
        network.databaseWriteUser = this.databaseWriteUser;
        network.databaseWritePassword = this.databaseWritePassword;
        network.nodes = this.nodes;

        return JSON.parse(JSON.stringify(network));
    }

    /**
     * Get a network instance from a JSON containing
     * its definition
     * @param json {JSON} the json file
     * @returns {Network} the network instance
     */
    static fromJSON(json) {
        return new Network(json.id, json.name, json.refreshTime, json.databaseWriteName, json.databaseWriteUrl, json.databaseWriteUser, json.databaseWritePassword, json.nodes.map(node => Node.fromJSON(node)));
    }
}
exports.Network = Network;
'use strict';

class Sensor {
    /**
     * Build a sensor instance
     * @param databaseSensorUrl {string} the database name
     * @param databaseSensorName {string} the database url
     * @param databaseSensorUser {string} the database user
     * @param databaseSensorPassword {string} the database password
     * @param databaseSensorTable {string} the database table
     * @param databaseSensorColumn {string} the database column
     */
    constructor(databaseSensorUrl, databaseSensorName, databaseSensorUser, databaseSensorPassword, databaseSensorTable, databaseSensorColumn) {
        this.databaseSensorUrl = databaseSensorUrl;
        this.databaseSensorName = databaseSensorName;
        this.databaseSensorUser = databaseSensorUser;
        this.databaseSensorPassword = databaseSensorPassword;
        this.databaseSensorTable = databaseSensorTable;
        this.databaseSensorColumn = databaseSensorColumn;
    }

    /**
     * TODO fix
     * Updates the database credentials
     * @param json {JSON} the JSON containing the database definitions
     */
    setDatabase(json) {
        this.databaseSensorUrl = json.databaseSensorUrl;
        this.databaseSensorName = json.databaseSensorName;
        this.databaseSensorUser = json.databaseSensorUser;
        this.databaseWritePassword = json.databaseWritePassword;
        this.databaseSensorTable = json.databaseSensorTable;
        this.databaseSensorColumn = json.databaseSensorColumn;
    }

    /**
     * Get a sensor instance from a JSON containing
     * its definition
     * @param json {JSON} the json definition
     * @return {Sensor} the sensor instance
     */
    static fromJSON(json) {
        if (json.hasOwnProperty('databaseSensorUrl')) {
            return new Sensor(json.databaseSensorUrl, json.databaseSensorName, json.databaseSensorUser, json.databaseWritePassword, json.databaseSensorTable, json.databaseSensorColumn);
        }

        return null;
    }
}
exports.Sensor = Sensor;
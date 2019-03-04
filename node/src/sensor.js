'use strict';

class Sensor {
    /**
     * Get whether the sensor is set or not
     * @returns {boolean} true, if the sensor is set, false otherwise
     */
    isSet() {
        return this.hasOwnProperty('databaseSensorUrl');
    }

    /**
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
     * @return {Sensor|Object} the sensor instance, or an empty object
     */
    static fromJSON(json) {
        let sensor = new Sensor();

        if (json.hasOwnProperty('databaseSensorUrl')) {
            sensor.setDatabase(json);
        }

        return sensor;
    }
}
exports.Sensor = Sensor;
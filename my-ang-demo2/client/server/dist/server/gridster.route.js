"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveGridster = exports.getGridster = void 0;
const db_data_1 = require("./db-data");
const timers_1 = require("timers");
function getGridster(req, res) {
    res.status(200).json(db_data_1.GRIDSTER);
}
exports.getGridster = getGridster;
function saveGridster(req, res) {
    const data = req.body;
    console.log('Saving gridster');
    db_data_1.GRIDSTER.grids = data.grids;
    (0, timers_1.setTimeout)(() => {
        res.status(200).json({});
    }, 2000);
}
exports.saveGridster = saveGridster;

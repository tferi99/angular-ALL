"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSimpleInputValue = exports.getSimpleInputValue = void 0;
const db_data_1 = require("./db-data");
function getSimpleInputValue(req, res) {
    setTimeout(() => {
        res.status(200).json({ payload: db_data_1.SIMPLE_INPUT_VALUE });
    }, 200);
}
exports.getSimpleInputValue = getSimpleInputValue;
function saveSimpleInputValue(req, res) {
    const { value } = req.body;
    console.log('Saving simple input value', value);
    db_data_1.SIMPLE_INPUT_VALUE.value = value;
    setTimeout(() => {
        res.status(200).json(db_data_1.SIMPLE_INPUT_VALUE);
    }, 2000);
}
exports.saveSimpleInputValue = saveSimpleInputValue;

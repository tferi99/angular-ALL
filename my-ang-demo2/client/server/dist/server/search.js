"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsers = void 0;
const db_data_1 = require("./db-data");
function searchUsers(req, res) {
    const queryParams = req.query;
    const searchPattern = req.params['src'];
    const result = db_data_1.USERS.filter(u => u.email.indexOf(searchPattern) >= 0);
    setTimeout(() => {
        res.status(200).json({ payload: result });
    }, 100);
}
exports.searchUsers = searchUsers;

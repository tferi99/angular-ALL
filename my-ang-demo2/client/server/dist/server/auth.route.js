"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = void 0;
const db_data_1 = require("./db-data");
function loginUser(req, res) {
    setTimeout(() => {
        console.log('User login attempt ...');
        const { email, password } = req.body;
        const user = (0, db_data_1.login)(email, password);
        if (user) {
            res.status(200).json({ id: user.id, email: user.email });
        }
        else {
            res.sendStatus(403);
        }
    }, 100);
}
exports.loginUser = loginUser;
function logoutUser(req, res) {
    console.log('User logout');
    const { email } = req.body;
    const username = (0, db_data_1.logout)(email);
    if (username) {
        res.status(200).json({ username });
    }
    else {
        res.sendStatus(403);
    }
}
exports.logoutUser = logoutUser;

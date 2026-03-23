"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCourse = exports.getCourseById = exports.getAllCoursesRandomErr = exports.getAllCoursesSlowly = exports.getAllCoursesLimit = exports.getAllCourses = void 0;
const db_data_1 = require("./db-data");
const timers_1 = require("timers");
function getAllCourses(req, res) {
    (0, timers_1.setTimeout)(() => {
        res.status(200).json({ payload: Object.values(db_data_1.COURSES) });
    }, 200);
}
exports.getAllCourses = getAllCourses;
function getAllCoursesLimit(req, res) {
    const limit = req.params['limit'];
    (0, timers_1.setTimeout)(() => {
        res.status(200).json({ payload: Object.values(db_data_1.COURSES).slice(0, limit) });
    }, 200);
}
exports.getAllCoursesLimit = getAllCoursesLimit;
function getAllCoursesSlowly(req, res) {
    (0, timers_1.setTimeout)(() => {
        res.status(200).json({ payload: Object.values(db_data_1.COURSES) });
    }, 1000);
}
exports.getAllCoursesSlowly = getAllCoursesSlowly;
/**
 * It generates error randomly.
 *
 * @param req
 * @param res
 */
function getAllCoursesRandomErr(req, res) {
    const error = (Math.random() >= 0.4);
    if (error) {
        const errorTypeAuth = (Math.random() >= 0.5);
        if (errorTypeAuth) {
            console.log('ERROR loading courses$!');
            res.status(401).json({ message: 'random auth error occurred.' });
        }
        else {
            console.log('ERROR loading courses$!');
            res.status(500).json({ message: 'random server side error occurred.' });
        }
    }
    else {
        (0, timers_1.setTimeout)(() => {
            res.status(200).json({ payload: Object.values(db_data_1.COURSES) });
        }, 200);
    }
}
exports.getAllCoursesRandomErr = getAllCoursesRandomErr;
function getCourseById(req, res) {
    const courseId = req.params['id'];
    const courses = Object.values(db_data_1.COURSES);
    const course = courses.find(course => course.id == courseId);
    res.status(200).json(course);
}
exports.getCourseById = getCourseById;
function saveCourse(req, res) {
    const id = req.params['id'];
    const changes = req.body;
    console.log('Saving course', id, JSON.stringify(changes));
    db_data_1.COURSES[id] = Object.assign(Object.assign({}, db_data_1.COURSES[id]), changes);
    (0, timers_1.setTimeout)(() => {
        res.status(200).json(db_data_1.COURSES[id]);
    }, 2000);
}
exports.saveCourse = saveCourse;

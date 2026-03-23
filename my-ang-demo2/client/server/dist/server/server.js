"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_route_1 = require("./course.route");
const search_lessons_route_1 = require("./search-lessons.route");
const auth_route_1 = require("./auth.route");
const search_1 = require("./search");
const gridster_route_1 = require("./gridster.route");
const simple_input_route_1 = require("./simple-input.route");
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
app.use(bodyParser.json());
// REST API
app.route('/api/login').post(auth_route_1.loginUser);
app.route('/api/logout').post(auth_route_1.logoutUser);
app.route('/api/courses').get(course_route_1.getAllCourses);
app.route('/api/courses/limit/:limit').get(course_route_1.getAllCoursesLimit);
app.route('/api/courses/randomerr').get(course_route_1.getAllCoursesRandomErr);
app.route('/api/courses/slow').get(course_route_1.getAllCoursesSlowly);
app.route('/api/courses/:id').get(course_route_1.getCourseById);
app.route('/api/lessons').get(search_lessons_route_1.searchLessons);
app.route('/api/courses/:id').put(course_route_1.saveCourse);
app.route('/api/search/:src').get(search_1.searchUsers);
app.route('/api/gridster').get(gridster_route_1.getGridster);
app.route('/api/gridster').post(gridster_route_1.saveGridster);
app.route('/api/simpleinput').get(simple_input_route_1.getSimpleInputValue);
app.route('/api/simpleinput').post(simple_input_route_1.saveSimpleInputValue);
const httpServer = app.listen(9001, () => {
    console.log('HTTP REST API Server running at http://localhost:' + httpServer.address().port);
});

import {Request, Response} from 'express';
import {COURSES} from './db-data';



export function getAllCourses(req: Request, res: Response) {
    console.log('Retrieving courses data ...');
    res.status(200).json({payload: Object.values(COURSES)});
}


export function getCourseById(req: Request, res: Response) {
    let courseId = req.params['id'];
    if (!courseId) {
      courseId = '-1';
    }
    const courseIdNum = Number(courseId);
    const courses = Object.values(COURSES);
    const course = courses.find(c => c.id === courseIdNum);
    res.status(200).json(course);
}

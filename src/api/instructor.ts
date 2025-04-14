import { Router } from 'express';
import multer from 'multer';
import instructorController from './controllers/instructor.controller';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
});

const routerInstructor = Router();
routerInstructor.post(
    '/',
    upload.fields([{ name: 'profilePhoto', maxCount: 1 }]),
    instructorController.createInstructor
);
routerInstructor.get('/', instructorController.getAllInstructors);
routerInstructor.get('/:id', instructorController.getInstructorById);
routerInstructor.put(
    '/:id',
    upload.fields([{ name: 'profilePhoto', maxCount: 1 }]),
    instructorController.updateInstructor
);

routerInstructor.delete('/:id', instructorController.deleteInstructor);
routerInstructor.get('/class-type/:classType', instructorController.getInstructorsByClassType);

export default routerInstructor;

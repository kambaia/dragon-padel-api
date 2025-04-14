import { Request, Response } from 'express';
import InstructorService from '../services/instructor.service';
import { CloudflareService } from '../../util/cloudflare';

class InstructorController {
    private cloudflare: CloudflareService;

    constructor() {
        this.cloudflare = new CloudflareService();
        this.createInstructor = this.createInstructor.bind(this);
    }

    createInstructor = async (req: Request, res: Response): Promise<void> => {
        try {
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const urls: { profilePhoto?: string } = {};

            if (files?.profilePhoto && files.profilePhoto[0]) {
                const imageUrl = await this.cloudflare.uploadFile('instructors', files.profilePhoto[0]);
                urls.profilePhoto = imageUrl;
            }

            const instructorData = req.body;
            const newInstructor = await InstructorService.createInstructor({
                ...instructorData,
                ...urls
            });

            res.status(201).json(newInstructor);
        } catch (error: unknown) {
            console.error(error);
            res.status(400).json({ message: error instanceof Error ? error.message : 'Unknown error occurred' });
        }
    };

    getAllInstructors = async (req: Request, res: Response): Promise<void> => {
        try {
            const {
                search,
                gender,
                experienceLevel,
                classType,
                sort,
                page,
                limit
            } = req.query;

            const result = await InstructorService.getAllInstructors({
                search: search as string,
                gender: gender as 'Male' | 'Female' | 'Other',
                experienceLevel: experienceLevel as 'Beginner' | 'Intermediate' | 'Advanced',
                classType: classType as string,
                sort: sort as string,
                page: page ? parseInt(page as string) : undefined,
                limit: limit ? parseInt(limit as string) : undefined
            });

            res.status(200).json(result);
        } catch (error: unknown) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error occurred' });
        }
    }

    getInstructorById = async (req: Request, res: Response): Promise<void> => {
        try {
            const instructor = await InstructorService.getInstructorById(req.params.id);
            if (!instructor) {
                res.status(404).json({ message: 'Instructor not found' });
                return;
            }
            res.status(200).json(instructor);
        } catch (error: unknown) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error occurred' });
        }
    }

    updateInstructor = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const updateData = req.body;

            const existingInstructor = await InstructorService.getInstructorById(id);
            if (!existingInstructor) {
                res.status(404).json({ message: 'Instructor not found' });
                return;
            }

            if (files?.profilePhoto && files.profilePhoto[0]) {
                if (existingInstructor.profilePhoto) {
                    const oldUrl = existingInstructor.profilePhoto;
                    const url = new URL(oldUrl);
                    const key = decodeURIComponent(url.pathname.slice(1));
                    await this.cloudflare.deleteFile(key);
                }

                const newImageUrl = await this.cloudflare.uploadFile('instructors', files.profilePhoto[0]);
                updateData.profilePhoto = newImageUrl;
            }

            const updatedInstructor = await InstructorService.updateInstructor(id, updateData);
            res.status(200).json(updatedInstructor);
        } catch (error: unknown) {
            console.error(error);
            res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error occurred' });
        }
    }

    deleteInstructor = async (req: Request, res: Response): Promise<void> => {
        try {
            const instructor = await InstructorService.deleteInstructor(req.params.id);
            if (!instructor) {
                res.status(404).json({ message: 'Instructor not found' });
                return;
            }
            res.status(200).json({ message: 'Instructor deleted successfully' });
        } catch (error: unknown) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error occurred' });
        }
    }

    getInstructorsByClassType = async (req: Request, res: Response): Promise<void> => {
        try {
            const instructors = await InstructorService.getInstructorsByClassType(req.params.classType);
            res.status(200).json(instructors);
        } catch (error: unknown) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error occurred' });
        }
    }
}

export default new InstructorController();

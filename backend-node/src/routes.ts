import express, {Request, Response} from 'express';
import { NodemailerMiniservice } from './miniservices/mail/nodemailer-miniservice';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackService } from './services/SubmitFeedbackService';
export const routes = express.Router();

routes.post('/feedbacks', async (req: Request, res: Response)=>{
  const {type, comment, screenshot} = req.body;
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const nodemailerMiniservice = new NodemailerMiniservice();
  const submitFeedbackService = new SubmitFeedbackService(prismaFeedbackRepository, nodemailerMiniservice);
  
  await submitFeedbackService.execute({
    type,
    comment,
    screenshot
  });
  
  return res.status(201).send();
})


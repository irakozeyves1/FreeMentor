import { Router } from 'express';
import { signin, signup, updateMentor, mentors, getMentorId } from '../controllers/user.controller';
import { validate } from '../middleware/validation.middleware';
import { isEmailUsed, hashPassword, authanticate, isAdmin, isMentor } from '../middleware/user.middleware';
import { verifyToken } from '../middleware/token.middleware';
import { session, accept, reject,getSessionById, remove } from '../controllers/session.controller';

const router = Router();
// required api
router.post('/auth/signup', validate, isEmailUsed, hashPassword, signup);//Create useraccount
router.post('/auth/signin', validate, authanticate, signin);//Login a user
router.patch('/user/:userId', verifyToken, isAdmin, updateMentor);//Change a user to a mentor
router.get('/mentors', verifyToken, mentors);//Get all mentors
router.get('/mentors/:userId',verifyToken ,getMentorId);//Get a specific mentor
router.post('/sessions', verifyToken, session);//Create a mentorship session request
router.patch('/sessions/:sessionId/accept', verifyToken,isMentor, accept);//A mentor can accept a mentorship session request
router.patch('/sessions/:sessionId/reject',verifyToken,isMentor, reject);//A mentor can reject a mentorship session request

// extra  api 
router.get('/sessions', getSessionById);//Get all mentorship session requests both mentor / mentee
router.delete('/sessions/:sessionId/review', verifyToken,isAdmin, remove);//Admin can delete mentorship session review deemed inappropriate

export default router;
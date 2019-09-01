import { Router } from 'express';
import { signin, signup, updateMentor, mentors, getMentorId } from '../controllers/user.controller';
import { validate } from '../middleware/validation.middleware';
import { isEmailUsed, hashPassword, authanticate, isAdmin } from '../middleware/user.middleware';
import { verifyToken } from '../middleware/token.middleware';
import { session, accept, reject,getSessionById, remove, review  } from '../controllers/session.controller';

const router = Router();

router.post('/auth/signup', validate, isEmailUsed, hashPassword, signup);
router.post('/auth/signin', validate, authanticate, signin);
router.patch('/user/:userId', verifyToken, isAdmin, updateMentor);
router.get('/mentor', verifyToken, mentors);
router.get('/mentors/:userId', getMentorId);
router.post('/sessions', verifyToken, session);
router.patch('/sessions/:sessionId/accept', verifyToken, accept);
router.patch('/sessions/:sessionId/reject',verifyToken, reject);
router.get('/sessions', getSessionById);
router.post('/sessions/:sessionId/review', verifyToken, review);
router.delete('/sessions/:sessionId/review', verifyToken, remove);

export default router;
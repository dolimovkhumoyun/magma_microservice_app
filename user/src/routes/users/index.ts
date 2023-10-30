import express from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../../controllers/users';

const router = express.Router();

router.get('/:user_id', getUser);
router.get('/', getUsers);
router.post('/', createUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

export default router;

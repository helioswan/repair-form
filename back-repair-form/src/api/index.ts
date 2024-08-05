import express from 'express';

import repairs from './repairs/repairs.route';
import users from './users/users.route';

const router = express.Router();

router.use('/repairs', repairs);
router.use('/', users);

export default router;

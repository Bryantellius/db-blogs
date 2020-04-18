import * as express from 'express';

import blogRouter from './blogRouter';

const router = express.Router()

router.use("/blogs", blogRouter);

export default router;
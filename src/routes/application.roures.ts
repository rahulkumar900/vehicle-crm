import express from 'express'
const router = express.Router()
import {createApplication} from '../controller/application.controller';

router.route("/application").post(createApplication);

export default router;
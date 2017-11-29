'use strict';

import {Router} from 'express';
import * as controller from './cloudinary.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', controller.signFileUploadRequest);


export default router;

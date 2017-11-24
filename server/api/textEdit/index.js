'use strict';

import {Router} from 'express';
import * as controller from './textEdit.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', controller.findAll);
router.post('/',controller.create);

export default router;
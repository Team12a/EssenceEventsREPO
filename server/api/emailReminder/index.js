'use strict';

import {Router} from 'express';
import * as controller from './emailReminder.controller';

var router = new Router();

router.post('/', controller.emailReminder);

export default router;

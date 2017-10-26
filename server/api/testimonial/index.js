'use strict';

import {Router} from 'express';
import * as controller from './testimonial.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.post('/', auth.hasRole('user'), controller.create);

export default router;

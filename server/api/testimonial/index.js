'use strict';

import {Router} from 'express';
import * as controller from './testimonial.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', controller.findAll);
router.post('/',controller.create);
router.get('/:id', controller.findOneById);
router.delete('/:id', controller.remove);
router.param('id', controller.testimonialById);

export default router;

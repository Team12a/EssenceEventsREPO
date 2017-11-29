'use strict';

import {Router} from 'express';
import * as controller from './textEdit.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/:text_id', controller.findOneById);
router.post('/', auth.hasRole('super'),controller.create);
router.put('/', auth.hasRole('super'),controller.update);


router.param('text_id', controller.textByID);
export default router;

//changed the logic here to allow access for both super admin and admins
'use strict';

import {Router} from 'express';
import * as controller from './subcontractor.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.remove);

router.param('id', controller.findId);

export default router;

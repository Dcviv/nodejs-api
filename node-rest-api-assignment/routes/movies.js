const express =require('express');
const router =express.Router();
const movieController= require('../app/api/controllers/movies');

router.get('/', movieController.getAll);
router.post('/', movieController.create);
router.get('/:movieId',movieController.getById);
router.delete('/:movieId', movieController.deleteById);
router.put('/:movieId', movieController.updateById);

module.exports=router;
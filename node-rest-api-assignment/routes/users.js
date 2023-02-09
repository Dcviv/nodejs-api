const express =require('express');
const router =express.Router();
const userContrller= require('../app/api/controllers/users');

router.post('/register',userContrller.create);
router.post('/authenticate',userContrller.authenticate);

module.exports=router;
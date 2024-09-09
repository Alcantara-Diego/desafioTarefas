const express = require('express');
const { loginController, registerController } = require('../controllers/authControllers');
const router = express.Router();
const { CheckDuplicateAccount, validateFields, validadeLogin } = require('../middlewares/authMiddlewares')


router.post('/login', validadeLogin, loginController);

router.post('/register', validateFields, CheckDuplicateAccount, registerController);

module.exports = router;
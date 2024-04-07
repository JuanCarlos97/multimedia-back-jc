const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const usersController = require('../controllers/usersController');
const auth = require('../middleware/authMiddleware');

// @route    POST api/users/register
// @desc     Registrar usuario
// @access   Public

router.post(
    '/register',
    [
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('email', 'Por favor, incluya un email válido').isEmail(),
        check('password', 'Por favor, ingrese una contraseña con 6 o más caracteres').isLength({ min: 6 }),
        check('role', 'Por favor, selecciona el rol').not().isEmpty()
    ],
    usersController.registerUser
);

// @route    POST api/users/login
// @desc     Autenticar usuario & obtener token
// @access   Public
router.post(
    '/login',
    [
        check('email', 'Por favor, incluya un email válido').isEmail(),
        check('password', 'La contraseña es obligatoria').exists()
    ],
    usersController.loginUser
);

// Get all users
router.get('/', auth, usersController.getAllUsers);

module.exports = router;

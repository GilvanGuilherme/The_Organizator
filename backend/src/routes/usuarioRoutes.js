const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");

// Define as rotas de usuário
router.post("/usuarios", UsuarioController.registrar);
router.post("/login", UsuarioController.login);

module.exports = router;

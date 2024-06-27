import { Router } from "express";
import { insertUser, listUsers, softDeleteUser, updateUser } from "./controller/userController.js"

const router = Router();

// Endpoint para testar API
router.get("/", (req, res) => {
  res.json({
    statusCode: 200,
    msg: "Api Rodando",
  });
});

// Endpoint para listar usuário
router.get("/users", listUsers);
  
// Endpoint para criação de usuário
router.post("/user", insertUser);

// Endpoint para atualização de usuário
router.put("/user", updateUser);

// Endpoint para deleção de usuário
router.put("/user/delete", softDeleteUser);

export default router;
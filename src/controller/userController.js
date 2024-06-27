import {
  getAllUser,
  insertNewUser,
  updateTheUser,
  userSoftDelete,
} from "../service/userService.js";
import { upload, errorTreat } from "../service/imgService.js";
// Listar usuários
export const listUsers = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 20;
    const response = await getAllUser(perPage, page);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários!" });
  }
};
// Criar usuário
export const insertUser = async (req, res) => {
  upload(req, res, async (err) => {
    // Tratamento de erro
    if (err) {
      let errorMessage = errorTreat(err);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessage,
      });
    }
    // Inserindo usuário com imagem
    try {
      await insertNewUser(req.body, req.file?.buffer);
      res.json({
        statusCode: 200,
        message: "Usuário criado com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: "Erro ao criar usuário!",
        error: err.message,
      });
    }
  });
};
// Atualizando usuário
export const updateUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      let errorMessage = errorTreat(err);
      return res.status(400).json({
        statusCode: 400,
        message: errorMessage,
      });
    }
    // Atualizando usuário com imagem
    try {
      await updateTheUser(req.body, req.file?.buffer);
      res.json({
        statusCode: 200,
        message: "Usuário atualizado com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: "Erro ao atualizar usuário!",
        error: err.message,
      });
    }
  });
};
// Soft delete
export const softDeleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    await userSoftDelete(id);
    res.json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário!" });
  }
};

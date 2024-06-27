import { resizeImage } from "./imgService.js";
import {
  userPagination,
  loginExists,
  emailExists,
  insertUser,
  updateUser,
  findOneById,
  updateSoftDelete,
  createTable,
} from "../repositories/userRepositories.js";

// Buscar todos os usuários
export const getAllUser = async (perPage, page) => {
  const users = await userPagination(perPage, page);
  // Converter a imagem de buffer para Base64 e incluir na resposta JSON
  const usersWithBase64Image = users.map((user) => ({
    ...user,
    img: user.img
      ? `data:image/jpeg;base64,${user.img.toString("base64")}`
      : null,
  }));
  return usersWithBase64Image;
};

// Validação de usuário
const userValidate = async (user, file) => {
  let imgBuffer = null;
  if (file) {
    imgBuffer = await resizeImage(file);
  }
  const hasLogin = await loginExists(user);
  const hasEmail = await emailExists(user);
  return {
    imgBuffer,
    hasLogin,
    hasEmail,
  };
};
// Criar novo usuário
export const insertNewUser = async (body, file) => {
  const { imgBuffer, hasLogin, hasEmail } = await userValidate(body, file);
  if (!hasLogin && !hasEmail) {
    await createTable();
    const response = await insertUser(body, imgBuffer);
    return;
  }
  throw new Error(
    `${hasLogin ? "login" : "email"} já existe! Favor informar outro.`
  );
};
// Atualizar usuário
export const updateTheUser = async (body, file) => {
  const { imgBuffer, hasLogin, hasEmail } = await userValidate(body, file);
  if (!hasLogin && !hasEmail) {
    return await updateUser(body, imgBuffer);
  }
  throw new Error(
    `${hasLogin ? "login" : "email"} já existe! Favor informar outro.`
  );
};
// Deletar usuário
export const userSoftDelete = async (id) => {
  try {
    if (!(await findOneById(id))) {
      throw new Error("Usuário não encontrado ou já deletado");
    }
    await updateSoftDelete(id);
    return true;
  } catch (error) {
    throw new Error("Erro ao deletar usuário!", error);
  }
};

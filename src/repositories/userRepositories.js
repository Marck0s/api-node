import { openDb } from "../configDB.js";

// Buscar todos os usuários paginados excluindo os que estão deletados
export const userPagination = async (perPage, page) => {
  const offset = (page - 1) * perPage;
  try {
    const db = await openDb();
    const users = await db.all(
      "SELECT id, name, email, login, img FROM user WHERE deleted = 0 LIMIT ? OFFSET ?",
      [perPage, offset]
    );
    return users;
  } catch (error) {
    throw new Error(`Erro ao listar usuários: ${error.message}`);
  }
};

// Criar tabelas caso não exista
export const createTable = async () => {
  try {
    const db = await openDb();
    await db.exec(
      `CREATE TABLE IF NOT EXISTS user ( id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, login TEXT, deleted INTEGER DEFAULT 0, img BLOB )`
    );
  } catch (error) {
    return error;
  }
};
// Validação de login existente
export const loginExists = async (user) => {
  try {
    const db = await openDb();
    const hasLogin = await db.get("SELECT * FROM user WHERE login = ?", [
      user.login,
    ]);
    return hasLogin ? true : false;
  } catch (error) {
    return error;
  }
};
// Validação de email existente
export const emailExists = async (user) => {
  try {
    const db = await openDb();
    const hasEmail = await db.get("SELECT * FROM user WHERE email = ?", [
      user.email,
    ]);
    return hasEmail ? true : false;
  } catch (error) {
    return error;
  }
};
// Criar usuário
export const insertUser = async (user, imgBuffer) => {
  try {
    const db = await openDb();
    await db.run(
      "INSERT INTO user (name, email, password, login, img) VALUES (?, ?, ?, ?, ?)",
      [user.name, user.email, user.password, user.login, imgBuffer]
    );
  } catch (error) {
    return error;
  }
};
// Atualizar usuário
export const updateUser = async (user, imgBuffer) => {
  const db = await openDb();
  const query = `UPDATE user SET name=?, email=?, password=?, login=?, ${
    imgBuffer ? "img=?" : ""
  } WHERE id=?`;
  const params = imgBuffer
    ? [user.name, user.email, user.password, user.login, imgBuffer, user.id]
    : [user.name, user.email, user.password, user.login, user.id];
  await db.run(query, params);
};
// Procurar pelo Id
export const findOneById = async (id) => {
  try {
    const db = await openDb();
    return await db.get("SELECT * FROM user WHERE id = ? AND deleted = 0", [
      id,
    ]);
  } catch (error) {
    throw new Error("Não foi possível encontrar o usuário", error);
  }
};
// Soft delete
export const updateSoftDelete = async (id) => {
  try {
    const db = await openDb();
    await db.run("UPDATE user SET deleted = 1, img = NULL WHERE id = ?", [id]);
  } catch (error) {
    throw new Error("Não foi possível deletar o usuário", error);
  }
};

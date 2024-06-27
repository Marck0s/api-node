import express from "express";
import fs from "fs";
import https from "https";
import cors from "cors";
import router from "./routes.js";
import swaggerUI from "swagger-ui-express";
import path from "path";

// Função para ler e fazer parse do JSON
const readJSONFile = (filePath) => {
  const absolutePath = path.resolve(filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(fileContent);
};

const swaggerDocument = readJSONFile('./swagger.json')

const app = express();
// Middleware para parsear JSON
app.use(express.json());
// Middleware para permitir CORS
app.use(cors());
// Middleware para as rotas da aplicação
app.use(router);
// Middleware para a documentação Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const PORT1 = 3000;
app.listen(PORT1, () => console.log(`API rodando na porta ${PORT1}`));

const PORT2 = 3001;
https
  .createServer(
    {
      cert: fs.readFileSync("src/SSL/code.crt"),
      key: fs.readFileSync("src/SSL/code.key"),
    },
    app
  )
  .listen(PORT2, () => console.log(`Rodando em https na porta ${PORT2}`));

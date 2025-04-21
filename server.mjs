import app from "./app.mjs"
import { config } from  "./src/config/env.mjs"

const  PORT = config.port;

app.listen(PORT, ()=>{
  console.log(`Servidor rodando na porta ${PORT}`)
})

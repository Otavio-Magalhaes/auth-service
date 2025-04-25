import express from 'express'
import routes from "./src/interfaces/routes/index.mjs"
import cookieParser from "cookie-parser";


const app = express()

app.use(express.json())
app.use(cookieParser());
app.use(routes)

app.get("/", (request, response)=>{
  response.send("API JWT funcionando!")
})



export default app
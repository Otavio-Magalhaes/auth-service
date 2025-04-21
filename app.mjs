import express from 'express'
import routes from "./src/interfaces/routes/index.mjs"



const app = express()

//colocar o cors
app.use(express.json())
app.use(routes)

app.get("/", (request, response)=>{
  response.send("API JWT funcionando!")
})



export default app
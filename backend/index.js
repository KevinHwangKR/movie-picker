import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import MovieDAO from "./dao/movieDAO.js"
import ReviewDAO from "./dao/reviewDAO.js"

dotenv.config()

const MongoClient = mongodb.MongoClient

const port = 5000 || 8000

MongoClient.connect("mongodb://kevinhkr:password@mongodb:27017", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await MovieDAO.injectDB(client)
        await ReviewDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
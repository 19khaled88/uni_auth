import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
    try {
        await mongoose.connect(config.url as string)
        console.log('Database connected')

        app.listen(config.port, () => {
            console.log(`listening on port ${config.port}`)
        })
    } catch (error) {
        console.log('Failed to connect db')
    }
}

main()
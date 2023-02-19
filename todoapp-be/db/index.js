require("dotenv").config();

MONGODB_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.9avpztt.mongodb.net/todoapp?retryWrites=true&w=majority`;

module.exports = MONGODB_URL;

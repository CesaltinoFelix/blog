const Sequilize = require("sequelize")

const connection = new Sequilize('blog_tech', 'root', '', {
    host: "localhost",
    dialect: "mysql"
})

module.exports = connection
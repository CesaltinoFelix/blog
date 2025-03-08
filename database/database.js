const Sequilize = require("sequelize")

const connection = new Sequilize('blog_tech', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    timezone: '+01:00',//config timezone Angola
})

module.exports = connection
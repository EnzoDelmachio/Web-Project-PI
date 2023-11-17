const Sequelize = require("sequelize");

const sequelize = new Sequelize("project", "root", "1v4v-u2us-1jav",{
    host:'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function(){
    console.log("Conexão realizada com sucesso!")
}).catch(function(){
    console.log("Erro na conexão");
});

module.exports = sequelize;
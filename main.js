const { sequelize } = require("./src/app/models")
async function main() {
    await sequelize.sync({ alter: true });
}
main()
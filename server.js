const { app } = require('./app');
const { config } = require('./config/config');

// Utils
const { sequelize } = require('./utils/database');

sequelize
    .authenticate()
    .then(() => console.log('Database authenticated'))
    .catch((err) => console.log(err));

const PORT = config.DBport || 4000;

app.listen(PORT, () => {
    console.log(`Express app running on port: ${PORT}`);
});
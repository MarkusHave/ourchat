module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "Qwerty7",
    database: process.env.DB_NAME || "postgres",
    host: process.env.DB_HOST || "192.168.1.110",
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: "user",
    password: "12345",
    database: "ourchat_prod",
    host: "192.168.11.16",
    dialect: "postgres",
  },
};

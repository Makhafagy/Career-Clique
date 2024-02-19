const app = require('./app')
const { PORT } = require('./config')
// const knex = require('knex');
// const parse = require('pg-connection-string').parse;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

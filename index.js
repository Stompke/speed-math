const server = require('./api/server')

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`\n\n\n *** Server is listening on port ${PORT} *** \n\n\n`);
})
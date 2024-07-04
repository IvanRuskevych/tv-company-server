const mongoose = require('mongoose');

const app = require('./app');

const url = process.env.DB_URL;
const port = process.env.PORT;

mongoose
    .connect(url)
    .then(() => {
        // Port connection
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
        // DB connection
        console.log('Database connection successful');
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });

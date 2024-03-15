const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const cookieConfig = require('./config/auth.secret');

// Express config
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: cookieConfig.cookie_name,
        keys: [cookieConfig.cookie_key],
        httpOnly: true,
        sameSite: 'strict',
    })
);

const port = process.env.APP_PORT || 4000;

// home route
app.get('/', (req, res) => {
    res.json({ message: 'Default home page' });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/forms.route')(app);
require('./routes/questions.routes')(app);
require('./routes/answers.routes')(app);
require('./routes/users.routes')(app);
require('./routes/submissions.routes')(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

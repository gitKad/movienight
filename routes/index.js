module.exports = function (app) {
    app.use('/api', require('./users'));
};

module.exports = function (app) {
    app.use('/api', require('./users'));
    app.use('/api', require('./ratings'));
    app.use('/api', require('./movies'));
    app.use('/api', require('./directors'));
};

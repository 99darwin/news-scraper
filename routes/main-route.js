var mainController = require('../controllers/main-controller.js');

module.exports = function(app) {
    // Get routes
    app.get('/', mainController.landing);
    app.get('/scrape', mainController.scrape);
    app.get('/articles', mainController.articles);

    // Post routes
    app.post('/articles/:id', mainController.saveNote);
}
var server  = require('../server.js');
var Note    = require('../models/Note.js');
var Article = require('../models/Article.js');
// var Saved = require('../models/Saved.js');
var request = require('request');
var cheerio = require('cheerio');
// ==== Routes ====

var exports = module.exports = {};

// Homepage
exports.landing = function(req, res) {
    res.render('index')
};

// Scrape
exports.scrape = function(req, res) {
    request('http://themerkle.com', function(err, response, html) {
        var $ = cheerio.load(html);
        $('article h2').each(function(i, element) {
            var article = {
                title: $(this).children('a').text(),
                // summary: $(this).children('div').attr('.front-view-content'),
                link: $(this).children('a').attr('href')
            }
            var entry = new Article(article);
            entry.save(function(err, doc) {
                if (err) {
                    console.log(err);
                } 
                else {
                    console.log(doc);
                }
            });
        });
        res.render('index');
    }); 
};

// Find all articles and return json object
exports.articles = function(req, res) {
    Article.find({}, function(err, doc) {
        if (err) throw err;
        res.json(doc);
    });
};

exports.saveNote = function(req, res) {
    var newNote = new Note(req.body);
    newNote.save(function(err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            Article.findOneAndUpdate({
                '_id': req.params.id
            },
            {
                'note': doc._id
            }).exec(function(err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(doc);
                }
            });
        }
    });
}

// app.post('/articles', function(req, res) {
    
// })
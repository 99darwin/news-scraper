// Load articles and display them on page
$('document').ready(function() {
    $.ajax({
        method: 'GET',
        url: '/articles'
    }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].title);
            console.log(data[i].link);
            var adiv = $('.articles');
            adiv.prepend('<div class="card hoverable">' + 
            '<div class="card-content">' + '<span class="card-title">' + data[i].title + '</span>' + 
            '<div class="card-action"><a href="' + data[i].link + '"> Read Article </a>' + '</div></div></div>')
        }
        
    });
});

$('#scrape').on('click', function(e) {
    e.preventDefault();
    $('#loading').toggle(400);
    setTimeout(scrapeArticle(), 5000);
});

function scrapeArticle() {
    $.ajax({
        method: 'GET',
        url: '/scrape'
    }).done(function(data) {
        console.log(data);
        // $('#loading').toggle(400);
        location.reload();
    });
}


$('.carousel.carousel-slider').carousel({fullWidth: true});
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
            '<div class="card-action"><a href="' + data[i].link + '"> Read Article </a><a href="#modal1" class="modal-trigger" id="note"> Make Note </a>' 
            + '</div></div></div>')
        }
        
    });
});

$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $('#note').on('click', function() {
        $('#modal1').modal('open');
    })
});



$('#scrape').on('click', function(e) {
    e.preventDefault();
    $('#loading').toggle(400);
    scrapeArticle();
});

function scrapeArticle() {
    $.ajax({
        method: 'GET',
        url: '/scrape'
    }).done(function(data) {
        // console.log(data);
        location.reload();
    });
}




$('.carousel.carousel-slider').carousel({fullWidth: true});
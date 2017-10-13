// Load articles and display them on page
$(document).ready(function() {
    $.ajax({
        method: 'GET',
        url: '/articles'
    }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
            // console.log(data[i].title);
            // console.log(data[i].link);
            var adiv = $('.articles');
            adiv.prepend('<div class="card hoverable">' + 
            '<div class="card-content">' + '<span class="card-title">' + data[i].title + '</span>' + 
            '<div class="card-action"><a href="' + data[i].link + '"> Read Article </a>' + 
            '<a href="#modal1" class="modal-trigger" data-id="' + data[i]._id + '" ' + 'id="note"> Make Note </a>' + 
            '<a href="#" data-id="' + data[i]._id + '">See Notes</a>' +
            '<a href="#">Save Article</a>' 
            + '</div></div></div>')
        }
        
    });

    $('.modal').modal();
    $('#note').on('click', function() {
        $('#modal1').modal('open');
        var thisId = $('#note').attr('data-id');
        $('#savenote').attr('data-id', thisId);
        console.log(thisId);
        $.ajax({
          method: 'GET',
          url: '/aritcles/' + thisId  
        }).done(function(data) {
            console.log(data);
            
        });
    });
    $('#savenote').on('click', function() {
        var thisId = $(this).attr('data-id');
        $.ajax({
            method: 'POST',
            url: '/articles/' + thisId,
            data: {
                title: $('#titleInput').val(),
                body: $('#bodyInput').val()
            }
        }).done(function(data) {
            console.log(data);
        });
        $('#titleInput').val('');
        $('#bodyInput').val('');
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
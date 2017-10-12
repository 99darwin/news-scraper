$('document').ready(function() {
    $.ajax({
        method: 'GET',
        url: '/articles'
    }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].title);
            console.log(data[i].link);
            var adiv = $('.articles');
            adiv.append('<div class="card hoverable">' + 
            '<div class="card-content">' + '<span class="card-title">' + data[i].title + '</span>' + 
            '<div class="card-action"><a href="' + data[i].link + '"> Read Article </a>' + '</div></div></div>')
        }
        
    });
});




$('.carousel.carousel-slider').carousel({fullWidth: true});
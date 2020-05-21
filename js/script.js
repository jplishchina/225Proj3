jQuery(document).ready(function($) 
{
    function createItem(book) 
    {
        var $li = $('<li>').addClass('list-group-item hover-invert cursor-pointer p-3 mb-4');    
        $('#loadSym2').hide();
        $li.data('bookT', book.id);
        $li.html(book.title + ' by ' + book.author);     
        return $li;
    }
    var request = axios.get('http://csc225.mockable.io/books');
    request.then(function(response) 
    {
        response.data.forEach(function(book) 
        {
            $('#loadSym').hide();
            $('#titles').append(createItem(book));
        });
        $('.list-group-item').on('click', function() 
        {
            $('.card').hide();
            $('#loadSym2').show();
            $('#newCard').addClass('card');
            $('.card').empty();
            $('.list-group-item').removeClass('active bg-secondary font-weight-bold');
            var bookId = $(this).data('bookT');
            $('.card').show();
            $(this).addClass('active bg-secondary font-weight-bold');
            axios.get('http://csc225.mockable.io/books/' + bookId).then(function(response) 
            {
                var $bookCover = $('<img>').attr('src', response.data.cover).addClass('mt-3 mb-3');
                var $bookTitle = $('<h4>').html(' Title: ' + response.data.title).addClass('mt-4 text-center font-italic bg-light rounded');
                var $bookAuthor = $('<h5>').html(' By ' + response.data.author).addClass('text-center bg-light mb-4 rounded');
                var $bookYear = $('<p>').html('<strong><u> Publication Year: </u></strong>' + response.data.year).addClass ('bg-light pl-2 rounded'); 
                var $bookCountry = $('<p>').html('<strong><u> Country: </u></strong>' + response.data.country).addClass('bg-light pl-2 rounded');
                var $bookLanguage = $('<p>').html('<strong><u> Language: </u></strong>' + response.data.language).addClass('bg-light pl-2 rounded');
                var $bookPages = $('<p>').html('<strong><u> Page Count: </u></strong>' + response.data.pages).addClass('bg-light pl-2 rounded');
                var $linker = $('<a>').attr('href', response.data.link).html(response.data.link).addClass('linkcss bg-light rounded pl-2'); 
                var $bookLink = '<strong><u> Link: </u></strong>'; 
                var wikiLink = [$bookLink, $linker]; 
                $('.card').append($bookCover, $bookTitle, $bookAuthor, $bookYear, $bookCountry, $bookLanguage , $bookPages, wikiLink);
            $('#loadSym2').hide();
        }); 
    });
    }); 
});
function searchMovie(){
    $('#movie-list').html('');
    $.ajax({
        url: 'http://www.omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'f3cf23ee',
            's' : $('#search-input').val()
        },
        success: function(result){
            if(result.Response == "True"){
                let movies = result.Search;
                $.each(movies, function(i, data){
                    $('#movie-list').append(`
                        <div class="col-md-3 mb-3">
                            <div class="card">
                                <img src="` + data.Poster + `" class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title">` + data.Title + `</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">` + data.Year + `</h6>
                                    <a href="#" class="card-link view-detail" data-bs-toggle="modal" data-bs-target="#viewModal" data-id="` + data.imdbID + `">View More</a>
                                </div>
                            </div>
                        </div>
                    `)
                });
                $('#search-input').val('');
            }else{
                $('#movie-list').html(`<h3 class="text-center">` + result.Error + `</h3>`);
            }
        }
    });
}

$('#btn-search').on('click', function(){
    searchMovie();
});

$('#search-input').on('keyup', function(e){
    if(e.keyCode == 13){
        searchMovie();
    }
});


$('#movie-list').on('click','.view-detail', function(){
    $.ajax({
        url: 'http://www.omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'f3cf23ee',
            'i' : $(this).data('id')
        },
        success: function(movie){
            if(movie.Response == "True"){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster +`" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Year : `+ movie.Year +`</li>
                                    <li class="list-group-item">Released : `+ movie.Released +`</li>
                                    <li class="list-group-item">Runtime : `+ movie.Runtime +`</li>
                                    <li class="list-group-item">Genre : `+ movie.Genre +`</li>
                                    <li class="list-group-item">Director : `+ movie.Director +`</li>
                                    <li class="list-group-item">Writer : `+ movie.Writer +`</li>
                                    <li class="list-group-item">Actors : `+ movie.Actors +`</li>
                                    <li class="list-group-item">Plot : `+ movie.Plot +`</li>
                                    <li class="list-group-item">Language : `+ movie.Language +`</li>
                                    <li class="list-group-item">Country : `+ movie.Country +`</li>
                                    <li class="list-group-item">Awards : `+ movie.Awards +`</li>
                                    <li class="list-group-item">Metascore : `+ movie.Metascore +`</li>
                                    <li class="list-group-item">Rating : `+ movie.imdbRating +`</li>
                                    <li class="list-group-item">Type : `+ movie.Type +`</li>
                                </ul>
                            </div>
                        </div>
                    </div>    
                `);
                $('#viewModalLabel').html(movie.Title);
            }
        }
    })
})
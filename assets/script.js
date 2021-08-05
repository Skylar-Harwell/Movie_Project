const movieInfoArea = document.querySelector("#movieInfoArea");
const infoTitle = document.querySelector("#infoTitle");
const movieInfo = document.querySelector("#movieInfo");
const moviePoster = document.querySelector("#moviePoster");
const actorList = document.querySelector("#actorList");
const directorList = document.querySelector("#directorList");
const search = document.querySelector("#search");
var movieName = document.querySelector("#movieName");
var submitBtn = document.querySelector("#submitBtn");
const actorNames = document.querySelector("#actorNames");

submitBtn.addEventListener('click', function() {
  getMovieSearch(movieName.value);
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    // var instances = M.Sidenav.init(elems, options);
  });

var getMovieSearch = function (movieName) { 
//.....Declaired Global Variable.....\\
var keyOMDB="ea8bbe23";
var searchUrl = "http://www.omdbapi.com/?t="+movieName+"&apikey="+keyOMDB;
// var titleSearch='Superman';

// .....OMDB Info....
// url is http://www.omdbapi.com/?t=[searchParam]&?apikey=[yourkey]&
fetch(searchUrl)
    .then(function(response){
        if(response.status != 200){
            console.log("nope")
        };
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });
  };

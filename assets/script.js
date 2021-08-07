
var movieInfoArea = document.querySelector("#movieInfoArea");
var infoTitle = document.querySelector("#infoTitle");
var movieInfo = document.querySelector("#movieInfo");
var moviePoster = document.querySelector("#moviePoster");
var actorList = document.querySelector("#actorList");
var directorList = document.querySelector("#directorList");
var search = document.querySelector("#search");
var movieName = document.querySelector("#movieName");
var submitBtn = document.querySelector("#submitBtn");
var searchMovie = document.querySelector('.searchMovie');
var actorBtn = document.querySelector(".actorBtn");
var actorNames = document.querySelector("#actorNames");
var writerList= document.querySelector("#writerList");
var releaseDate= document.querySelector("#releaseDate");
var movieGenres= document.querySelector("#movieGenres");
var movieRatings= document.querySelector("#movieRatings");


submitBtn.addEventListener('click', function() {
  clearPrevMovInfo();
  // clearPrevActorBtn();
  getMovieSearch(movieName.value);
});

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems, options);
//   });

var getMovieSearch = function (movieName) { 
//.....Declaired Global Variable.....\\
var keyOMDB="ea8bbe23";
const searchUrl = "http://www.omdbapi.com/?t="+movieName+"&plot=full&apikey="+keyOMDB;
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
        getMovieInfo(data);
        addActorBtn(data);
    });
  };

var getMovieName = function () {
  getMovieSearch($(this)[0].innerHTML);
  console.log($(this)[0].innerHTML);
}

var getMovieInfo = function(data) {
  console.log(data);
  var title = data.Title;
  var actors = data.Actors;
  var director = data.Director;
  var imgSrc = data.Poster;
  var plot = data.Plot;
  var writer = data.Writer;
  var release = data.Released;
  var rating = data.Rated;
  var genre = data.Genre;
  
  movieInfoArea.classList.remove("hide");
  moviePoster.src = imgSrc;

  var actorField = document.createElement('li');
  actorField.classList = "center-align"
  var directorField = document.createElement('li');
  directorField.classList = "center-align";
  var writerField = document.createElement('li');
  writerField.classList = "center-align";
  var releaseField = document.createElement('li');
  releaseField.classList = "center-align";
  var genreField = document.createElement('li');
  genreField.classList = "center-align";
  var ratingField = document.createElement('li');
  ratingField.classList = "center-align";

  infoTitle.innerHTML = title;
  movieInfo.innerHTML = plot;
  actorField.innerHTML = actors;
  directorField.innerHTML = director;
  writerField.innerHTML = writer;
  releaseField.innerHTML = release;
  ratingField.innerHTML = rating;
  genreField.innerHTML = genre;
  
  actorList.appendChild(actorField);
  directorList.appendChild(directorField);
  writerList.appendChild(writerField);
  releaseDate.appendChild(releaseField);
  movieRatings.appendChild(ratingField);
  movieGenres.appendChild(genreField);
}

var clearPrevMovInfo = function () {
  $('#actorList').empty();
  $('#directorList').empty();
  $('#writerList').empty();
  $('#releaseDate').empty();
  $('#movieGenres').empty();
  $('#movieRatings').empty();
  $('.actorBtn').empty();
}

var addActorBtn = function(data) {
  console.log(data);
  var actorNameBtn = data.Actors;
  var button = document.createElement('button');
  button.innerHTML = actorNameBtn;
  button.classList.add('waves-effect', 'waves-light', 'btn', 'actorNames')
  actorBtn.appendChild(button);
}

// var clearPrevActorBtn = function () {
//   $('#actorBtn').empty();
// }

// .....Wikipedia call for more information about the actor.....\\

function wikiPull(data){
  url="https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=";
  
  fetch(url)
    .then(function(response){
      if(response.status !== 200){
        console.log("Wikinope")
      }
      return response.json();
    })
    .then(function(data){
      bar= Object.values(data.query.pages);
      console.log(bar[0].extract)
    });
};


var movieInfoArea = document.querySelector("#movieInfoArea");
var infoTitle = document.querySelector("#infoTitle");
var movieInfo = document.querySelector("#movieInfo");
var moviePoster = document.querySelector("#moviePoster");
var actorList = document.querySelector("#actorList");
var directorList = document.querySelector("#directorList");
var search = document.querySelector("#search");
var movieName = document.querySelector("#movieName");
var submitBtn = document.querySelector("#submitBtn");
var actorNames = document.querySelector("#actorNames");

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
  console.log(data.Title);

  // var titleLine = document.createElement('h2');
  // titleLine.classList = "col s12"
  var actorField = document.createElement('li');
  actorField.classList = "center-align"
  var directorField = document.createElement('li');
  directorField.classList = "center-align";

  infoTitle.innerText = title;
  actorField.innerText = actors;
  directorField.innerText = director;

  // movieInfoArea.appendChild(titleLine);
  actorList.appendChild(actorField);
  directorList.appendChild(directorField);
}

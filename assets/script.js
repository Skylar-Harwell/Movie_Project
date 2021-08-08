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
var imagePlaceholder = document.querySelector(".imageplaceholder")
var stream = document.querySelector("#stream");
var streamBox = document.querySelector('#streamBox');

searchMovie.style.display = "none";

submitBtn.addEventListener('click', function() {
  imagePlaceholder.classList.add("hide"); 
  searchMovie.style.display = "block";
  clearPrevMovInfo();
  getMovieSearch(movieName.value);
  wikiPull();
});



document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    // var instances = M.Sidenav.init(elems, options);
});

var getMovieSearch = function (movieName) { 
//.....Declaired Local Variable.....\\
var keyOMDB="ea8bbe23";
const searchUrl = "http://www.omdbapi.com/?t="+movieName+"&plot=full&apikey="+keyOMDB;

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
        getStreamLocation(data);
    });
  };

var getMovieName = function () {
  getMovieSearch($(this)[0].innerHTML);
  console.log($(this)[0].innerHTML);
};

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
};

var clearPrevMovInfo = function () {
  $('#actorList').empty();
  $('#directorList').empty();
  $('#writerList').empty();
  $('#releaseDate').empty();
  $('#movieGenres').empty();
  $('#movieRatings').empty();
  $('.actorBtn').empty();
};

var addActorBtn = function(data) {
  var name = data.Actors;
  var myNames = name.split(",");
  console.log(myNames);

  for (var i = 0; i < myNames.length; i++) {
    var button = document.createElement('button');
    button.innerHTML = myNames[i];
    button.classList.add('waves-effect', 'waves-light', 'btn', 'actorNames')
    actorBtn.appendChild(button);
  }

  var actorBtnArr= document.querySelectorAll(".actorNames");
  actorBtnArr.forEach(function(actorbtn,i){
    actorbtn.addEventListener("click",function(){
      var actorClick= this.innerText;
      wikiPull(actorClick);
    });
    
  }); 

};

var getStreamLocation = function(data){
  var imdbTag = data.imdbID;
  var token = config.key;
  var key = config.host;
  
  fetch("https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=" + imdbTag + "&source=imdb&country=us", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": token,
		"x-rapidapi-host": key
	}
})
.then(function (response) {
  if(response.ok) {
    response.json().then(function (data) {
      console.log(data.collection.locations[0]);
      console.log(data);
    var location = data.collection.locations;

    for (var i = 0; i < location.length; i++) {
      var streamDiv = document.createElement('div');
      var streamLocation = document.createElement('h5');
      var streamURL = document.createElement('p');
      var streamIcon = 'https://utellyassets7.imgix.net/locations_icons/utelly/black_new/iTunesIVAUS.png?w=92&auto=compress&app_version=c2fa9acc-ef2f-4ca0-a2ce-17f1d45b5093_1e1212w2021-08-07';

      streamBox.classList.remove("hide"); 

      streamDiv.classList = 'searchMovie';
      streamLocation.classList = 'text';
      streamLocation.innerText = location[i].display_name;
      console.log(location[i].display_name);
      streamURL.innerText = location[i].url;

      streamDiv.appendChild(streamLocation);
      streamDiv.appendChild(streamURL);
      stream.appendChild(streamDiv);
      streamBox.appendChild(stream);
    }

});
  } else {
      alert('Error: ' + response.statusText);
  }
})
.catch(err => {
	console.error(err);
});
}

function wikiPull(actorClick){
  actorClick= actorClick.toLowerCase();
  console.log(actorClick);
  url="https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=" + actorClick;
  var moreActorInfo= document.querySelector(".moreActorInfo");
  moreActorInfo.classList.remove("hide");
  fetch(url)
    .then(function(response){
      if(response.status !== 200){
        console.log("Wikinope")
      }
      return response.json();
    })
    .then(function(data){
      console.log(data);
      bar= Object.values(data.query.pages);
      console.log(bar);
      console.log(bar[0].extract)
      var wikiInfo= bar[0].ectract;
      if(bar[0].extract == undefined){
        wikiInfo= "No Information Avaliable At This Time";
      };
      console.log(wikiInfo);
      moreActorInfo.innerHTML="<p id='moreInfoP'class='col s10'>"+wikiInfo+"</p>";
    });


};
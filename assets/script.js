const movieInfoArea = document.querySelector(".movieInfoArea");
const infoTitle = document.querySelector(".infoTitle");
const movieInfo = document.querySelector(".movieInfo");
const moviePoster = document.querySelector(".moviePoster");
const actorList = document.querySelector(".actorList");
const directorList = document.querySelector(".actorList");
const search = document.querySelector(".search");
const movieName = document.querySelector(".movieName");
const submitBtn = document.querySelector(".buttons .submitBtn");
const actorNames = document.querySelector(".buttons .actorNames");


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    // var instances = M.Sidenav.init(elems, options);
  });


//.....Declaired Global Variable.....\\
var keyOMDB="ea8bbe23";
var titleSearch='Superman';

// .....OMDB Info....
// url is http://www.omdbapi.com/?t=[searchParam]&?apikey=[yourkey]&
fetch("http://www.omdbapi.com/?t="+titleSearch+"&apikey="+keyOMDB)
    .then(function(response){
        if(response.status != 200){
            console.log("nope")
        };
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });


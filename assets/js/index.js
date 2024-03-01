console.log(config.apikey);

let openSearch = document.querySelector(".open_search");
let header = document.querySelector(".header");

openSearch.addEventListener("click", function(){
    header.classList.toggle("active");
})
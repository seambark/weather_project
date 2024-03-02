const config = {
    apikey : `ddc973d36c3a537a40a8c855f6a1089d`
  }

let openSearch = document.querySelector(".open_search");
let header = document.querySelector(".header");

openSearch.addEventListener("click", function(){
    header.classList.toggle("active");
})
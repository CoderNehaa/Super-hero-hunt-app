let searchBar = document.getElementById("searchBox");
let searchResults = document.getElementById('searchResults');
      
// Searching will call this event
searchBar.addEventListener('keyup',getSearchedSuperHeroes);

function getSearchedSuperHeroes(){
    // If user has not enter any value
    if(searchBar.value === ''){
        searchResults.innerHTML = `
        <h1> Type superhero name ... </h1>
        `;  
        return;
    }

    searchResults.innerHTML = `
    <h1> Loading search results ... </h1>
    `;

    let text = searchBar.value;
    
    // Fetching the API
    fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${text}&ts=1686287036545&apikey=133a24b644530c3d2bc23467045c31d7&hash=8013a081e281705799ddf6fab2ecaa32`)
    .then((res) => {
        return res.json()
    }).then((data) => {
        showSearchedResults(data.data.results)
        // This results is array of 20 elements containing info of heroes which name start with above text.
    }) 
};

// Displays search results
function showSearchedResults(searchedHero) {
    
    if(searchedHero.length === 0){
        searchResults.innerHTML = `
    <h1> OOps ! There is no superhero which name starts with this word. </h1>
    `;    
    return;
    }

    // if hero id is available in local storage favheroIDs array, 
    // We will show button of removing from favorites, else add to favorites.  
    let favheroIDs = localStorage.getItem("favheroIDs");
    console.log(favheroIDs);
    if(favheroIDs === null){
        favheroIDs = new Map();     
    } else if(favheroIDs != null){
        favheroIDs = new Map(JSON.parse(localStorage.getItem("favheroIDs")));
    }

    searchResults.innerHTML = ``;
    for (const key in searchedHero) {   
        let hero = searchedHero[key];
        
        // Showing every element in DOM. 
        searchResults.innerHTML += `
        <div id="singlResult" class="flex-center z-i-2">  
            <img src= "${hero.thumbnail.path+'/portrait_medium.' + hero.thumbnail.extension}"/>  
            <a class="hero-info" href="./hero-info.html"> 
                <div> ${hero.name} </div>
            </a>

            <div>
                <button class="add-btn">${favheroIDs.has(`${hero.id}`) ? "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favourites" :"<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add to Favourites</button>"}
            </div>
        
            <div style="display:none;">
                <span>${hero.name}</span>
                <span>${hero.description}</span>
                <span>${hero.comics.available}</span>
                <span>${hero.series.available}</span>
                <span>${hero.stories.available}</span>
                <span>${hero.thumbnail.path+'/portrait_uncanny.' + hero.thumbnail.extension}</span>
                <span>${hero.id}</span>
                <span>${hero.thumbnail.path+'/landscape_incredible.' + hero.thumbnail.extension}</span>
                <span>${hero.thumbnail.path+'/standard_fantastic.' + hero.thumbnail.extension}</span>
            </div>
        </div>
        `;
        let favouriteBtn = document.querySelectorAll(".add-btn");
        favouriteBtn.forEach((btn) => btn.addEventListener("click", addOrRemoveFav));

        let heroInfo = document.querySelectorAll("a.hero-info");
        heroInfo.forEach((hero) => hero.addEventListener("click", addHeroInStorage));        
    }
}


function addOrRemoveFav() {
    if (this.innerHTML == '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites') {
        
        let favouritesArray = localStorage.getItem("favHeroes");
        // This array have all the details of favorite heroes 
        if (favouritesArray == null) {
            favouritesArray = [];
        } else {
            favouritesArray = JSON.parse(localStorage.getItem("favHeroes"));
        }

        let favheroIDs = localStorage.getItem("favheroIDs");
        // This array have only IDs of favorite heroes
        if (favheroIDs == null) {
            favheroIDs = new Map();
        } else {
            favheroIDs = new Map(JSON.parse(localStorage.getItem("favheroIDs")));
        }

        let heroInfo = {
            name:this.parentElement.parentElement.children[1].children[0].innerHTML,
            description: this.parentElement.parentElement.children[3].children[1].innerHTML,
            comics:this.parentElement.parentElement.children[3].children[2].innerHTML,
            series:this.parentElement.parentElement.children[3].children[3].innerHTML,
            stories: this.parentElement.parentElement.children[3].children[4].innerHTML,
            portraitImage: this.parentElement.parentElement.children[3].children[5].innerHTML,
            id: this.parentElement.parentElement.children[3].children[6].innerHTML,
            landscapeImage: this.parentElement.parentElement.children[3].children[7].innerHTML,
            squareImage: this.parentElement.parentElement.children[3].children[8].innerHTML
        }

        favheroIDs.set(heroInfo.id, true);
        favouritesArray.push(heroInfo);
        localStorage.setItem("favheroIDs", JSON.stringify([...favheroIDs]));
        localStorage.setItem("favHeroes", JSON.stringify(favouritesArray));

         // Convering the "Add" button to "Remove"
         this.innerHTML = '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites';

    } else {
        let toBeRemovedId = this.parentElement.parentElement.children[3].children[6].innerHTML;
        
        let favouritesArray = JSON.parse(localStorage.getItem("favHeroes"));
        let favheroIDs = new Map(JSON.parse(localStorage.getItem("favheroIDs")));
        
        let newFavouritesArray = [];

        // Filter hero
        favheroIDs.delete(`${toBeRemovedId}`);
        favouritesArray.forEach((favourite) => {
            if(toBeRemovedId != favourite.id){
                newFavouritesArray.push(favourite);
            }
        });

        localStorage.setItem("favHeroes",JSON.stringify(newFavouritesArray));
        localStorage.setItem("favheroIDs", JSON.stringify([...favheroIDs]));
        
        this.innerHTML = '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites';          
    }
}

function addHeroInStorage(){
    let heroInfo = {
        name:this.parentElement.children[1].children[0].innerHTML,
        description: this.parentElement.children[3].children[1].innerHTML,
        comics:this.parentElement.children[3].children[2].innerHTML,
        series:this.parentElement.children[3].children[3].innerHTML,
        stories: this.parentElement.children[3].children[4].innerHTML,
        portraitImage: this.parentElement.children[3].children[5].innerHTML,
        id: this.parentElement.children[3].children[6].innerHTML,
        landscapeImage: this.parentElement.children[3].children[7].innerHTML,
        squareImage: this.parentElement.children[3].children[8].innerHTML
    }
    localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}

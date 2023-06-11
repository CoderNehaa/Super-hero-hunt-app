// Getting element from HTML
let favHeroesList = document.getElementById('fav-heroes-list');

// Getting array containing favorite heroes information from local storage 
let favouritesArray = JSON.parse(localStorage.getItem("favHeroes"));
let favheroIDs = new Map(JSON.parse(localStorage.getItem("favheroIDs")));
console.log(favouritesArray);

// If array is empty, there are no favorite superheroes in local storage.
if(favouritesArray.length === 0){
    favHeroesList.innerHTML += `
        <h1> There are no superheroes in your favorite list. </h1> 
    `;
}
console.log(favouritesArray);

// Iterating over favorite heroes array.
for(const key in favouritesArray){
    let hero = favouritesArray[key];

    favHeroesList.innerHTML += `
    <div id="singlResult" class="z-i-2">   
        <div class="hero-info"> 
            <img src="${hero.portraitImage}"/>
            <div> ${hero.name} </div>
        </div>

        <div>
            <button class="remove-btn"><i class=\"fa-solid fa-heart-circle-minus\"></i> Remove from Favourites</button>
        </div>
        <div style="display:none;">
                <span>${hero.name}</span>
                <span>${hero.description}</span>
                <span>${hero.comics.available}</span>
                <span>${hero.series.available}</span>
                <span>${hero.stories.available}</span>
                <span>${hero.id}</span>
        </div>
    </div>
`;
    // Handling remove button event to remove it from favorite list.
    let removeBtn = document.querySelectorAll(".remove-btn");
    removeBtn.forEach((btn) => btn.addEventListener("click", removeFav));

}

function removeFav(){
    let toBeRemovedId = this.parentElement.parentElement.children[2].children[5].innerHTML;

    // Getting data from local storage.
    let favouritesArray = JSON.parse(localStorage.getItem("favHeroes"));
    let favheroIDs = new Map(JSON.parse(localStorage.getItem("favheroIDs")));


    // Deleting hero from both the arrays
    favheroIDs.delete(`${toBeRemovedId}`);        
    let newFavouritesArray = [];
    favouritesArray.forEach((favourite) => {
        if(toBeRemovedId != favourite.id){
            newFavouritesArray.push(favourite);
        }
    });

    // Setting new array to local storage
    localStorage.setItem("favHeroes",JSON.stringify(newFavouritesArray));
    localStorage.setItem("favheroIDs", JSON.stringify([...favheroIDs]));   
    
    // Deleting hero from parent element
    this.parentElement.parentElement.remove();
    
    if(newFavouritesArray.length === 0){
        favHeroesList.innerHTML += `
            <h1> There are no superheroes in your favorite list. </h1>
        `;            
    }
}

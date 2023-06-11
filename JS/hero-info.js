let pageName = document.getElementById("pageTitle");

// getting the heroInfo object which was stored when the user clicked on more info
  let hero = JSON.parse(localStorage.getItem("heroInfo"));
  pageName.innerHTML = hero.name;  
  // getting the favouritesCharacterIDs for displaying the appropriate button accoring to the existence of character in favourites
  let favheroIDs = localStorage.getItem("favheroIDs");
  if (favheroIDs == null) {
    favheroIDs = new Map();
  } else if(favheroIDs != null){
    favheroIDs = new Map(JSON.parse(localStorage.getItem("favheroIDs")));
  }
  
  let infoDisplay = document.getElementById('info-container');
  infoDisplay.innerHTML = `
    <h2> ${hero.name} </h2>
        
    <div id="info">
      <div id="imgANDdetails">
        <img id="landscapeImage" src="${hero.landscapeImage}" class="flex-center">
        \      
        <div id="details">
            <span> Id : ${hero.id}</span>
            <span> Comics : ${hero.comics}</span>
            <span> Series : ${hero.series}</span>
            <span> Stories : ${hero.stories}</span>
        </div>
      </div>

      <div id="description">
          <span> Description : ${hero.description===''? "No description available." : hero.description} </span>
          <span style="display:none;">${hero.portraitImage} </span>
          <span style="display:none;">${hero.squareImage} </span>
          <span style="display:none;">${hero.landscapeImage} </span>
      </div>
    </div>

    <div id="btn-style" class="flex-center">
      <button class="add-btn">${favheroIDs.has(`${hero.id}`) ? "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favourites" :"<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add to Favourites</button>"}
    </div>
  `;

  let favouriteBtn = document.querySelectorAll(".add-btn");
  favouriteBtn.forEach((btn) => btn.addEventListener("click", addOrRemoveFav));

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
        name:this.parentElement.parentElement.children[0].innerHTML,
        description:this.parentElement.parentElement.children[1].children[1].children[0].innerHTML,
        comics:this.parentElement.parentElement.children[1].children[0].children[1].children[1].innerHTML,
        series:this.parentElement.parentElement.children[1].children[0].children[1].children[2].innerHTML,
        stories: this.parentElement.parentElement.children[1].children[0].children[1].children[3].innerHTML,
        portraitImage: this.parentElement.parentElement.children[1].children[1].children[1].innerHTML,
        id: this.parentElement.parentElement.children[1].children[0].children[1].children[0].innerHTML,
        landscapeImage: this.parentElement.parentElement.children[1].children[1].children[3].innerHTML,
        squareImage: this.parentElement.parentElement.children[1].children[1].children[2].innerHTML
      }

      favheroIDs.set(heroInfo.id, true);
      favouritesArray.push(heroInfo);      
      localStorage.setItem("favheroIDs", JSON.stringify([...favheroIDs]));
      localStorage.setItem("favHeroes", JSON.stringify(favouritesArray));
   
      // Convering the "Add" button to "Remove"
     this.innerHTML = '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites';

  } else {
      let toBeRemovedId = this.parentElement.parentElement.children[1].children[0].children[1].children[0].innerHTML;
      
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

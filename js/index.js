let searchBtn = document.querySelector("#search-btn");
let countryInp = document.querySelector("#country-inp");
let resultDom = document.querySelector("#result");


searchBtn.addEventListener("click",async ()=>{
    let countryName = countryInp.value;
    
    if(countryName.length == 0){
        resultDom.innerHTML= `<h3>The input field cannot be empty</h3> `;
        return;
    }


    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true
    `;

    try{

        showLoader();

        const response = await fetch(finalURL, {
            method: 'GET'
        });

        if (!response.ok) {
            hideLoader();
            const message = `<h3>Please enter a valid name. <br>An error has occured: <span style="color:black;"> ${response.status} </span> </h3>`;
            resultDom.innerHTML = (message);
            return;
        }

        const country = await response.json();
        hideLoader();

/*
        console.log(country[0]);
        console.log(country[0].capital[0]);
        console.log(country[0].flags.svg);
        console.log(country[0].name.common);
        console.log(country[0].continents[0]);
        //get name of Key that inside the object
        // console.log(Object.keys(country[0].currencies));

        console.log(country[0].currencies[Object.keys(country[0].currencies)].name)
        console.log(Object.values(country[0].languages).toString().split(",").join(" ,"));
*/
        resultDom.innerHTML = `
        <img src="${country[0].flags.svg}" class="flag-img">
        <h2>${country[0].name.common}</h2>
        <div class="wrapper">
        <div class="data-wrapper">
        <h4>Capital: </h4>
        <span>${country[0].capital}</span>
        </div>
        </div>

        <div class="wrapper">
        <div class="data-wrapper">
        <h4>Continent: </h4>
        <span>${country[0].continents[0]}</span>
        </div>
        </div>

        <div class="wrapper">
        <div class="data-wrapper">
        <h4>Population: </h4>
        <span>${country[0].population}</span>
        </div>
        </div>

        <div class="wrapper">
        <div class="data-wrapper">
        <h4>Currency: </h4>
        <span>${country[0].currencies[Object.keys(country[0].currencies)].name}
        - ${Object.keys(country[0].currencies)}</span>
        </div>
        </div>

        <div class="wrapper">
        <div class="data-wrapper">
        <h4>Common Languages: </h4>
        <span>${Object.values(country[0].languages).toString()
            .split(",")
            .join(" ,")}</span>
        </div>
        </div>
        `;
    }
        catch(err){
            resultDom.innerHTML = (`<h3>Error : ${err} <br>net::ERR_INTERNET_DISCONNECTED </h3>`); 
        }
})

//____________________________________________________________

function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
  }
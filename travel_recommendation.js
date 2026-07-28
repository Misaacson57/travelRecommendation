const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const homePage = document.getElementById("homePage");
const searchResults = document.getElementById("searchResults");

function searchCondition(){
    const input = document.getElementById('destinationInput')
    .value
    .toLowerCase()
    .trim();


    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {

            const country = data.countries.find(item => item.name.toLowerCase() === input);
            const temple = data.temples.find(item => item.name.toLowerCase() === input);
            const beach = data.beaches.find(item => item.name.toLowerCase() === input);
            if (input === "beach" || input === "beaches") {
                data.beaches.forEach(beach => {
                    resultDiv.innerHTML += `
                        <div class="result-card">
                            <img src="${beach.imageUrl}" alt="${beach.name}">
            
                            <div class="result-card-content">
                                <h2>${beach.name}</h2>
                                <p>${beach.description}</p>
                            </div>
                        </div>
                    `;
                });
            
                homePage.hidden = true;
                searchResults.hidden = false;
            
            } else if (input === "temple" || input === "temples") {
                data.temples.forEach(temple => {
                    resultDiv.innerHTML += `
                        <div class="result-card">
                            <img src="${temple.imageUrl}" alt="${temple.name}">
            
                            <div class="result-card-content">
                                <h2>${temple.name}</h2>
                                <p>${temple.description}</p>
                            </div>
                        </div>
                    `;
                });
            
                homePage.hidden = true;
                searchResults.hidden = false;
            
            } else if (input === "country" || input === "countries") {
                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        resultDiv.innerHTML += `
                            <div class="result-card">
                                <img src="${city.imageUrl}" alt="${city.name}">
            
                                <div class="result-card-content">
                                    <h2>${city.name}</h2>
                                    <p>${city.description}</p>
                                </div>
                            </div>
                        `;
                    });
                });
            
                homePage.hidden = true;
                searchResults.hidden = false;
            
            } else if (country) {
                country.cities.forEach(city => {
                    resultDiv.innerHTML += `
                        <div class="result-card">
                            <img src="${city.imageUrl}" alt="${city.name}">
            
                            <div class="result-card-content">
                                <h2>${city.name}</h2>
                                <p>${city.description}</p>
                            </div>
                        </div>
                    `;
                });
            
                homePage.hidden = true;
                searchResults.hidden = false;
            
            } else if (temple) {
                resultDiv.innerHTML += `
                    <div class="result-card">
                        <img src="${temple.imageUrl}" alt="${temple.name}">
            
                        <div class="result-card-content">
                            <h2>${temple.name}</h2>
                            <p>${temple.description}</p>
                        </div>
                    </div>
                `;
            
                homePage.hidden = true;
                searchResults.hidden = false;
            
            } else if (beach) {
                resultDiv.innerHTML += `
                    <div class="result-card">
                        <img src="${beach.imageUrl}" alt="${beach.name}">
            
                        <div class="result-card-content">
                            <h2>${beach.name}</h2>
                            <p>${beach.description}</p>
                        </div>
                    </div>
                `;
            
                homePage.hidden = true;
                searchResults.hidden = false;
            
            } else {
                resultDiv.innerHTML = `
                    <div class="result-card">
                        <div class="result-card-content">
                            <h2>Recommendation Not Found</h2>
                            <p>Try searching for beach, temple, country, or a specific destination.</p>
                        </div>
                    </div>
                `;
            
                homePage.hidden = true;
                searchResults.hidden = false;
            }
        })
        .catch(error => {
            console.error('Error: ', error);
            resultDiv.innerHTML = 'An error occured while fetching data';
            homePage.hidden = false;
            searchResults.hidden = true;
        });
}

btnSearch.addEventListener('click', searchCondition);

btnReset.addEventListener('click', function(){
    document.getElementById('destinationInput').value="";
    document.getElementById('result').innerHTML = "";
    homePage.hidden = false;
    searchResults.hidden = true;
});
const beerResultsDiv = document.querySelector('.beer-results-container');

const abvAllButton = document.getElementById('abv-all');
const allAbvLevels = document.querySelectorAll('.abv');

const ibuAllButton = document.getElementById('ibu-all');
const allIbuLevels = document.querySelectorAll('.ibu');

const prevButton = document.getElementById('prev-page');
const nextButton = document.getElementById('next-page');

const abv1 = document.getElementById('abv-1');
const abv2 = document.getElementById('abv-2');
const abv3 = document.getElementById('abv-3');

const ibu1 = document.getElementById('ibu-1');
const ibu2 = document.getElementById('ibu-2');
const ibu3 = document.getElementById('ibu-3');

//Page # Span Tag
const pageNumber = document.getElementById('page');

//Helper Variables for currentABVLevelParams and currentIBULevelParams
let currentAbvLevel = ""
let currentIbuLevel = ""
let page = 1;

const urlBase = "https://api.punkapi.com/v2/beers?";

//Object for parameters
const levels = {
    smAbv: '&abv_lt=4.6',
    mdAbv: '&abv_gt=4.5&abv_lt=7.6',
    lgAbv: '&abv_gt=7.5',
    smIbu: '&ibu_lt=35',
    mdIbu: '&ibu_gt=34&ibu_lt=75',
    lgIbu: '&ibu_gt=74'
}

//ABV LEVELS CHECK & UNCHECK
allAbvLevels.forEach( level => {
    level.addEventListener('click', (e) => {
        const target = e.target.closest('img');
        const active = document.querySelector('.active-abv');   

        if(active) {
            active.classList.remove('active-abv')
        }
        target.classList.add('active-abv')

        if(abvAllButton.classList.contains('active')){
            abvAllButton.classList.remove('active')
        }
    })
})

//IBU LEVELS CHECK & UNCHECK
allIbuLevels.forEach( level => {
    level.addEventListener('click', (e) => {
        const target = e.target.closest('img');
        const active = document.querySelector('.active-ibu')

        if(active) {
            active.classList.remove('active-ibu')
        }
        target.classList.add('active-ibu')

        if(ibuAllButton.classList.contains('active')){
            ibuAllButton.classList.remove('active')
        }
    })
})

const getBeers = async(url) => {
    const fetchBeers = await fetch(url);

    if(fetchBeers.ok) {
        try {
            const beerResults = await fetchBeers.json()
            // console.log(beerResults)

            //If beer results array's length is strictly 0, do this: 
            if(beerResults.length === 0) {
                beerResultsDiv.innerHTML = `
                <h1>Sorry, no more results! </h1>
                `
                nextButton.disabled = true;
            }

            beerResults.forEach( result => {
                const beerName = result.name
                const description = result.description
                const abvLevel = result.abv
                const ibuLevel = result.ibu
                const foodPairing = result.food_pairing
                const imgURL = result.image_url
                const placeHolderImg = './assets/images/no-image.png'

                beerResultsDiv.innerHTML += `
                <div class="beer-card">
                <div class="card-front">
                    <img src="${imgURL || placeHolderImg}" alt='not found' class="beer-image">
                    <h3 class="beer-name">${beerName}</h3>
                    <div class="alcohol-content">
                        <h3>ABV: <span id="abv-level">${abvLevel}</span></h3>
                        <h3>IBU: <span id="ibu-level">${ibuLevel}</span></h3>
                    </div>
                </div>
                <div class="card-back">
                    <h3 class="beer-name">${beerName}</h3>
                    <p class="beer-description">${description}</p>
                    <p class="food-pairings">Pairs with: ${foodPairing}"</p>
                </div>
            </div>
                `
            })
        } catch {
            console.error(fetchBeers.status)
        }
    }
}
getBeers(urlBase + `page=${page}`);

const clearBeerResults = () => { beerResultsDiv.innerHTML = '' }

//Sm ABV Level
abv1.addEventListener('click', () => {
    clearBeerResults();
    page = 1;
    pageNumber.textContent = page;
    let currentPage = `page=` + page
    currentAbvLevel = levels.smAbv
    getBeers(urlBase + currentPage + currentAbvLevel)
    // console.log(urlBase + currentPage + currentAbvLevel)
})
//Md ABV Level
abv2.addEventListener('click', () => {
    clearBeerResults();
    page = 1;
    pageNumber.textContent = page;
    let currentPage = `page=` + page;
    currentAbvLevel = levels.mdAbv;
    getBeers(urlBase + currentPage + currentAbvLevel)
    // console.log(urlBase + currentPage + currentAbvLevel)
})
//Lg ABV Level
abv3.addEventListener('click', () => {
    clearBeerResults();
    page = 1;
    pageNumber.textContent = page;
    let currentPage = `page=` + page;
    currentAbvLevel = levels.lgAbv;
    getBeers(urlBase + currentPage + currentAbvLevel)
    // console.log(urlBase + currentPage + currentAbvLevel)
})
//ALL ABV Results Button 
abvAllButton.addEventListener('click', (e) => {
    e.preventDefault();
    clearBeerResults();
    page = 1;
    pageNumber.textContent = page;
    currentAbvLevel = ""
    currentIbuLevel = ""
    getBeers(urlBase + page + currentAbvLevel)
    // console.log(urlBase + page + currentAbvLevel)
    allAbvLevels.forEach( level => level.classList.remove('active-abv'))
})
//Sm IBU Level
ibu1.addEventListener('click', () => {
    clearBeerResults();
    page = 1;
    pageNumber.textContent = page;
    let currentPage = `page=` + page;
    currentIbuLevel = levels.smIbu;
    getBeers(urlBase + currentPage + currentIbuLevel);
    // console.log(urlBase + currentPage + currentIbuLevel);
})
//Md IBU Level
ibu2.addEventListener('click', () => {
    clearBeerResults();
    page = 1;
    pageNumber.textContent = page;
    let currentPage = `page=` + page;
    currentIbuLevel = levels.mdIbu;
    getBeers(urlBase + currentPage + currentIbuLevel);
    // console.log(urlBase + currentPage + currentIbuLevel);
})
//Lg IBU Level
ibu3.addEventListener('click', () => {
    clearBeerResults();
    page = 1;
    pageNumber.textContent = page;
    let currentPage = `page=` + page;
    currentIbuLevel = levels.lgIbu;
    getBeers(urlBase + currentPage + currentIbuLevel);
    // console.log(urlBase + currentPage + currentIbuLevel);
})
//ALL IBU Results Button
ibuAllButton.addEventListener('click', (e) => {
    e.preventDefault();
    clearBeerResults();
    page = 1;
    pageNumber.textContent = page;
    currentAbvLevel = ""
    currentAbvLevel = ""
    getBeers(urlBase + page + currentAbvLevel)
    // console.log(urlBase + page + currentAbvLevel)
    allIbuLevels.forEach( level => level.classList.remove('active-ibu'))
})
//Next Button Event 
nextButton.addEventListener('click', () => {
    page++
    pageNumber.textContent = page;
    clearBeerResults();
    getBeers(urlBase + `page=${page}` + currentAbvLevel)
    // console.log(urlBase + `page=${page}` + currentAbvLevel + currentIbuLevel)
    prevButton.disabled = false;
})
//Previous Button Event
prevButton.addEventListener('click', () => {
    page--
    pageNumber.textContent = page;
    clearBeerResults();
    nextButton.disabled = false;
    getBeers(urlBase + `page=${page}` + currentAbvLevel)
    // console.log(urlBase + `page=${page}` + currentAbvLevel + currentIbuLevel)
    if(parseInt(pageNumber.textContent) === 1) {
        prevButton.disabled = true;
    }
})
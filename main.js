let pokemons
let pokemon
let counter = 0
let generatingHTML = false;

function render() {
    renderUrls()
    setTimeout(loadCards, 4000)
}


async function renderUrls() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
    let response = await fetch(url)
    pokemons = await response.json()
}


async function loadCards() {
    if (generatingHTML) return;
    generatingHTML = true;
    let end = counter + 15;
    if (end > pokemons.results.length){
        end = pokemons.results.length
    }
    for (let i = counter; i < end; i++) {
        let url = pokemons.results[i]['url'];
        pokemon = await fetch(url);
        pokemon = await pokemon.json();
        document.getElementById('content').innerHTML += generateHTML(pokemon, "main-");
    }
    counter = end;
    generatingHTML = false;
}


function generateHTML(pokemon, idPrefix) {
    return ` 
    ${generateCardFront(pokemon, idPrefix)}
`
}


window.addEventListener('touchmove', function() {
    let windowHeight = window.innerHeight;
    let bodyHeight = document.body.offsetHeight;
    let contentDiv = document.getElementById('content');
    let scrollPosition = contentDiv.scrollTop;

    if (scrollPosition >= (bodyHeight - windowHeight + 500)) {
        loadCards();
    }
});


window.onscroll = function () {
    let windowHeight = window.innerHeight;
    let bodyHeight = document.body.offsetHeight;
    let scrollPosition = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

    if (scrollPosition >= (bodyHeight - windowHeight)) {
        loadCards();
    }
}


function flipCard(id) {
    let flipCard = document.getElementById(`${id}`);
    flipCard.classList.toggle('flipped');
}


async function search() {
    let content = document.getElementById('search');
    let search = document.getElementById('searchInput').value;
    search = search.toLowerCase()
    content.innerHTML = '';
    if (search.length > 0) {
        showSearch()
        for (let i = 0; i < pokemons.results.length; i++) {
            let url = pokemons.results[i]['url']
            let name = pokemons.results[i].name;
            if (name.startsWith(search)) {
                let searched = await fetch(url);
                searched = await searched.json();
                content.innerHTML += generateHTML(searched, "search-")
            }
        }
    }
    else{
        hideSearch()
    }
}


function showSearch(){
    document.getElementById('content').classList.add('d-none')
    document.getElementById('search').classList.remove('d-none')
}


function hideSearch(){
    document.getElementById('search').classList.add('d-none')
    document.getElementById('content').classList.remove('d-none')
}
function generateCardFront(pokemon, idPrefix) {
    let urlPicture = pokemon['sprites']['other']['official-artwork']['front_default']
    let name = pokemon.name
    let id = pokemon.id
    let types = pokemon['types']
    return ` 
    
            <div id="${idPrefix}${id}" class="flip-card"  onclick="flipCard('${idPrefix}${id}')">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <div class="cardTop ${types[0]['type']['name']}">
                            <div class="cardName">${name}
                            </div>
                            <div class="cardNumber"># ${id}
                            </div>
                        </div>
                        <div class=" card-body">
                            <img class="cardBG" src="./img/128px-Pokéball.png" alt="">
                            <img class="cardImg"
                                src="${urlPicture}"
                                alt="...">
                            <div class="cardTypes">
                            ${generateCardTypes(pokemon)}
                            </div>
                        </div>
                    </div>

                    <div class="flip-card-back">
                        <div class="cardTop ${types[0]['type']['name']}">
                            <div class="cardName">${name}</div>
                            <div class="cardNumber"># ${id}</div>
                           <div class="cardBackImages">
                           <img class="cardImgBack"
                                src="${urlPicture}"
                                alt="...">
                                <div class="typesBack">${generateCardTypes(pokemon)}</div>
                                </div>
                            <div class="card-body-back">
                            <table class="infoTable">
                            ${generateCardInfo(pokemon)}
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
    `
}

function generateCardTypes(pokemon) {
    let imgTags = '';
    for (let i = 0; i < pokemon.types.length; i++) {
        imgTags += `<img class="cardType" src="./img/${pokemon.types[i].type.name}.svg" alt="">`;
    }
    return imgTags;
}

function generateCardInfo(pokemon){
    let info=''
    info +=`
    <tr><td>weight:</td><td><b>${pokemon.weight}</b></td></tr>
    <tr><td>height:</td><td><b>${pokemon.height}</b></td></tr>
    </div>`
    for (let i = 0; i < pokemon.stats.length; i++) {
        const element = pokemon.stats[i];
        let progress = element.base_stat/2
        info += `<tr>
        <td>${element.stat.name}</td>
        <td><b>${element.base_stat}</b></td>
        <td><div class="progress-bar">
        <span class="progress-bar-fill" style="width: ${progress}%;"></span>
    </div></td>
        </tr>`
    }
    return info;
}
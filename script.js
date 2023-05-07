const container = document.querySelector('#digimonContainer');
const searchInput = document.getElementById('search-input');
const title = container.querySelector('.titulo');

let digimons = [];
const digimonCount = 10;

const fetchDigimons = async () => {
    for(let i = 0; i < digimonCount; i++) {
        await getDigimon(i);
    };
};

const getDigimon = async () => {
    const url = `https://digimon-api.vercel.app/api/digimon`;
    const res = await fetch(url);
    const data = await res.json();

    const newDigimons = data.map(digimon => {
        return {
            name: digimon.name,
            level: digimon.level,
            img: digimon.img
        };
    });
    digimons = digimons.concat(newDigimons)
    createCard(digimons);
};

const createCard = (digimons) => {
    const container = document.querySelector('#digimonContainer');
    digimons.forEach(digimon => {
        const digimonElement = document.createElement('div');
        digimonElement.classList.add('digimon');

        const name = digimon.name[0].toUpperCase() + digimon.name.slice(1);
        const digimonLevel = digimon.level;
        const digimonImgUrl = digimon.img;;


        const digimonInnerHtml = `
            <div class="imgContainer">
                <img src="${digimonImgUrl}" alt="${name}" style="width: 100px;">
            </div>
            <div class="info">
                <span class="numberId">Digimon</span>
                <h3 class="nome">${name}</h3>
                <small class="tipoLevel">Level: <span>${digimonLevel}</span></small>
            </div>
            `;
        // console.log(digimonImgUrl)
        digimonElement.innerHTML = digimonInnerHtml;
        container.appendChild(digimonElement);
        
    });
};

const search = () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredDigimons = digimons.filter(digimons  => digimons.name.toLowerCase().includes(searchValue));
    container.innerHTML = '';
    container.appendChild(title);
    createCard(filteredDigimons);
};

fetchDigimons();

searchInput.addEventListener("input", search);



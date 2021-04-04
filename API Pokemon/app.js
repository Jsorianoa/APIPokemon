const formulario = document.querySelector('#formulario');

const nombre = document.querySelector('#text');

const llamarAPI = async()=>{
    try {
        const nombrePoke = nombre.value.toLowerCase();
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePoke}`);
        const data = await res.json();
        console.log(data);
        const pokemon = {
            //img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            imgJuego: data.sprites.front_default,
            imgCvg: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            experiencia: data.base_experience,
            hp: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            especial: data.stats[3].base_stat,
          };
        generarPokemon(pokemon);
        nombre.value='';
    } catch (error) {
       console.log(error); 
    }

}


 const generarPokemon = (pokemon) => {
    

    const flex = document.querySelector("main");
    const template = document.querySelector("#template-card").content
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    clone.querySelector(".card-body-img").setAttribute("src", pokemon.imgCvg);
    clone.querySelector(".titulo").innerHTML = `${pokemon.nombre} <span>${pokemon.especial}</span>`;
    clone.querySelector(".card-footer").innerHTML = `
                                                    <span>${pokemon.hp} <i class="far fa-heart"></i></span> 
                                                    <span>${pokemon.ataque} <i class="fas fa-fist-raised"></i></span> 
                                                    <span>${pokemon.defensa} <i class="fas fa-shield-alt"></i></span>
                                                    `;
    fragment.appendChild(clone);
    flex.appendChild(fragment);

}

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    llamarAPI();   
})
/* document.addEventListener('submit', () => {
    
}) */
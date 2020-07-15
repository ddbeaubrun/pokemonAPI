const pokeLog = document.getElementById("pokeLog");
console.log(pokeLog);

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
    const baseUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push (fetch(baseUrl).then(res => res.json()));
};
    
    Promise.all(promises).then((results) => {
        const pokemon = results.map(( data ) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            types: data.types.map((type) => type.type.name).join(`, `)
        }));
        showPokemon(pokemon);
    });
   
};

const showPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTML = pokemon.map ((pokeGo) => `
    <p>
        <img src="${pokeGo.image}"/>
        <h2>${pokeGo.id}. ${pokeGo.name}</h2>
        <p> Type: ${pokeGo.type}</p>
    <p>
    `)
    .join('');
    pokeLog.innerHTML = pokemonHTML;
};

fetchPokemon();
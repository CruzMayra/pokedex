$.ajax({
    url: `https://pokeapi.co/api/v2/pokedex/1/`
}).done(getPokemonId);

function getPokemonId(data) {
  let pokemonCollection = data.pokemon_entries;
  let method = pokemonCollection.forEach(item =>{
    let pokemonId = item.entry_number;
    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    }).done(getPokemonData);
  })
}

function getPokemonData(data){
  console.log(JSON.stringify(data));
}

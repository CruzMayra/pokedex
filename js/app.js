if(!localStorage.getItem('data')) {
  $.post({
    url: 'https://graphql-pokemon.now.sh/',
    data: JSON.stringify({ "query": " { pokemons(first: 151) { id name image height { maximum } weight { maximum } classification types resistant weaknesses } } " }),
    contentType: 'application/json'
  }).done(function(response) {
    let pokemonsData = ('Fetched Pokemons:', response.data.pokemons);
    localStorage.setItem('data', JSON.stringify(pokemonsData));
  });
} else {
  getPokemonsData(localStorage.getItem('data'))
}

function getPokemonsData(data) {
  let pokemonsData = JSON.parse(data)
  .forEach(pokemon => {
    paintPokemonCard(pokemon);
  })
}

function paintPokemonCard(pokemon){
  // $('#pokemons-container').empty();
  let card = '';
  card +=
  `<section class="col-lg-3 pokemon-card">
    <div class="card">
      <img class="card-img-top img-fluid" src="${pokemon.image}" alt="pokemon-${pokemon.name}">
      <div class="card-body">
        <h4 class="text-center" data-id="${pokemon.id}">${pokemon.name}</h4>
      </div>
    </div>
  </section>`

  $('#pokemons-container').append(card)
}

const $filterInput = $('.filtered-pokemon');

$filterInput.keyup(filterPokemons);

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
  let card = '';
  card +=
  `<section class="col-lg-3 col-sm-3 pokemon-card">
    <div class="card">
      <img class="card-img-top img-fluid" src="${pokemon.image}" alt="pokemon-${pokemon.name}">
      <div class="card-body">
        <h5 class="text-center" data-id="${pokemon.id}">${pokemon.name}</h5>
      </div>
    </div>
  </section>`

  $('#pokemons-container').append(card)
}

function filterPokemons(){
  let searchPokemon = $filterInput.val().toLowerCase();
  $('#pokemons-container').empty();
  if($filterInput.val().trim().length > 0){
    var filteredPokemons = JSON.parse(localStorage.getItem('data')).filter( pokemon => {
      let nameMatch = pokemon.name.toLowerCase().indexOf(searchPokemon) >=0
      return nameMatch
    }).forEach(pokemon => {
      paintPokemonCard(pokemon)
    })
    $('#pokemons-container:empty').html('<p class="h1">Lo sentimos, no encontramos coincidencias <i class="fa fa-frown-o" aria-hidden="true"></i></p>');
  } else {
    $('#pokemons-container').empty();
    JSON.parse(localStorage.getItem('data')).forEach(pokemon => {
      paintPokemonCard(pokemon)
    })
  }
}

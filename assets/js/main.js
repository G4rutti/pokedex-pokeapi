const pokemonName = document.querySelector('.pokemon__name')
const pokemonImage = document.querySelector('.pokemon__image')
const pokemonNumber = document.querySelector('.pokemon__number')
const input = document.querySelector('.input__search')

const form = document.querySelector('.form')
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
let searchPokemon = 1;


const fetchPokemon =  async(pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Carregando..."
    pokemonNumber.innerHTML = "..."
    const data = await fetchPokemon(pokemon)
    if(data){
        pokemonName.innerHTML = data.name 
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        searchPokemon = data.id;
        input.value = ''
        if(data.id == 10){
            pokemonName.innerHTML = "Neymito"
            pokemonNumber.innerHTML = "10 do hexa"
            searchPokemon = 10;
            pokemonImage.src = 'https://c.tenor.com/PKKCAakpBZIAAAAM/neyney-neymar.gif'
        }
    }else{
        if(input.value.toLowerCase() == 'neymar'){
            pokemonName.innerHTML = "Neymito"
            pokemonNumber.innerHTML = "10 do hexa"
            searchPokemon = 10;
            pokemonImage.src = 'https://c.tenor.com/PKKCAakpBZIAAAAM/neyney-neymar.gif'
        }else{
            pokemonName.innerHTML = "Not Found" 
            pokemonNumber.innerHTML = "XXX"
            pokemonImage.src = 'https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/image-not-found-icon.png'
            input.value = ''
        }
        
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value)
    
})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(`${searchPokemon}`);
    }
  });
  
  buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(`${searchPokemon}`);
  });
  
renderPokemon('1')
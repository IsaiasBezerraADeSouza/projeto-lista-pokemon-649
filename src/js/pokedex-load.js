function geracaoDeCartaoPokemon(pokemon_name) {
    let novo_cartao_pokemon = document.createElement("li");
    lista_pokemon.appendChild(novo_cartao_pokemon);
    lista_pokemon.lastChild.classList.add("cartao-pokemon");
    lista_pokemon.lastChild.id = pokemon_name;
    lista_pokemon.lastChild.classList.add(pokemon_name);
    lista_pokemon.lastChild.innerHTML = `
        <div class="informacoes">
            <span class="pokemon-name">${pokemon_name}</span>
            <span class="pokemon-number">#${pokemon_number}</span>
        </div>

        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon_number}.gif" class="gif">
    
    <ul class="types">
    </ul>
    
    <p class="description">Loading...`;
    pokemon_number++;
}

const lista_pokemon = document.querySelector("#lista-pokemon");
let pokemon_number = 1;

fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${pokemon_number - 1}&limit=649`, { cache: "force-cache" }
)
    .then((result) => {
        return result.json();
    })
    .then((api_return) => {
        for (const n of api_return.results) {
            geracaoDeCartaoPokemon(n.name);
        }
        return api_return;
    })
    .then(() => {
        for (const n of lista_pokemon.children) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${n.id}`, { cache: "force-cache" })
                .then((result) => {
                    return result.json();
                })
                .then((pokemon_data) => {
                    fetch(`${pokemon_data.species.url}`, { cache: "force-cache" })
                        .then((result) => {
                            return result.json();
                        })
                        .then((pokemon_data_specie) => {
                            let poke_description = n.getElementsByClassName("description")[0];
                            poke_description.innerHTML =
                                pokemon_data_specie.flavor_text_entries[9].flavor_text;
                        });
                    for (const pokemon_type of pokemon_data.types) {
                        let new_poke_type = document.createElement("li");
                        const pokemon_types_list = n.getElementsByClassName("types");
                        pokemon_types_list[0].appendChild(new_poke_type);
                        pokemon_types_list[0].lastChild.classList.add(
                            pokemon_type.type.name
                        );
                        pokemon_types_list[0].lastChild.classList.add("type");
                        pokemon_types_list[0].lastChild.innerHTML = pokemon_type.type.name;
                    }
                });
        }
    });

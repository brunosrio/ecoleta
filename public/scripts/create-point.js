

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json()} )
    /*caso tenha apenas um parâmetro, a função anônima não precisa de parênteses, e se o retorno pequeno, também não precisa de chaves*/
    .then( states => {

        for(const state of states ){
            ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectState = event.target.selectedIndex    
    stateInput.value = event.target.options[indexOfSelectState].text 

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities =>{
        for(city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}`
        }

        citySelect.disabled = false
    })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) 

//Itens de coleta
//Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    
    //adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //console.log('ITEM ID: ', itemId)

   
    //Verificar se existem itens selecionados, se sim pegar os Itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //Isso será true or
        return itemFound
    })

    //Se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0){
        //tirar seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{
        //Se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }

    //console.log('SELECTED ITEMS: ', selectedItems)

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

    
}

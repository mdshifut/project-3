// Make an array with country obj
// Obj pro:
// ======= Name,capital indipendence,favorite
// Make a list item wraper function
// Make a single list item function


// Edit fuction
// Delete fuction
// favorite fuction

// Helper functions
let cElement = element => {
    return document.createElement(element)
}
let getId = element => {
    return document.getElementById(element)
}

const countries = [
    { country: 'Bangladesh', capital: 'Dhaka', indipendence: 1971, favorite: false },
    { country: 'Malaysia', capital: 'Kuala Lumpur', indipendence: 1971, favorite: false },
    { country: 'Singapore', capital: 'Singapore ', indipendence: 1971, favorite: false },
    { country: 'Thailand ', capital: 'Bangkok ', indipendence: 1971, favorite: false },
    { country: 'Sri Lanka', capital: 'Colombo', indipendence: 1971, favorite: false }
]

let createListWrapper = (heading, id) => {
    let col = cElement('div')
    col.className = 'col-lg-6'

    let listWrapper = cElement('div')
    listWrapper.className = 'country-list'
    listWrapper.id = id

    let WrapperHeading = cElement('h1')
    WrapperHeading.innerHTML = heading
    listWrapper.appendChild(WrapperHeading)

    col.appendChild(listWrapper)

    return col


}

let createSingleListItem = value => {
    let li = cElement('li')
    let row = cElement('div')
    row.className = 'row'
    let colLeft = cElement('div')
    colLeft.className = 'col-md-6'
    let listHeading = cElement('h3')
    listHeading.innerHTML = value.country

    let liText = document.createTextNode('Capital: ')

    let span = cElement('span')
    span.innerHTML = value.capital


    colLeft.appendChild(listHeading)
    colLeft.appendChild(liText)
    colLeft.appendChild(span)
    row.appendChild(colLeft)



    let colRight = cElement('div')
    colRight.className = 'col-md-6'
    let colRightHeading = cElement('h3')
    let yearSpan = cElement('span')
    colRightHeading.innerHTML = 'Independence'
    yearSpan.innerHTML = value.indipendence
    colRight.appendChild(colRightHeading)
    colRight.appendChild(yearSpan)
    row.appendChild(colRight)
    li.appendChild(row)
    return li
}

let createSettings = (arrayIndex, array) => {
    let div = cElement('div')
    div.setAttribute('data-arrayIndex', arrayIndex)
    div.className = 'settings-area'
    let iEdit = cElement('i')
    iEdit.className = 'fa fa-pencil-square-o'
    iEdit.setAttribute('data-setting', 'edit')
    let iDelete = cElement('i')
    iDelete.className = 'fa fa-trash'
    iDelete.setAttribute('data-setting', 'delete')
    let iFavorite = cElement('i')
    iFavorite.className = 'fa fa-heart'
    if (array[arrayIndex].favorite) {
        iFavorite.classList.add('active')
    }
    iFavorite.setAttribute('data-setting', 'favorite')
    div.appendChild(iEdit)
    div.appendChild(iDelete)
    div.appendChild(iFavorite)
    return div
}


let deleteItem = item => {
    let itemNo = parseInt(item)
    if (countries.length > itemNo) {
        countries.splice(parseInt(item), 1)
        let allCountriesWrapper = getId('allCountryListWrapper')
        let ul = getId('allCountryList')


        allCountriesWrapper.removeChild(ul)
        allCountriesWrapper.appendChild(createListItems(countries, 'allCountryList'))
        createFavoriteList()
    }



}





let createFavoriteList = () => {


    let favItems = [];

    countries.forEach(function(value, index) {
        if (value.favorite) {
            value.index = index
            favItems.push(value)
        }
    })


    let createFavListItems = (listArray, id, ) => {

        let ul = cElement('ul')
        ul.id = id
        ul.addEventListener('click', listFucn)
        listArray.forEach(function(value) {
            ul.appendChild(createListItem(value, value.index, countries))
        })
        return ul
    }


    if (!getId('favoriteList')) {
        let countryAreaRow = document.querySelector('.country-area').querySelector('.row')
        let favoriteListWraper = createListWrapper('Favorite Country List', 'favoriteListWrapper')
        let countryList = favoriteListWraper.querySelector('.country-list')
        countryList.appendChild(createFavListItems(favItems, 'favoriteList'))
        countryAreaRow.appendChild(favoriteListWraper)

    } else {
        let favoriteListWraper = getId('favoriteListWrapper')
        let favoriteListUl = getId('favoriteList')


        favoriteListWraper.removeChild(favoriteListUl)
        favoriteListWraper.appendChild(createFavListItems(favItems, 'favoriteList'))

    }






    // parent.appendChild(ListWrapper)
}



let addFavorite = item => {
    let arrItem = parseInt(item);


    if (!countries[arrItem].favorite) {
        countries[arrItem].favorite = true
        createFavoriteList()

    } else {

        countries[arrItem].favorite = false
        createFavoriteList()
    }


}

let edit = e => {

    event.preventDefault();

    if (event.type === 'submit') {
        let item = {}
        item.country = event.target.querySelector('input[name="cName"]').value
        item.capital = event.target.querySelector('input[name="capital"]').value
        item.indipendence = event.target.querySelector('input[name="independence"]').value
        console.log(e.target.attributes["data-index"].value)
        let editItemIndex = e.target.attributes["data-index"].value
        item.favorite = countries[parseInt(editItemIndex)].favorite
        countries[parseInt(editItemIndex)] = item
        let allCountriesWrapper = getId('allCountryListWrapper')
        let ul = getId('allCountryList')


        allCountriesWrapper.removeChild(ul)
        allCountriesWrapper.appendChild(createListItems(countries, 'allCountryList'))

        let formWrapper = event.target.parentNode
        let body = formWrapper.parentNode



        body.removeChild(formWrapper)
        createFavoriteList()
    }

}


let listFucn = e => {
    clickedElement = e.target.getAttribute('data-setting')

    if (clickedElement.trim() === 'edit') {


        createform('edit', e.target.parentNode.getAttribute('data-arrayindex'))
    } else if (clickedElement.trim() === 'delete') {
        deleteItem(e.target.parentNode.getAttribute('data-arrayindex'))
    } else if (clickedElement.trim() === 'favorite') {
        addFavorite(e.target.parentNode.getAttribute('data-arrayindex'))
        e.target.classList.add('active')
    }
}

let createListItem = (value, index, arr) => {
    let li = createSingleListItem(value)
    let settings = createSettings(index, arr)
    li.appendChild(settings)
    return li
}
let createListItems = (listArray, id) => {

    let ul = cElement('ul')
    ul.id = id
    ul.addEventListener('click', listFucn)
    listArray.forEach(function(value, index, arr) {
        ul.appendChild(createListItem(value, index, arr))
    })
    return ul
}


let createform = (type, index) => {
    let cName = cElement('input')
    let editItem = parseInt(index)
    cName.setAttribute('type', 'text')
    if (type === 'edit') {

        cName.setAttribute('placeholder', countries[editItem].country)
        cName.setAttribute('value', countries[editItem].country)
    } else {

        cName.setAttribute('placeholder', 'Country Name')
    }
    cName.setAttribute('name', 'cName')

    let capital = cElement('input')
    capital.setAttribute('type', 'text')
    if (type === 'edit') {

        capital.setAttribute('placeholder', countries[editItem].capital)
        capital.setAttribute('value', countries[editItem].capital)
    } else {

        capital.setAttribute('placeholder', 'Capital')
    }
    capital.setAttribute('name', 'capital')

    let indipendence = cElement('input')
    indipendence.setAttribute('type', 'text')
    if (type === 'edit') {

        indipendence.setAttribute('placeholder', countries[editItem].indipendence)
        indipendence.setAttribute('value', countries[editItem].indipendence)
    } else {

        indipendence.setAttribute('placeholder', 'Indipendence')
    }
    indipendence.setAttribute('name', 'independence')

    let submit = cElement('input')
    submit.setAttribute('type', 'Submit')
    submit.setAttribute('value', 'Submit')
    let formWrapper = cElement('div')
    formWrapper.classList.add('form-wrapper')
    formWrapper.id = 'form'
    let form = cElement('form')
    if (type === 'edit') {

        form.setAttribute('data-type', 'edit')
        form.setAttribute('data-index', editItem)
    }
    form.appendChild(cName)
    form.appendChild(capital)
    form.appendChild(indipendence)
    form.appendChild(submit)
    formWrapper.appendChild(form)

    document.querySelector('.country-area').parentNode.appendChild(formWrapper)


    if (type === 'edit') {
        form.addEventListener('submit', edit)
    } else {
        form.addEventListener('submit', addNewItem)
    }
}

let addNewItem = (event) => {
    event.preventDefault();

    if (event.type === 'submit') {
        let item = {}
        item.country = event.target.querySelector('input[name="cName"]').value
        item.capital = event.target.querySelector('input[name="capital"]').value
        item.indipendence = event.target.querySelector('input[name="independence"]').value
        item.favorite = false
        countries.push(item)
        let allCountriesWrapper = getId('allCountryListWrapper')
        let ul = getId('allCountryList')


        allCountriesWrapper.removeChild(ul)
        allCountriesWrapper.appendChild(createListItems(countries, 'allCountryList'))

        let formWrapper = event.target.parentNode
        let body = formWrapper.parentNode



        body.removeChild(formWrapper)
    }

}






let showButton = getId('show');
showButton.addEventListener('click', function(e) {
    let parent = e.target.parentNode.parentNode
    let ListWrapper = createListWrapper('Country List', 'allCountryListWrapper')
    let countryList = ListWrapper.querySelector('.country-list')
    let addNewButton = cElement('span')
    addNewButton.className = 'button'
    addNewButton.addEventListener('click', function() {
        createform()
    })
    addNewButton.innerHTML = 'Add New Country'
    addNewButton.addEventListener('click', addNewItem)


    countryList.appendChild(addNewButton)
    countryList.appendChild(createListItems(countries, 'allCountryList'))
    parent.innerHTML = ''

    parent.appendChild(ListWrapper)
})








// // console.log(initiateCountryList())
// let p = document.createElement('div')
// p.getAttribute
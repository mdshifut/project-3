// =============== 
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


// Country lists
const countries = [
    { country: 'Bangladesh', capital: 'Dhaka', indipendence: 1971, favorite: false },
    { country: 'Malaysia', capital: 'Kuala Lumpur', indipendence: 1957, favorite: false },
    { country: 'Singapore', capital: 'Singapore ', indipendence: 1965, favorite: false },
    { country: 'Thailand ', capital: 'Bangkok ', indipendence: 1238, favorite: false },
    { country: 'Sri Lanka', capital: 'Colombo', indipendence: 1948, favorite: false }
]


// Create list wrapper element
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




// Create Setting for List Item
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






// Create Single List item
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



// Delete Item from the array and the DOM
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

// Alert the user about Delete Item
let confirmDelete = item => {
    countries
    let list = createSingleListItem(countries[parseInt(item)])
    let confirmModalWrapper = cElement('div')
    confirmModalWrapper.classList.add('modal-wrapper')
    let confirmModalWrapperTitle = cElement('h4')
    confirmModalWrapperTitle.innerHTML = 'Are you sure you want to delete flowing country from the country list?'

    confirmModalWrapper.appendChild(confirmModalWrapperTitle)
    let ul = cElement('ul')
    ul.appendChild(list)
    confirmModalWrapper.appendChild(ul)
    let buttonCancel = cElement('span')
    buttonCancel.innerHTML = 'Cancel'
    buttonCancel.className = 'modalButton'
    let buttonConfirm = cElement('span')
    buttonConfirm.innerHTML = "Confirm"
    buttonConfirm.className = "modalButton"
    let buttonWrapper = cElement('div')
    buttonWrapper.className = 'buttonWrpper'
    buttonWrapper.appendChild(buttonCancel)
    buttonWrapper.appendChild(buttonConfirm)
    confirmModalWrapper.appendChild(buttonWrapper)

    let overlay = cElement('div')
    overlay.classList.add('overlay')
    overlay.style.opacity = 0.6
    let body = document.querySelector('.country-area').parentNode
    body.insertBefore(confirmModalWrapper, body.childNodes[0])
    body.insertBefore(overlay, body.childNodes[0])


    overlay.addEventListener('click', function() {
        modalRemover(confirmModalWrapper, overlay)
    })


    buttonCancel.addEventListener('click', function() {
        modalRemover(confirmModalWrapper, overlay)
    })

    buttonConfirm.addEventListener('click', function() {
        modalRemover(confirmModalWrapper, overlay)
        deleteItem(item)
    })



}




// Create Favorite List Item and insert or Update the DOM
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

    if (!getId('favoriteList') && favItems.length) {
        let countryAreaRow = document.querySelector('.country-area').querySelector('.row')
        let favoriteListWraper = createListWrapper('Favorite Country List', 'favoriteListWrapper')
        let countryList = favoriteListWraper.querySelector('.country-list')
        countryList.appendChild(createFavListItems(favItems, 'favoriteList'))
        countryAreaRow.appendChild(favoriteListWraper)

    } else if (getId('favoriteList') && favItems.length) {

        console.log('else')
        let favoriteListWraper = getId('favoriteListWrapper')
        let favoriteListUl = getId('favoriteList')


        favoriteListWraper.removeChild(favoriteListUl)
        favoriteListWraper.appendChild(createFavListItems(favItems, 'favoriteList'))

    }



    if (getId('favoriteListWrapper') && !favItems.length) {
        console.log('wraper')
        let favoriteListWrapperCol = getId('favoriteListWrapper').parentNode
        let favoriteListWrapperRow = favoriteListWrapperCol.parentNode


        favoriteListWrapperRow.removeChild(favoriteListWrapperCol)
    }


}


// Add an item to Favorite and create Favorite list
let addFavorite = item => {
    let arrItem = parseInt(item);
    let allCountryListFavButton = getId('allCountryList').querySelector(`div[data-arrayindex="${arrItem}"]`).querySelector(`i[data-setting="favorite"]`)


    if (!countries[arrItem].favorite) {
        countries[arrItem].favorite = true
        allCountryListFavButton.classList.add('active')
        createFavoriteList()

    } else {

        countries[arrItem].favorite = false
        allCountryListFavButton.classList.remove('active')
        createFavoriteList()
    }


}



// Edit an item and Update array and Dom item
let edit = e => {

    event.preventDefault();

    if (event.type === 'submit') {
        let item = {}
        item.country = event.target.querySelector('input[name="cName"]').value
        item.capital = event.target.querySelector('input[name="capital"]').value
        item.indipendence = event.target.querySelector('input[name="independence"]').value
        let editItemIndex = e.target.attributes["data-index"].value
        item.favorite = countries[parseInt(editItemIndex)].favorite
        countries[parseInt(editItemIndex)] = item
        let allCountriesWrapper = getId('allCountryListWrapper')
        let ul = getId('allCountryList')


        allCountriesWrapper.removeChild(ul)
        allCountriesWrapper.appendChild(createListItems(countries, 'allCountryList'))

        let formWrapper = event.target.parentNode
        let body = formWrapper.parentNode



        let overlay = body.querySelector('.overlay')
        modalRemover(formWrapper, overlay)
        createFavoriteList()
    }

}

// List functionliy 
let listFucn = e => {
    if (e.target.tagName === 'I') {
        clickedElement = e.target.getAttribute('data-setting')

        if (clickedElement.trim() === 'edit') {


            createform('edit', e.target.parentNode.getAttribute('data-arrayindex'))
        } else if (clickedElement.trim() === 'delete') {

            confirmDelete(e.target.parentNode.getAttribute('data-arrayindex'))
                // deleteItem(e.target.parentNode.getAttribute('data-arrayindex'))
        } else if (clickedElement.trim() === 'favorite') {
            addFavorite(e.target.parentNode.getAttribute('data-arrayindex'))
                // e.target.classList.add('active')
        }
    }
}


// Create single list item with setting option
let createListItem = (value, index, arr) => {

    let li = createSingleListItem(value)
    let settings = createSettings(index, arr)
    li.appendChild(settings)
    return li
}


// Create list items from an array
let createListItems = (listArray, id) => {

    let ul = cElement('ul')
    ul.id = id
    ul.addEventListener('click', listFucn)
    listArray.forEach(function(value, index, arr) {
        ul.appendChild(createListItem(value, index, arr))
    })
    return ul
}

// Create Modal form
let createform = (type, index) => {
    let cName = cElement('input')
    let editItem = parseInt(index)
    cName.setAttribute('type', 'text')
    if (type === 'edit') {

        cName.setAttribute('value', countries[editItem].country)
    }

    cName.setAttribute('placeholder', 'Country Name')

    cName.setAttribute('name', 'cName')

    let capital = cElement('input')
    capital.setAttribute('type', 'text')
    if (type === 'edit') {

        capital.setAttribute('value', countries[editItem].capital)
    }

    capital.setAttribute('placeholder', 'Capital')

    capital.setAttribute('name', 'capital')

    let indipendence = cElement('input')
    indipendence.setAttribute('type', 'text')
    if (type === 'edit') {

        indipendence.setAttribute('value', countries[editItem].indipendence)
    }

    indipendence.setAttribute('placeholder', 'Indipendence')

    indipendence.setAttribute('name', 'independence')

    let submit = cElement('input')
    submit.setAttribute('type', 'Submit')
    submit.setAttribute('value', 'Save')



    let buttonCancel = cElement('span')
    buttonCancel.innerHTML = 'Cancel'
    let buttonWrapper = cElement('div')
    buttonWrapper.className = 'buttonWrpper'
    buttonWrapper.appendChild(buttonCancel)
    buttonWrapper.appendChild(submit)













    let formWrapper = cElement('div')
    formWrapper.classList.add('modal-wrapper')
    let formWrapperheading = cElement('h4')
    formWrapperheading.innerHTML = 'Add new country to the list'
    if (type === 'edit') {

        formWrapperheading.innerHTML = 'Edit flowing country details'
    }
    formWrapper.appendChild(formWrapperheading)
    formWrapper.id = 'form'
    let form = cElement('form')
    if (type === 'edit') {

        form.setAttribute('data-type', 'edit')
        form.setAttribute('data-index', editItem)
    }
    form.appendChild(cName)
    form.appendChild(capital)
    form.appendChild(indipendence)
    form.appendChild(buttonWrapper)
    formWrapper.appendChild(form)
    let overlay = cElement('div')
    overlay.classList.add('overlay')
    let body = document.querySelector('.country-area').parentNode
    body.insertBefore(formWrapper, body.childNodes[0])
    body.insertBefore(overlay, body.childNodes[0])

    overlay.style.opacity = 0.6
    if (type === 'edit') {
        let inputs = form.querySelectorAll('input[type="text"]')
        let inputsArr = [...inputs]


        inputsArr.forEach(function(inputItem) {
            inputItem.addEventListener('keyup', function() {
                fromInputValidate(inputsArr, form)
            })
        })

        fromInputValidate(inputsArr, form)
        form.addEventListener('submit', edit)

    } else {
        let inputs = form.querySelectorAll('input[type="text"]')
        let inputsArr = [...inputs]


        inputsArr.forEach(function(inputItem) {
            inputItem.addEventListener('keyup', function() {
                fromInputValidate(inputsArr, form)
            })
        })

        fromInputValidate(inputsArr, form)
        form.addEventListener('submit', addNewItem)

    }

    overlay.addEventListener('click', function() {
        modalRemover(formWrapper, overlay)
    })
    buttonCancel.addEventListener('click', function() {

        modalRemover(formWrapper, overlay)
    })

}

// Modal Remove when specfic task occur
let modalRemover = (modal, overlay) => {
    let body = overlay.parentNode
    body.removeChild(modal)
    body.removeChild(overlay)
}


// Add new item into the array an update the DOM
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
        let overlay = body.querySelector('.overlay')
        modalRemover(formWrapper, overlay)
    }

}

// Validate from Data
let fromInputValidate = (inputs, form) => {

    let fromvalidate = false

    inputs.forEach(function(value) {
        if (!value.value.trim()) {
            fromvalidate = true
        }

    })
    form.querySelector('input[type="submit"]').disabled = fromvalidate

}





// Intiate List items for first view
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
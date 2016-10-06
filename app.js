//State of the object & Global variables

var state = {
    items: []
};

listTemplate = '<li>' + 
                    '<span class="shopping-item js-shopping-item"> </span>' +
                    '<div class ="shopping-item-controls">'+
                        '<button class="js-shopping-item-toggle">' +
                            '<span class="button-label">check</span>' +
                        '</button>' +
                        '<button class="js-shopping-item-delete">' +
                            '<span class="button-label">delete</span>' +
                        '</button>' +
                    '</div>' +
                '</li>';    



//State Altering functions

function addItem(state, item) {
    state.items.push({
       itemName: item,
       checked: false 
    });
}

function getItem(state, index){
    return state.items[index];
}

function deleteItem(state, index){
    state.items.splice(index, 1);
}

function updateItem(state, index, newItem){
    state.items[index] = newItem;
}
 

//Dom Manipulation

function renderItem(item, listTemplate, listLabelIdentifier, indexId, index){
    var element = $(listTemplate);
    element.find(listLabelIdentifier).text(item.itemName);
    if(item.checked){
        element.find(listLabelIdentifier).addClass('shopping-item__checked');
    }
    element.attr(indexId , index);
    return element;
}

function renderList(state, listTemplate, listLabelIdentifier, indexId, listElement){
    var itemsHtml = state.items.map(function(item,index){
        return renderItem(item, listTemplate, listLabelIdentifier, indexId, index);
    });
    listElement.html(itemsHtml);
}


//Event Listeners

function addItemHandler(state, formElement, newItemIdentifier, listTemplate, listLabelIdentifier, indexId, listElement){
    formElement.submit(function(event){
        event.preventDefault();
        var item = formElement.find(newItemIdentifier).val();
        addItem(state,item);
        renderList(state, listTemplate, listLabelIdentifier, indexId, listElement);
    });
}

function deleteItemHandler(state, listElement, deleteIdentifier, indexId, listTemplate, listLabelIdentifier){
    listElement.on('click', deleteIdentifier, function(event){
        var index = parseInt($(this).closest('li').attr(indexId));
        deleteItem(state, index);
        renderList(state, listTemplate, listLabelIdentifier, indexId, listElement);
    });
}

function toggleCheckHandler(state, listElement, toggleIdentifier, listTemplate, listLabelIdentifier, indexId){
    listElement.on('click', toggleIdentifier, function(event){
        var index = parseInt($(this).closest('li').attr(indexId));
        var oldItem = getItem(state, index);
        updateItem(state, index, {
            itemName: oldItem.itemName,
            checked: !oldItem.checked
        });
        renderList(state, listTemplate, listLabelIdentifier, indexId, listElement); 
    });
}









//Running the DOM
$(document).ready(function(){
    var formElement = $('#js-shopping-list-form');
    var listElement = $('.js-shopping-list');
    var listLabelIdentifier = '.js-shopping-item';
    var newItemIdentifier = '#js-new-item';
    var toggleIdentifier ='.js-shopping-item-toggle';
    var deleteIdentifier ='.js-shopping-item-delete';
    var indexId = 'data-list-id';
    addItemHandler(state, formElement, newItemIdentifier, listTemplate, listLabelIdentifier, indexId, listElement);
    deleteItemHandler(state, listElement, deleteIdentifier, indexId, listTemplate, listLabelIdentifier);
    toggleCheckHandler(state, listElement, toggleIdentifier, listTemplate, listLabelIdentifier, indexId);
});


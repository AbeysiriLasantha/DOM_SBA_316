// Array list containing the event items
const eventList = [{id:'Exam',suggests:['Schedule','Braindumps']}, 
                   {id:'Wedding',suggests:['Print Cards','Reserve a Hotel']},
                   {id:'Birthday Party',suggests:['Guest List','Cards']},
                   {id:'Foreign Trip',suggests:['Passport','Currency']} ,
                   {id:'Medical Checkup',suggests:['Insurance','Fasting']} 
               ];

// Cache DOM elements
const eventSelect = document.getElementById('event');
const eventInput = document.getElementById('event');
const newItemInput = document.getElementById('new-item');
const addBtn = document.getElementById('add-btn');
const checklist = document.getElementById('checklist');
const suggestions = document.getElementById('suggestions');
const modal = document.getElementById('modal');
const confirmBtn = document.querySelector('#confirm-btn'); 
const cancelBtn = document.querySelector('#cancel-btn');

//let itemToRemove = null;


// Function to get suggestions based on the event and promted to the user
function getSuggestionsById(eventId) {
     // Find the suggests with the matching ID
     const suggestionItems = eventList.find(e => e.id === eventId);
     // Return if no suggestions found
     if (!suggestionItems) {
         return;
     } 
     // Add the example to the input box
     // NewItemInput.Placeholder= 'e.g.'+ suggestionItems.suggests[0];
     // Clear the content of the suggestions box
     suggestions.innerHTML = ''; 
     const suggestionText = document.createElement('p');
     suggestionText.textContent = 'Suggested Items:';
     suggestions.appendChild(suggestionText);
    //loop trough the default suggestion list and append those
     suggestionItems.suggests.forEach(item => {
         const a = document.createElement('a');
         a.textContent = item;
         a.href = "#"; // Add a link placeholder to make it behave like a link
         a.addEventListener('click', () => {
             newItemInput.value = item;
             addItem();
         });
         suggestions.appendChild(a);
     });
    
}
// Function to add a new item to the checklist
function addItem() {
    const itemText = newItemInput.value.trim();
    // Validate the whether the text is not blank
    if (itemText === '') {
        alert('Please enter an item.');
        return;
    }

    const li = document.createElement('li');
    li.textContent = itemText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', removeItem);
    li.appendChild(removeBtn);
    checklist.appendChild(li);

    // Confirm message to the user 
    alert(`${itemText} has been added to your checklist.`);
    newItemInput.value = '';
}


// Function to remove an item from the checklist
function removeItem(removingItem) {
    itemToRemove = removingItem.target.parentElement;
    modal.style.display = 'block';
}


// 1) Loop through the data array and create an option for each item
eventList.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.id;
    eventSelect.appendChild(option);
});

// 2) Add an event listener to handle the selection
//Find suggestions from the dataset
eventSelect.addEventListener('change', function() {
    const selectedEvent = this.value;
    //Clear the check list
    checklist.innerHTML=''
    // find the suggest for the selected event 
    getSuggestionsById(selectedEvent)
});

// Event listeners
//Add the user entered value to the check list
addBtn.addEventListener('click', addItem);

//Remove an item from the check list
confirmBtn.addEventListener('click', () => {
    if (itemToRemove) {
        itemToRemove.remove();
        itemToRemove = null;
    }
    modal.style.display = 'none';
});

cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    itemToRemove = null;
});


///////////////////////////////////////////////////////////////////////


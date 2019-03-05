const textBox = document.getElementById('add-input'); //Input box
const submit = document.getElementById('add-btn'); // Submit button
const list = document.getElementById('list'); // List

//Create List item function to generate the html for each li

function createListItem () {

	//Create elements

	let listItem = document.createElement('li'),
		p = document.createElement('p'),
		input = document.createElement('input'),
		fontWrapper = document.createElement('div'),
		edit = document.createElement('i'),
		del = document.createElement('i');

	//Add class names and attributes	
	
	input.className = "edit-note";
	input.setAttribute('type', 'text');
	edit.className = "far fa-edit";
	fontWrapper.className = 'font-wrapper';
	del.className = "fas fa-times";
	listItem.className = 'list-item';
	//Set paragraph to the value of the text inputted into the input box

	let textBoxValue = textBox.value;
	p.innerText = textBoxValue;

	//Append items

	listItem.append(p, input, fontWrapper);
	fontWrapper.append(edit, del);
	list.appendChild(listItem);

	textBox.value = '';

	updateDom();
}

createListItem(textBox.value = 'First note');

// Add event listener to the submit button

submit.addEventListener('click', function(e) {

	//Pevent page refresh

	e.preventDefault();

	//Simple if statement to check if the input box is empty

	if (textBox.value !== '') {
		createListItem(); // Call create list function
	} else {
		console.log('Add text'); // Log error
	}

});

// Event listener for enter to submit

document.getElementById('add').addEventListener('keypress', function(e) { 

	if (e.keyCode == 13) { 
		e.preventDefault(); //Prevent default if event keycode is enter
		createListItem();
	}

});

/*******************Hide items*****************/

const hideItem = document.getElementById('hide');
let label = document.querySelector('label');
let icon = document.querySelector('#hide-list i');

hideItem.addEventListener('click', function() {

	if(hideItem.checked) {
		label.textContent = 'Show notes';
		list.style.display = 'none';
		icon.className = 'fas fa-chevron-down';
	} else {
		label.textContent = 'Hide notes';
		list.style.display = 'block';
		icon.className = 'fas fa-chevron-up';
	}

});

/*******************Search notes****************/

let searchInput = document.querySelector('#search form');

searchInput.addEventListener('keypress', function(e){

	let searchChar = e.target.value.toUpperCase();
	let notes = list.getElementsByTagName('li');

	Array.from(notes).forEach(function(note) {
		let parText = note.firstElementChild.textContent;

		if(parText.toUpperCase().indexOf(searchChar) !== -1) {
			note.style.display = 'block';
		} else {
			note.style.display = 'none';
		}

	//Prevent enter refreshing the page	

	if (e.keyCode == 13) {
		e.preventDefault();
	}

	});

});

/************Update DOM************/

function updateDom() {
	let listItems = document.querySelectorAll('.list-item');
	window.listItems = listItems;
	edit();
	deleteNote();
}

updateDom();

/********Edit note*********/

function edit() {

	listItems.forEach(function(listItem) {

		let editButton = listItem.querySelector('div .fa-edit');
		let paragraph = listItem.querySelector('p');
		let editBox = listItem.querySelector('input');

		//Edit on click

		editButton.addEventListener('click', function () {
			let editBoxValue = editBox.value;
			paragraph.innerText = editBoxValue;
		})

		//Edit using enter

		editBox.addEventListener('keypress', function(e){

			if (e.keyCode == 13) {
				e.preventDefault();
				let editBoxValue = editBox.value;
				paragraph.innerText = editBoxValue;
			}

		})
			
	});

}

edit();

/**************Delete note**************/

function deleteNote() {

	listItems.forEach(function(listItem){

		let deleteButton = listItem.querySelector('div .fa-times');

		deleteButton.addEventListener('click', function() {

			listItem.remove();
		})
	})

}

deleteNote();
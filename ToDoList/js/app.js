// JAVASCRIPT CODE FOR TO-DO-LIST APP

//Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINETHROUGH = "lineThrough";

//Variables
let LIST, id;

//Get item from local storage
let data = localStorage.getItem("TODO");
//check if data is not empty
if(data){
	LIST = JSON.parse(data);
	id = LIST.length; //set id to the last one in the list
	loadList(LIST); //load list to user interface
}else {
	//if there is no data
	LIST=[];
	id=0;
}

//load items to user's interface
function loadList(array){
	array.forEach(function(item){
		addToDo(item.name, item.id, item.done, item.trash);
	});
}

//clear the local storage
clear.addEventListener("click", function(){
	localStorage.clear();
	localStorage.reload();
});

// Show today's date
const today = new Date();
const options = {weekday: "long", month: "short", day: "numeric"};
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//Add to do function
function addToDo(toDo, id, done, trash) {
	if(trash){return;}
	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINETHROUGH : "";
	const item = `<li class="item">
					<i class="fa ${DONE} co" job="complete" id="${id}"></i>
					<p class="text ${LINE}">${toDo}</p>
					<i class="fa fa-trash-o de" job="delete" id="${id}"></i>
				</li>`;
	const position = "beforeend";
	list.insertAdjacentHTML(position, item);
}

//Add an item to the list when a user hits enter key
document.addEventListener("keyup", function(even){
	if(event.keyCode == 13){
		const toDo = input.value;
		//if the input isn't empty
		if(toDo){
			addToDo(toDo, id, false, false);
			LIST.push({
				name: toDo,
				id: id,
				done: false,
				trash: false,
			});
			//add item to local storage
			localStorage.setItem("TODO", JSON.stringify(LIST));
			id++;
		}
		input.value = "";
	}
});

//Complete to do
function completeToDo(element){
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINETHROUGH);

	LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Remove to do
function removeToDo(element){
	element.parentNode.parentNode.removeChild(element.parentNode);
	LIST[element.id].trash = true;
}

//Target items created dynamically
list.addEventListener("click", function(event){
	const element = event.target; //return the clicked element inside list
	const elementJob = element.attributes.job.value; //complete or delete
	if(elementJob == "complete"){
		completeToDo(element);
	}else if(elementJob == "delete"){
		removeToDo(element);
	}
	//add item to local storage
	localStorage.setItem("TODO", JSON.stringify(LIST));
});
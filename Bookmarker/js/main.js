//Listen for form Submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//Save Bookmark
function saveBookmark(e) {
	//Get form values
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;

	if (!validateForm(siteName, siteURL)){
		return false;
	}
	//Store inputs into bookmark object
	var bookmark = {
		name: siteName,
		url: siteURL
	}
	
	//Local Storage Test
	/*localStorage.setItem('test','Hello World');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));*/

	//Test if bookmarks is null

	if (localStorage.getItem('bookmarks')===null){
	//Init Array
	var bookmarks = [];
	//Add to array
	bookmarks.push(bookmark);
	//Set to local storage
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	} else {
		//Get bookmarks from localstorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//Add bookmark to array
		bookmarks.push (bookmark);
		//Re-set back to local storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}
	//Clear Form
	document.getElementById('myForm').reset();
	//Refetch bookmarks
	fetchBookmarks ();
	//Prevent Form from Submitting
	e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url){
	//Get bookmarks from local storage
	var bookmarks = JSON.parse (localStorage.getItem('bookmarks'));
	//Loop through bookmarks
	for (var i=0 ; i<bookmarks.length; i++){
		//Check if url to be deleted matches one in the array
		if (bookmarks[i].url==url){
			//Remove from array
			bookmarks.splice(i,1);
		}
	}
	//Reset local storage
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	//Refetch bookmarks
	fetchBookmarks ();
}

//Fetch bookmarks
function fetchBookmarks () {
	//Get bookmarks from local storage
	var bookmarks = JSON.parse (localStorage.getItem('bookmarks'));
	//Get output id
	var bookmarksResults = document.getElementById('bookmarksResults');
	//Build output
	bookmarksResults.innerHTML = '';
	for (var i=0 ; i<bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		bookmarksResults.innerHTML += '<div class ="well">'+
									  '<h3>'+name+
									  '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
									  '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
									  '</h3>' +
									  '</div>';
	}
}
//Validate input data on form
function validateForm(siteName, siteURL){
	//Setup validation to prevent null entries
	if (!siteName || !siteURL){
		alert('Please fill in form');
		return false;
	}
	//Regular expression to ensure users type in urls in proper format
	var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	if (!siteURL.match(regex)){
		alert('Please use a valid URL');
		return false;
	}
	return true;
}
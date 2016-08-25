

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBZqL9KUneDQhAmgCKYlRvGQaXxZ41Gk4M",
    authDomain: "firstproject-b2541.firebaseapp.com",
    databaseURL: "https://firstproject-b2541.firebaseio.com",
    storageBucket: "firstproject-b2541.appspot.com",
};
firebase.initializeApp(config);

var dataRef = firebase.database();


// Initial Values
var name = "";
var email = "";
var howDidYouHear = "";


// Capture Button Click
$("#addUser").on("click", function() {

	// YOUR TASK!!!
	// Dont forget to provide initial data to your Firebase database.
	name = $('#nameinput').val().trim();
	email = $('#emailinput').val().trim();
	howDidYouHear = $('#howDidYouHearInput').val().trim();


	// Code for the push
	dataRef.ref().push({
		name: name,
		email: email,
		howDidYouHear: howDidYouHear,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
	// Don't refresh the page!
	return false;
});

//Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function(childSnapshot) {
	// Log everything that's coming out of snapshot
	console.log(childSnapshot.val().name);
	console.log(childSnapshot.val().email);
	console.log(childSnapshot.val().howDidYouHear);
	console.log(childSnapshot.val().joinDate);

	// full list of items to the well

		$('#full-member-list').append("<div class='well'><span id='name'> "+childSnapshot.val().name+" </span><span id='email'> "+childSnapshot.val().email+" </span><span id='howDidYouHear'> "+childSnapshot.val().howDidYouHear+" </span></div>");


// Handle the errors
}, function(errorObject){
	//console.log("Errors handled: " + errorObject.code)
});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
	// Change the HTML to reflect
	$("#namedisplay").html(snapshot.val().name);
	$("#emaildisplay").html(snapshot.val().email);
	$("#howDidYouHeardisplay").html(snapshot.val().howDidYouHear);
})

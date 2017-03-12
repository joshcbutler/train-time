  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDI8kzFC14727ZYuqIEX_1kz37w2OtprGM",
    authDomain: "train-time-63939.firebaseapp.com",
    databaseURL: "https://train-time-63939.firebaseio.com",
    storageBucket: "train-time-63939.appspot.com",
    messagingSenderId: "902422642725"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Initial Values
  var trainName = "";
  var destination = "";
  var frequency = 0;
  var nextArrival = 0;
  var minutesAway = 0;

  $("#add-train").on("click". function(event){
  	event.preventDefault();
  	// stores and retrieves train data
  	trainName = $("#trainName").val().trim();
  	destination = $("#destination").val().trim();
  	nextArrival = $("#firstTrain").val().trim();
  	frequency = $("#frequency").val().trim();

  	database.ref().push({
  		trainName: trainName,
  		destination: destination,
  		nextArrival: nextArrival,
  		frequency: frequency
  	});
  	
  });

  database.ref().on("child_added", function(childSnapshot){

  	console.log(childSnapshot.val().trainName);
  	console.log(childSnapshot.val().destination);
  	console.log(childSnapshot.val().nextArrival);
  	console.log(childSnapshot.val().frequency);

  	$("#trainDiv").append("<div class='well'><span id='train'> " + childSnapshot.val().trainName +
        " </span><span id='trainDestination'> " + childSnapshot.val().destination +
        " </span><span id='trainFrequency'> " + childSnapshot.val().frequency +
        " </span><span id='nextArrival'> " + childSnapshot.val().nextArrival + " </span></div>");


  });
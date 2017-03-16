  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyDI8kzFC14727ZYuqIEX_1kz37w2OtprGM",
      authDomain: "train-time-63939.firebaseapp.com",
      databaseURL: "https://train-time-63939.firebaseio.com",
      storageBucket: "train-time-63939.appspot.com",
      messagingSenderId: "902422642725"
  };
  firebase.initializeApp(config);
  var traininfo = firebase.database();
  //.on click adds train button
  $("#add-train").on("click", function(event) {
      event.preventDefault();
      // Grab the new train input values
      trainName = $("#name-input").val().trim();
      trainDestination = $("#destination-input").val().trim();
      trainStartTime = $("#start-time-input").val().trim();
      trainFrequency = $("#frequency-input").val().trim();

      // Push display data to Firebase
      traininfo.ref().push({

          Line: trainName,

          Destination: trainDestination,

          startTime: trainStartTime,

          Frequency: trainFrequency

      });
  });

  traininfo.ref().on("child_added", function(snapshot) {
          var lineName = snapshot.val().Line;
          var lineDestination = snapshot.val().Destination;
          var lineStartTime = snapshot.val().startTime;
          var lineFrequency = snapshot.val().Frequency;

          //Using moment.js
          //setting start time back one year to assure it comes before current time
          var startTimeConverted = moment(lineStartTime, "hh:mm").subtract(1, "years");
          // difference between the train start time and current time
          var timeDifference = moment().diff(moment(startTimeConverted), "minutes");
          // determining
          var timeRemainder = timeDifference % lineFrequency;
          // time until next train
          var timeUntilNext = lineFrequency - timeRemainder;
          // next Train
          var nextTrain = moment().add(timeUntilNext, "minutes").format("hh:mm");


          $("#trainTable > tbody").append("<tr><td>" + lineName + "</td><td>" + lineDestination + "</td><td>" +
              lineFrequency + "</td><td>" + nextTrain + "</td><td>" + timeUntilNext + "</td></tr>");
      },

      function(errorObject) {

          console.log("Errors handled: " + errorObject.code);

      });

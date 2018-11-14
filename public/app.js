// Whenever someone clicks the scrape button
$(document).on("click", "#scrape-button", function() {
    $.ajax({
      method: "GET",
      url: "/scrape/"
    }).then(function(data){
      console.log(data);
      console.log("This is the data");
      
      window.location = "/";

      
    });
  });

  // Whenever someone clicks the clear button
// $(document).on("click", "#clear-button", function() {
//   $.ajax({
//     method: "POST",
//     url: "/clear/"
//   }).then(function(data){
//     window.location = "/"
//     console.log(data)
//   });
// });


  // Grab the articles as a json
  $.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id 
                            + "'><b>" + data[i].sectionTitle + 
                            "</b><br/>" + data[i].newsTitle + "</p>"
                            + "<img src='" + data[i].newsImage + "' alt='Image'><br><br>"
                            +"<a href = '"+data[i].newsUrl + "'> Read Article</a><br><br><button class='add-note-button' data-id='" + data[i]._id + "'>Add Note</button><br><br><button class='view-note-button' data-id='" + data[i]._id + "'>View Notes</button><br><br>"

                          );
    }
  });

// Whenever someone clicks a button
$(document).on("click", ".add-note-button", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.newsTitle + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.noteTitle);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.noteBody);
      }
    });
});
// Whenever someone clicks a button
$(document).on("click", ".view-note-button", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.newsTitle + "</h2>");
      // A div to enter existing note
      $("#notes").append("<div id='titlenote' name='title' >"+data.note.noteTitle+"</div>");
      // A div to add exsting note body
      $("#notes").append("<div id='bodynote' name='body'>"+data.note.noteBody+"</div>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.noteTitle);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.noteBody);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      noteTitle: $("#titleinput").val(),
      // Value taken from note textarea
      noteBody: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      alert("Saved");
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});


// hide alerts before DOM loads
$('#correctAlert').hide();
$('#incorrectAlert').hide();

// Once DOM loads
$(document).ready(function () {

    $("#checkAnswer").click(function () {

        // get the text from challenges.txt and put into 'answer' object
        $.get('challenges.txt', function (answer) {

            // compare user answer to txt file answer
            if ($("#userInput").val() == answer) {

                // show correct alert and hide incorrect alert
                $('#correctAlert').fadeIn();
                $('#incorrectAlert').hide();

                // maybe we should use a nav bar and it will pull from a specific file based on the tab selected
                // OR have the challenges seperated by *
                // read the entire file into a variable 
                // use another variable to get the text up to the *
                // when next is pressed, the next challenge is pulled 

            } else {

                // show incorrect alert and hide correct alert
                $('#incorrectAlert').fadeIn();
                $('#correctAlert').hide();
            }
        }, 'text');
    });


    $("#clearAnswer").click(function () {

        // deletes content in the textarea
        $("#userInput").val("");

        // hide alerts
        $('#correctAlert').fadeOut();
        $('#incorrectAlert').fadeOut();
    });

    $("#nextChallenge").click(function () {

        // deletes content in the textarea
        $("#userInput").val("");

        // hide alerts
        $('#correctAlert').fadeOut();
        $('#incorrectAlert').fadeOut();

        /* 
        get the next challenge from text file and display to #challengeQuestion
        */

    });


});
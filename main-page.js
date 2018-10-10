
// hide alerts before DOM loads
$('#correctAlert').hide();
$('#incorrectAlert').hide();

// Once DOM loads
$(document).ready(function () {

    // sets up editor after DOM loads
    var editor = ace.edit("editor");

    $("#HTMLTab").click(function () {

        // hide alerts
        $('#incorrectAlert').hide();
        $('#correctAlert').hide();

        // set editor mode and clear contents
        editor.session.setMode("ace/mode/html");
        editor.setValue("");

        // get question and display it
        $.get('js-challenge.txt', function (question) {
            $("#challengeQuestion").text('html question');
        }, 'text');
    });


    $("#CSSTab").click(function () {

        // hide alerts
        $('#incorrectAlert').hide();
        $('#correctAlert').hide();

        // set editor mode and clear contents
        editor.session.setMode("ace/mode/css");
        editor.setValue("");

        // get question and display it
        $.get('js-challenge.txt', function (question) {
            $("#challengeQuestion").text('css question');
        }, 'text');
    });


    $("#JSTab").click(function () {

        // hide alerts
        $('#incorrectAlert').hide();
        $('#correctAlert').hide();

        // set editor mode and clear contents
        editor.session.setMode("ace/mode/javascript");
        editor.setValue("");

        // get question and display it
        $.get('js-challenge.txt', function (question) {
            $("#challengeQuestion").text(question);
        }, 'text');
    });


    $("#checkAnswer").click(function () {

        // get the text from txt file and put into 'answer' object
        $.get('js-answers.txt', function (answer) {

            // compare user answer to txt file answer
            if (editor.getValue() == answer) {

                // show correct alert and hide incorrect alert
                $('#correctAlert').fadeIn();
                $('#incorrectAlert').hide();

                // maybe we should use a nav bar and it will pull from a specific file based on the tab selected
                // OR have the challenges seperated by *
                // read the entire file into a variable 
                // use another variable to get the text up to the *
                // when next is pressed, the next challenge is pulled 
                // im not sure, this is tricky

            } else {

                // show incorrect alert and hide correct alert
                $('#incorrectAlert').fadeIn();
                $('#correctAlert').hide();
            }
        }, 'text');
    });


    $("#clearAnswer").click(function () {

        // deletes content in the editor
        editor.setValue("");

        // hide alerts
        $('#correctAlert').fadeOut();
        $('#incorrectAlert').fadeOut();
    });

    $("#nextChallenge").click(function () {

        // deletes content in the editor
        editor.setValue("");

        // hide alerts
        $('#correctAlert').fadeOut();
        $('#incorrectAlert').fadeOut();

        /* 
            - get the next challenge from text file and display to #challengeQuestion
            - this is tricky
        */

    });


});
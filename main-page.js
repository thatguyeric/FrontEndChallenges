$(document).ready(function () {
    $('#correctAlert').hide();
    $('#incorrectAlert').hide();

    $("#checkAnswer").click(function () {
        /* pull from a text file or something to check if answer is correct
        if correct 
            $('#correctAlert').show();
        if incorrect 
            $('#incorrectAlert').show();
        */
    });

    // deletes content in the textarea
    $("#clearAnswer").click(function () {
        $("#userInput").val("");
    });

    $("#nextChallenge").click(function () {
        /* 
        get the next challenge from text file and display to #challengeQuestion
        */
    });
    

});
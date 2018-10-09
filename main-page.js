$(document).ready(function () {
    $('#correctAlert').hide();
    $('#incorrectAlert').hide();

    
    $("#checkAnswer").click(function () {
        // compare user answer to txt file answer
        // maybe we should use a nav bar and it will pull from a specific file based on the tab selected
        $.get('challenges.txt', function (answer) {
            if ($("#userInput").val() == answer) {

                // show correct alert and hide incorrect alert
                $('#correctAlert').fadeIn();
                $('#incorrectAlert').hide();
            } else {

                // show incorrect alert and hide correct alert
                $('#incorrectAlert').fadeIn();
                $('#correctAlert').hide();
            }
        }, 'text');
    });

    // deletes content in the textarea
    $("#clearAnswer").click(function () {
        $("#userInput").val("");

        // hide alerts
        $('#correctAlert').hide();
        $('#incorrectAlert').hide();
    });

    $("#nextChallenge").click(function () {
        $("#userInput").val("");

        // hide alerts
        $('#correctAlert').hide();
        $('#incorrectAlert').hide();
        
        /* 
        get the next challenge from text file and display to #challengeQuestion
        */
    });


});
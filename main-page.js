var answer;
var question;
var JSquestions = [];
var JSanswers = [];
var HTMLquestions = [];
var HTMLanswers = [];
var CSSquestions = [];
var CSSanswers = [];

// hide alerts before DOM loads
$('#correctAlert').hide();
$('#incorrectAlert').hide();

// Once DOM loads
$(document).ready(function () {

    /*******************
     *     buttons
     * *****************/

    $("#checkAnswer").click(function () {

        // compare user answer to txt file answer
        /*if (editor.getValue() == JSanswers[0]) {

            // show correct alert and hide incorrect alert
            $('#correctAlert').fadeIn();
            $('#incorrectAlert').hide();

        } else {

            // show incorrect alert and hide correct alert
            $('#incorrectAlert').fadeIn();
            $('#correctAlert').hide();
        } */
    });

    $("#clearAnswer").click(function () {

        // deletes content in the editor
        editor.setValue("");

        // hide alerts
        $('#correctAlert').fadeOut();
        $('#incorrectAlert').fadeOut();
    });

    /*******************
     *     tabs
     * *****************/
    
    $("#JSC1").click(function () {

        // hide alerts
        $('#incorrectAlert').hide();
        $('#correctAlert').hide();

        //display question
        $("#challengeQuestion").text(JSquestions[0]);

    });


    // sets up editor and enables preview
    var editor = ace.edit("editor");
    editor.session.setMode("ace/mode/html");
    editor.getSession().on('change', function () {
        $('#preview').contents().find('body').html(editor.getSession().getValue());
    });

    // enables smooth scrolling to elements
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500, 'linear');
    });

    // pulls all questions and answers into lists
    for (var i = 1; i < 4; i++) {
        var aFile = 'challenges/js-answers' + i + '.txt';
        $.get(aFile, function (a) {
            JSanswers.push(a);
        });

        var cFile = 'challenges/js-challenge' + i + '.txt';
        $.get(cFile, function (q) {
            JSquestions.push(q);
        });

        aFile = 'challenges/css-answers' + i + '.txt';
        $.get(aFile, function (a) {
            CSSanswers.push(a);
        });

        cFile = 'challenges/css-challenge' + i + '.txt';
        $.get(cFile, function (q) {
            CSSquestions.push(q);
        });

        aFile = 'challenges/html-answers' + i + '.txt';
        $.get(aFile, function (a) {
            HTMLanswers.push(a);
        });
        
        cFile = 'challenges/html-challenge' + i + '.txt';
        $.get(cFile, function (q) {
            HTMLquestions.push(q);
        });
    }

    console.log('answers, questions');
    console.log(JSanswers, JSquestions);
    console.log(HTMLanswers, HTMLquestions);
    console.log(CSSanswers, CSSquestions);

});
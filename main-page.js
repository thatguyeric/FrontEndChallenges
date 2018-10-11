var answer;
var question;
var JSquestions = [];
var JSanswers = [];
var HTMLquestions = [];
var HTMLanswers = [];
var CSSquestions = [];
var CSSanswers = [];

getChallenges();

// hide alerts before DOM loads
$('#correctAlert').hide();
$('#incorrectAlert').hide();

// sets up editor and enables preview
var editorHTML = ace.edit("editorHTML");
editorHTML.session.setMode("ace/mode/html");
var editorCSS = ace.edit("editorCSS");
editorCSS.session.setMode("ace/mode/css");
var editorJS = ace.edit("editorJS");
editorJS.session.setMode("ace/mode/javascript");
editorHTML.setReadOnly(true);
editorCSS.setReadOnly(true);
editorJS.setReadOnly(true);

// Once DOM loads
$(document).ready(function () {

    /*********************************************************************************
     *                                      tabs
     * *********************************************************************************/

    $("#JSC1").click(function () {

        // hide alerts
        $('#incorrectAlert').hide();
        $('#correctAlert').hide();

        //display question
        $("#challengeQuestion").text(JSquestions[0]);
        editorJS.setReadOnly(false);

    });

    $("#HTMLC1").click(function () {

        // hide alerts
        $('#incorrectAlert').hide();
        $('#correctAlert').hide();

        //display question
        $("#challengeQuestion").text(HTMLquestions[0]);
        editorHTML.setReadOnly(false);

    });

    $("#CSSC1").click(function () {

        // hide alerts
        $('#incorrectAlert').hide();
        $('#correctAlert').hide();

        //display question
        $("#challengeQuestion").text(CSSquestions[0]);
        editorCSS.setReadOnly(false);

    });

    /*********************************************************************************
     *                                   buttons
     * *********************************************************************************/

    $("#checkAnswer").click(function () {

        var preview = document.getElementById('preview').contentWindow.document;
        preview.open();
        preview.write(
            "<style>" +
            editorCSS.getValue() +
            "</style>" +
            "<body>" +
            editorHTML.getValue() +
            "</body>" +
            "<script>" +
            editorJS.getValue() +
            "</script>"
        );
        preview.close();

    });

    $("#clearAnswer").click(function () {

        // deletes content in the editor
        editor.setValue("");

        // hide alerts
        $('#correctAlert').fadeOut();
        $('#incorrectAlert').fadeOut();
    });

});

// pulls all questions and answers into lists
function getChallenges() {
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
}
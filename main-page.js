var answer;
var question;

// the first one in each is for HTML challenge 1
// the second one in each is for CSS challenge 1
// the third one in each is for JS challenge 1
var JSchallenges = [];
var CSSchallenges = [];
var HTMLchallenges = [];
var challengeQuestions = [];

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

    $("#HTMLC1").click(function () {

        // hide alerts
        $('#incorrectAlert').hide();
        $('#correctAlert').hide();

        //display question and set read only for appropriate editors
        $("#challengeQuestion").text(challengeQuestions[0]);
        editorHTML.setReadOnly(false);
        editorCSS.setReadOnly(true);
        editorJS.setReadOnly(true);

        // clear text in editors
        editorHTML.setValue("");
        editorCSS.setValue("");
        editorJS.setValue("");

        // display the html and css for this challenge
        editorJS.setValue(JSchallenges[0]);
        editorCSS.setValue(CSSchallenges[0]);

    });

    $("#CSSC1").click(function () {

        // hide alerts
        $('#incorrectAlert').hide();
        $('#correctAlert').hide();

        //display question and set read only for appropriate editors
        $("#challengeQuestion").text(challengeQuestions[1]);
        editorCSS.setReadOnly(false);
        editorHTML.setReadOnly(true);
        editorJS.setReadOnly(true);

        // clear text in editors
        editorHTML.setValue("");
        editorCSS.setValue("");
        editorJS.setValue("");

        // display the html and css for this challenge
        editorJS.setValue(JSchallenges[1]);
        editorHTML.setValue(HTMLchallenges[1]);

    });

    $("#JSC1").click(function () {

        // hide alerts
        $('#incorrectAlert').hide();
        $('#correctAlert').hide();

        //display question and set read only for appropriate editors
        $("#challengeQuestion").text(challengeQuestions[2]);
        editorJS.setReadOnly(false);
        editorHTML.setReadOnly(true);
        editorCSS.setReadOnly(true);

        // clear text in editors
        editorHTML.setValue("");
        editorCSS.setValue("");
        editorJS.setValue("");

        // display the html and css for this challenge
        editorHTML.setValue(HTMLchallenges[2]);
        editorCSS.setValue(CSSchallenges[2]);
    });

    /*********************************************************************************
     *                                   buttons
     * *********************************************************************************/

    $("#checkAnswer").click(function () {

        var preview = document.getElementById('preview').contentWindow.document;
        preview.open();
        preview.writeln(
            `<style>
            ${editorCSS.getValue()}  
            </style>
            <script>
            ${editorJS.getValue()} 
            </script>
            ${editorHTML.getValue()}`
        );
        preview.close();
    });

    $("#clearAnswer").click(function () {

        // deletes content in the editor
        editorHTML.setValue("");
        editorCSS.setValue("");
        editorJS.setValue("");

        // hide alerts
        $('#correctAlert').fadeOut();
        $('#incorrectAlert').fadeOut();
    });

});

// pulls all questions and answers into lists
function getChallenges() {
    $.get('challenges/HTMLchallenge1-html.txt', function (a) {
        HTMLchallenges.push(a);
    });

    $.get('challenges/CSSchallenge1-html.txt', function (a) {
        HTMLchallenges.push(a);
    });

    $.get('challenges/JSchallenge1-html.txt', function (a) {
        HTMLchallenges.push(a);
    });

    $.get('challenges/HTMLchallenge1-css.txt', function (a) {
        CSSchallenges.push(a);
    });

    $.get('challenges/CSSchallenge1-css.txt', function (a) {
        CSSchallenges.push(a);
    });

    $.get('challenges/JSchallenge1-css.txt', function (a) {
        CSSchallenges.push(a);
    });

    $.get('challenges/HTMLchallenge1-js.txt', function (a) {
        JSchallenges.push(a);
    });

    $.get('challenges/CSSchallenge1-js.txt', function (a) {
        JSchallenges.push(a);
    });

    $.get('challenges/JSchallenge1-js.txt', function (a) {
        JSchallenges.push(a);
    });

    $.get('challenges/HTMLchallenge1-question.txt', function (a) {
        challengeQuestions.push(a);
    });

    $.get('challenges/CSSchallenge1-question.txt', function (a) {
        challengeQuestions.push(a);
    });

    $.get('challenges/JSchallenge1-question.txt', function (a) {
        challengeQuestions.push(a);
    });
}
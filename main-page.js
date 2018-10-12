var answer;
var question;

// the first one in each is for HTML challenge 1
// the second one in each is for CSS challenge 1
// the third one in each is for JS challenge 1
var JSchallenges = [];
var CSSchallenges = [];
var HTMLchallenges = [];
var challengeQuestions = [];
<<<<<<< Updated upstream
=======

// holds the set of answers for the challenges
>>>>>>> Stashed changes
var HTMLanswers = [];
var CSSanswers = [];
var JSanswers = [];

getChallenges();
getAnswers();

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
<<<<<<< Updated upstream
        
        // hide alerts
        $('#incorrectAlert').hide();
        $('#correctAlert').hide();
=======
      
        hideAlerts(); 
        clearEditors();
>>>>>>> Stashed changes

        // set read only for appropriate editors
        setEditorsToReadOnly(false, true, true);


        // display the question and supporting css and javascript for this challenge
        $("#challengeQuestion").text(challengeQuestions[0]);
        editorJS.setValue(JSchallenges[0]);
        editorCSS.setValue(CSSchallenges[0]);

    });

    $("#CSSC1").click(function () {

        hideAlerts();
        clearEditors();

        // set read only for appropriate editors
        setEditorsToReadOnly(true, false, true);

        // display the question and supporting html and javascript for this challenge
        $("#challengeQuestion").text(challengeQuestions[1]);
        editorJS.setValue(JSchallenges[1]);
        editorHTML.setValue(HTMLchallenges[1]);

    });

    $("#JSC1").click(function () {

        hideAlerts();
        clearEditors();
        
        // set read only for appropriate editors
        setEditorsToReadOnly(true, true, false);

        // display the html and css for this challenge
        $("#challengeQuestion").text(challengeQuestions[2]);
        editorHTML.setValue(HTMLchallenges[2]);
        editorCSS.setValue(CSSchallenges[2]);
    });

    /*********************************************************************************
     *                                   buttons
     * *********************************************************************************/

    $("#checkAnswer").click(function () {
        checkAnswer();
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
        clearEditors();
        hideAlerts();
        clearPreview();
    });

});

function clearPreview(){
    var preview = document.getElementById('preview').contentWindow.document;
    preview.open();
    preview.writeln(``);
    preview.close();
}

// Depending on the question, set the editors that do not require user input to read only
function setEditorsToReadOnly(html, css, js){
    editorHTML.setReadOnly(html);
    editorCSS.setReadOnly(css);
    editorJS.setReadOnly(js);
}

function hideAlerts(){
    $('#correctAlert').fadeOut();
    $('#incorrectAlert').fadeOut(); 
}

function clearEditors(){
    let currentEditor = getCurrentEditor();
    
    switch(currentEditor){
        case "editorHTML":
            editorHTML.setValue("");
            clearPreview();
            break;
        case "editorCSS":
            editorCSS.setValue("");
            clearPreview();
            break;
        case "editorJS":
            editorJS.setValue("");
            clearPreview();
            break;
        default:
            break;
    }
}

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

function getAnswers(){
    $.get('answers/HTMLanswers.txt', function (a) {
        HTMLanswers.push(a);
    });

    $.get('answers/CSSanswers.txt', function (a) {
        HTMLanswers.push(a);
    });

    $.get('answers/JSanswers.txt', function (a) {
        HTMLanswers.push(a);
    });
}

// Using the ID(id attribute) of the question selected by the user, populate the 
// 'current-question' attribute on the appropriate editor.
function setQuestion(questionID){
    setEditorFromQuestionID(questionID);
    let currentEditor = getCurrentEditor();
    document.getElementById(currentEditor).setAttribute('current-question', questionID);
}

// Make the editor-container aware of which editor the user is currently working in.
function setEditorFromQuestionID(questionID){
    let editor = "";

    switch(questionID){
        case "HTMLC1":
            editor = "editorHTML";
            break;
        case "HTMLC1":
            editor = "editorCSS";
            break;
        case "HTMLC1":  
            editor = "editorJS";
            break;
        default:
            break;
    }
    document.getElementById("editor-container").setAttribute('current-editor', editor);
}

// Return the current editor
function getCurrentEditor(){
    return document.getElementById("editor-container").getAttribute('current-editor')
}

// Return the current question
function getCurrentQuestion(currentEditor){
    return document.getElementById(currentEditor).getAttribute('current-question');
}

// Return the user's answer, with all whitespace removed
function getUserAnswer(){
    let currentEditor = getCurrentEditor();

    switch(currentEditor){
        case "editorHTML":  
            return editorHTML.getValue().replace(/\s/g, '');
        case "editorCSS":  
            return editorCSS.getValue().replace(/\s/g, '');
        case "editorJS":  
            return editorJS.getValue().replace(/\s/g, '');
        default:
            break;
    }
}

// Check the user's answer with the pre-generated answer(s)
function checkAnswer(){
    let currentEditor = getCurrentEditor();
    let currentQuestion = getCurrentQuestion(currentEditor);
    let correctAnswer = getCorrectAnswer(currentQuestion);
    let userAnswer = getUserAnswer();

    if(userAnswer === correctAnswer){
        //alert("Correct!");
        $('#correctAlert').show(); 
    }else{
        //alert("Sorry, you're answer is incorrect.");
        $('#incorrectAlert').show();
    }
}

// Return the correct answer(s) for the current question
function getCorrectAnswer(questionID){
    let answerIndex = parseInt(questionID.charAt(questionID.length-1) - 1);

    switch(questionID){
        case "HTMLC1":
            return HTMLanswers[answerIndex].replace(/\s/g, '');
        case "HTMLC1":
            return CSSanswers[answerIndex].replace(/\s/g, '');
        case "HTMLC1":  
            return JSanswers[answerIndex].replace(/\s/g, '');
        default:
            break;
    }
}
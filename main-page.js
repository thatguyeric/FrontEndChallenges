var answer;
var question;

var JSchallenges = [];
var CSSchallenges = [];
var HTMLchallenges = [];
var challengeQuestions = [];
var HTMLanswers = [];
var CSSanswers = [];
var JSanswers = [];

var editorHTML = ace.edit("editorHTML");
editorHTML.session.setMode("ace/mode/html");

var editorCSS = ace.edit("editorCSS");
editorCSS.session.setMode("ace/mode/css");

var editorJS = ace.edit("editorJS");
editorJS.session.setMode("ace/mode/javascript");

editorHTML.setReadOnly(true);
editorCSS.setReadOnly(true);
editorJS.setReadOnly(true);

getChallengeQuestions();
getHTMLchallenges();
getJSchallenges();
getCSSchallenges();
getAnswers();
hideAlerts();
clearAllEditors();

// Once DOM loads
$(document).ready(function () {

    /*********************************************************************************
     *                                      tabs
     * *********************************************************************************/

    $("#HTMLC1").click(function () {
      
        hideAlerts(); 
        clearEditors();

        // set read only for appropriate editors
        setEditorsToReadOnly(false, true, true);

        // display the question and supporting css and javascript for this challenge
        $("#challengeQuestion").text(challengeQuestions[0]);

        // display the html and css for this challenge
        editorCSS.setValue(HTMLchallenges[0]);
        editorJS.setValue(HTMLchallenges[1]);


    });

    $("#CSSC1").click(function () {

        hideAlerts();
        clearEditors();

        // set read only for appropriate editors
        setEditorsToReadOnly(true, false, true);

        // display the question and supporting html and javascript for this challenge
        $("#challengeQuestion").text(challengeQuestions[1]);
       
        // display the html and JS for this challenge
        editorHTML.setValue(CSSchallenges[0]);
        editorJS.setValue(CSSchallenges[1]);


    });

    $("#JSC1").click(function () {

        hideAlerts();
        clearEditors();
        
        // set read only for appropriate editors
        setEditorsToReadOnly(true, true, false);

        // display the html and css for this challenge
        $("#challengeQuestion").text(challengeQuestions[2]);
        editorHTML.setValue(JSchallenges[0]);
        editorCSS.setValue(JSchallenges[1]);

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

function getAnswers() {
    $.get('challenges/HTMLchallenge1-html.txt', function (a) {
        HTMLanswers.push(a);
    });

    $.get('challenges/JSchallenge1-js.txt', function (a) {
        JSanswers.push(a);
    });

    $.get('challenges/CSSchallenge1-css.txt', function (a) {
        CSSanswers.push(a);
    });

}

function getChallengeQuestions() {
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

function getCSSchallenges() {
    $.get('challenges/CSSchallenge1-html.txt', function (a) {
        CSSchallenges.push(a);
    });

    $.get('challenges/CSSchallenge1-js.txt', function (a) {
        CSSchallenges.push(a);
    });
}

function getHTMLchallenges() {
    $.get('challenges/HTMLchallenge1-css.txt', function (a) {
        HTMLchallenges.push(a);
    });

    $.get('challenges/HTMLchallenge1-js.txt', function (a) {
        HTMLchallenges.push(a);
    });
}

function getJSchallenges() {
    $.get('challenges/JSchallenge1-html.txt', function (a) {
        JSchallenges.push(a);
    });

    $.get('challenges/JSchallenge1-css.txt', function (a) {
        JSchallenges.push(a);
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
     if (userAnswer === correctAnswer) {
        $('#correctAlert').fadeIn();
        $('#incorrectAlert').hide();
    } else {
        $('#correctAlert').hide();
        $('#incorrectAlert').fadeIn();
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

function clearAllEditors() {
    editorHTML.setValue("");
    editorCSS.setValue("");
    editorJS.setValue("");
}

function hideAlerts() {
    $('#incorrectAlert').hide();
    $('#correctAlert').hide();
}
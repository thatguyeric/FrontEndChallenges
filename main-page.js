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

// Once DOM loads
$(document).ready(function () {

    /*********************************************************************************
     *                                      tabs
     * *********************************************************************************/

    $("#HTMLC1").click(function () {

        hideAlerts();

        //display question and set read only for appropriate editors
        $("#challengeQuestion").text(challengeQuestions[0]);
        editorHTML.setReadOnly(false);
        editorCSS.setReadOnly(true);
        editorJS.setReadOnly(true);

        // clear text in editors
        clearAllEditors();

        // display the html and css for this challenge
        editorCSS.setValue(HTMLchallenges[0]);
        editorJS.setValue(HTMLchallenges[1]);

    });

    $("#CSSC1").click(function () {

        hideAlerts();

        //display question and set read only for appropriate editors
        $("#challengeQuestion").text(challengeQuestions[1]);
        editorCSS.setReadOnly(false);
        editorHTML.setReadOnly(true);
        editorJS.setReadOnly(true);

        // clear text in editors
        clearAllEditors();

        // display the html and JS for this challenge
        editorHTML.setValue(CSSchallenges[0]);
        editorJS.setValue(CSSchallenges[1]);

    });

    $("#JSC1").click(function () {

        hideAlerts();

        //display question and set read only for appropriate editors
        $("#challengeQuestion").text(challengeQuestions[2]);
        editorJS.setReadOnly(false);
        editorHTML.setReadOnly(true);
        editorCSS.setReadOnly(true);

        // clear text in editors
        clearAllEditors();

        // display the html and css for this challenge
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

        // hide alerts
        $('#correctAlert').fadeOut();
        $('#incorrectAlert').fadeOut();
    });

});

// pulls all questions and answers into lists
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

function setQuestion(questionID) {
    setEditorFromQuestionID(questionID);
    let currentEditor = getCurrentEditor();
    document.getElementById(currentEditor).setAttribute('current-question', questionID);
}

function setEditorFromQuestionID(questionID) {
    let editor = "";

    if (questionID == "HTMLC1")
        editor = "editorHTML";
    else if (questionID == "CSSC1")
        editor = "editorCSS";
    else if (questionID = "JSC1")
        editor = "editorJS";

    document.getElementById("editor-container").setAttribute('current-editor', editor);
}

function getCurrentEditor() {
    return document.getElementById("editor-container").getAttribute('current-editor')
}

function getCurrentQuestion(currentEditor) {
    return document.getElementById(currentEditor).getAttribute('current-question');
}

function getUserAnswer() {
    let currentEditor = getCurrentEditor();
    if (currentEditor == 'editorHTML')
        return editorHTML.getValue().replace(/\s/g, '');
    else if (currentEditor == 'editorCSS')
        return editorCSS.getValue().replace(/\s/g, '');
    else if (currentEditor == 'editorJS')
        return editorJS.getValue().replace(/\s/g, '');
    return document.getElementById(currentEditor).innerText;
}

function checkAnswer() {
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

function getCorrectAnswer(question) {
    let answerIndex = parseInt(question.charAt(question.length - 1) - 1);
    if (question == "HTMLC1") {
        return HTMLanswers[answerIndex].replace(/\s/g, '');
    } else if (question == "CSSC1") {
        return CSSanswers[answerIndex].replace(/\s/g, '');
    } else if (question == "JSC1") {
        return JSanswers[answerIndex].replace(/\s/g, '');
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
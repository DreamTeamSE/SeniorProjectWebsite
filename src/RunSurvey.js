import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import React, { useEffect } from 'react';
import 'survey-core/defaultV2.min.css';
import './App.css';

// handles the running of the survey
function RunSurvey(props) {
  // receives the survey json and survey name
  const surveyJson = props.data;
  const tabTitle = props.title;

  // based on the passed in survey name in App.js the tab title will change to reflect it
  useEffect(() => {
    document.title = tabTitle;
  }, [tabTitle]); 

  // creates a survey model from the passed in json
  const survey = new Model(surveyJson);

  let timerStarted = false;
  let results = [];

  // whenever a question is rendered, check if the page is 1, if it is and the timer hasn't started, start it
  survey.onAfterRenderQuestion.add(function() {
    if (survey.currentPageNo === 1) {
      if (timerStarted === false) {
        survey.startTimer();
        timerStarted = true;
      }
    }
  })

  // whenever the current page is changing, if the user is back tracking clear their responses on the previous page
  survey.onCurrentPageChanging.add(function(sender, options) {
    if (options.isPrevPage === true) {
      options.oldCurrentPage.questions.forEach(function(question) {
        question.value = undefined;
      })

      // additionally, check if the previous page was a result, and remove it from the result array
      if(options.oldCurrentPage.getQuestionByName("meetsCriteria") !== -1){
        results.splice(results.length - 1);
      }
    }
  })

  // checks if the current page has a result presented on it
  function checkResultVisibility(resultName, options){
    if(options.newCurrentPage.questions.indexOf(survey.getQuestionByName(resultName)) !== -1 && survey.getQuestionByName(resultName).isVisible){
      return true;
    }

    return false;
  }

  // whenever a page is changed check if a result is visible, and then add it to the results array if it is
  survey.onCurrentPageChanged.add(function(sender, options) {
    if(checkResultVisibility("meetsCriteria", options)){
      results.push(1);
    }
    if(checkResultVisibility("doesNotMeetCriteria", options)){
      results.push(2);
    }
    if(checkResultVisibility("geneticCounselor", options)){
      results.push(3);
    }
    if(checkResultVisibility("familyTract", options)){
      results.push(4);
    }
    if(checkResultVisibility("germlineTesting", options)){
      results.push(5);
    }
    if(checkResultVisibility("premm", options)){
      results.push(6);
    }
  })

  // handles the completion of the survey
  survey.onComplete.add(function() {
      // stops the timer and stores the time in a hidden question in the survey so it can stored in the SurveyJS dashboard
      survey.stopTimer();
      timerStarted = false;
      survey.getQuestionByName("surveytime").value = survey.timeSpent;

      // Determines end recommendation for the patient
      let resultText = "";

      // builds a string to hold all of the result information
      for(let i = 0; i < results.length; i++){
        if(resultText.length !== 0){
          resultText += " and ";
        }

        if(results[i] === 1){
          resultText += "Has met the criteria for screening";
        }
        else if(results[i] === 2){
          resultText += "Has not meet the criteria for screening";
        }
        else if(results[i] === 3){
          resultText += "Should speak to a genetic counselor";
        }
        else if(results[i] === 4){
          resultText += "Should be taken down the Family Hx Tract"
        }
        else if(results[i] === 5){
          resultText += "Should be considered for Germline testing";
        }
        else if(results[i] === 6){
          resultText += "Doesn't meet criteria but consider risk mod PREMM";
        }
      }

      // sets a hidden result question equal to the built result string so that it can be sent to the SurveyJS dashboard
      survey.getQuestionByName("endResult").value = resultText;
  });

  // whenever a result is sent to SurveyJS, the survey needs to be reset and the results need to be emptied
  survey.onSendResult.add(function(sender, options){
    if(options.success){
      survey.clear();
      survey.render();
      results = [];
    }
  });

  return <Survey model={survey}/>
}

export default RunSurvey;

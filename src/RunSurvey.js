import 'survey-core/defaultV2.min.css';
import './App.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { useNavigate } from "react-router-dom";

function RunSurvey(props) {
  const surveyJson = props.data;
  const navigate = useNavigate();

  const survey = new Model(surveyJson);
  survey.css = myCss;

  let timerStarted = false;
  let results = [];

  survey.onAfterRenderQuestion.add(function() {
    if (survey.currentPageNo === 1) {
      if (timerStarted === false) {
        survey.startTimer();
        timerStarted = true;
      }
    }
  })

  survey.onCurrentPageChanging.add(function(sender, options) {
    if (options.isPrevPage === true) {
      options.oldCurrentPage.questions.forEach(function(question) {
        question.value = undefined;
      })

      if(options.oldCurrentPage.getQuestionByName("meetsCriteria") !== -1){
        results.splice(results.length - 1);
      }
    }
  })

  function checkResultVisibility(resultName, options){
    if(options.newCurrentPage.questions.indexOf(survey.getQuestionByName(resultName)) !== -1 && survey.getQuestionByName(resultName).isVisible){
      return true;
    }

    return false;
  }

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

  survey.onComplete.add(function() {
      survey.stopTimer();
      timerStarted = false;
      survey.getQuestionByName("surveytime").value = survey.timeSpent;

      let resultText = "";

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
          navigate('/familyhx'); //redirects to familyHx if this is the result. Can be taken out if we don't want to automatically redirect. See App.js
        }
        else if(results[i] === 5){
          resultText += "Should be considered for Germline testing";
        }
        else if(results[i] === 6){
          resultText += "Doesn't meet criteria but consider risk mod PREMM";
        }
      }

      survey.getQuestionByName("endResult").value = resultText;
  });

  survey.onSendResult.add(function(sender, options){
    if(options.success){ //not sure if clear and render are needed here for consistency of results so this might need fixing
      //survey.clear();
      //survey.render();
      results = [];
    }
  });

  return (
      <>
        <Survey model={survey}/>
        <button className="personal-hx-btn" onClick={() => navigate('/')}>Personal Hx Tract</button>
        <button className="family-hx-btn" onClick={() => navigate('/familyhx')}>Family Hx Tract</button>
      </>
  );
  //return <Survey model={survey}/>
}

export default RunSurvey;

var myCss = {
  question: {
    content: "content-text",
    title: "question-text",
  }
};

import 'survey-core/defaultV2.min.css';
import './App.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
  
function RunSurvey(props) {
  const surveyJson = props.data;

  const survey = new Model(surveyJson);
  survey.css = myCss;
  
  let timerStarted = false;
  // let result = -1;
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
    }
  })

  survey.onCurrentPageChanged.add(function(sender, options) {
    if(options.newCurrentPage.questions.indexOf(survey.getQuestionByName("meetsCriteria")) !== -1 && survey.getQuestionByName("meetsCriteria").isVisible){
      // result = 1;
      results.push(1);
      console.log("MC");
    }
    if(options.newCurrentPage.questions.indexOf(survey.getQuestionByName("doesNotMeetCriteria")) !== -1 && survey.getQuestionByName("doesNotMeetCriteria").isVisible){
      // result = 2;
      results.push(2);
      console.log("DMC");
    }
    if(options.newCurrentPage.questions.indexOf(survey.getQuestionByName("geneticCounselor")) !== -1 && survey.getQuestionByName("geneticCounselor").isVisible){
      // result = 3;
      results.push(3);
      console.log("GC");
    }
    if(options.newCurrentPage.questions.indexOf(survey.getQuestionByName("familyTract")) !== -1 && survey.getQuestionByName("familyTract").isVisible){
      // result = 4;
      results.push(4);
      console.log("FT");
    }
    if(options.newCurrentPage.questions.indexOf(survey.getQuestionByName("germlineTesting")) !== -1 && survey.getQuestionByName("germlineTesting").isVisible){
      // result = 5;
      results.push(5);
      console.log("GT");
    }
    if(options.newCurrentPage.questions.indexOf(survey.getQuestionByName("premm")) !== -1 && survey.getQuestionByName("premm").isVisible){
      // result = 6;
      results.push(6);
      console.log("PREMM");
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
        }
        else if(results[i] === 5){
          resultText += "Should be considered for Germline testing";
        }
        else if(results[i] === 6){
          resultText += "Doesn't meet criteria but consider risk mod PREMM";
        }
      }

      survey.getQuestionByName("endResult").value = resultText;

      /*
      if(result === 1){
        survey.getQuestionByName("endResult").value = "Has met the criteria for screening";
      }
      else if(result === 2){
        survey.getQuestionByName("endResult").value = "Has not meet the criteria for screening";
      }
      else if(result === 3){
        survey.getQuestionByName("endResult").value = "Should speak to a genetic counselor";
      }
      else if(result === 4){
        survey.getQuestionByName("endResult").value = "Should be taken down the Family Hx Tract";
      }
      else if(result === 5){
        survey.getQuestionByName("endResult").value = "Should be considered for Germline testing";
      }
      else if(result === 6){
        survey.getQuestionByName("endResult").value = "Doesn't meet criteria but consider risk mod PREMM";
      }
    */
  });

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

var myCss = {
  question: {
    content: "content-text",
    title: "question-text",
  }
};
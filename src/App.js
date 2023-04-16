import 'survey-core/defaultV2.min.css';
import './App.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

// Personal Hx Testing Referral Eligibility (Experimental)
const surveyJson = {
  "surveyId": "ca2e1aa0-e865-440b-9a5d-7452852d6a2a",
  "surveyResultId": "f797bd01-c13b-453d-b9e1-8e6c6a6c1f90",
  "surveyPostId": "aca99aaa-d33f-45ba-b77f-bf2f85a430b3"
}

function App() {
  const survey = new Model(surveyJson);
  // survey.css = myCss;
 
  let timerStarted = false;
  let result = -1;

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
    if(survey.getQuestionByName("meetsCriteria").isVisible && options.newCurrentPage.questions.indexOf(survey.getQuestionByName("meetsCriteria")) !== -1){
      result = 1;
    }
    else if(survey.getQuestionByName("doesNotMeetCriteria").isVisible && options.newCurrentPage.questions.indexOf(survey.getQuestionByName("doesNotMeetCriteria")) !== -1){
      result = 2;
    }
    else if(survey.getQuestionByName("geneticCounselor").isVisible && options.newCurrentPage.questions.indexOf(survey.getQuestionByName("geneticCounselor")) !== -1){
      result = 3;
    }
    else if(survey.getQuestionByName("familyTract").isVisible && options.newCurrentPage.questions.indexOf(survey.getQuestionByName("familyTract")) !== -1){
      result = 4;
    }
    else if(survey.getQuestionByName("germlineTesting").isVisible && options.newCurrentPage.questions.indexOf(survey.getQuestionByName("germlineTesting")) !== -1){
      result = 5;
    }
  })

  survey.onComplete.add(function() {
      survey.stopTimer();
      timerStarted = false;
      survey.getQuestionByName("surveytime").value = survey.timeSpent;

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
  });

  survey.onSendResult.add(function(sender, options){
    if(options.success){
      survey.clear();
      survey.render();
    }
  });

  return <Survey model={survey}/>
}

export default App;

// var myCss = {
//   question: {
//     content: "content-text",
//     title: "question-text",
//   }
// };

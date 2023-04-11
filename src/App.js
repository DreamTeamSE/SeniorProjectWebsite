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
  survey.css = myCss;
 
  let timerStarted = false;

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

  survey.onComplete.add(function() {
      survey.stopTimer();
      timerStarted = false;
      survey.getQuestionByName("surveytime").value = survey.timeSpent;
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

var myCss = {
  question: {
    content: "content-text",
    title: "question-text",
  }
};

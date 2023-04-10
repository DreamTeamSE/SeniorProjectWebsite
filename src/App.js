import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

// Personal Hx Testing Referral Eligibility (Current)
// const oldSurveyJson = {
//   "surveyId": "7765f129-0ddd-4eee-8aa3-4c6de2f5c40c",
//   "surveyPostId": "ef9e0428-0d08-4349-b31f-ed918614c025"
// }

// Personal Hx Testing Referral Eligibility (Experimental)
const surveyJson = {
  "surveyId": "ca2e1aa0-e865-440b-9a5d-7452852d6a2a",
  "surveyPostId": "aca99aaa-d33f-45ba-b77f-bf2f85a430b3"
}

function App() {
  const survey = new Model(surveyJson);
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

  survey.onComplete.add(function(){
    survey.stopTimer();
    timerStarted = false;
    console.log("Time spent: ", survey.timeSpent);
  });

  survey.onSendResult.add(function(sender, options){
    if(options.success){
      survey.clear();
      survey.render();
    }
  });

  return <Survey model={survey}></Survey>
}

export default App;

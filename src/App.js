import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

const surveyJson = {
  "surveyId": "7765f129-0ddd-4eee-8aa3-4c6de2f5c40c",
  "surveyPostId": "ef9e0428-0d08-4349-b31f-ed918614c025"
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

  return <Survey model={survey}></Survey>
}

export default App;

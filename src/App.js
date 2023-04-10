import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard.js';

// Personal Hx Testing Referral Eligibility (Current)
// const oldSurveyJson = {
//   "surveyId": "7765f129-0ddd-4eee-8aa3-4c6de2f5c40c",
//   "surveyPostId": "ef9e0428-0d08-4349-b31f-ed918614c025"
// }

// Personal Hx Testing Referral Eligibility (Experimental)
export const surveyJson = {
  "surveyId": "96c0bc3c-d4c0-471d-8be3-b2bc94047645",
  "surveyPostId": "4ee7e29b-cf4a-414e-9bcb-c0e3f0021fbb"
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Survey model={survey}></Survey>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App;

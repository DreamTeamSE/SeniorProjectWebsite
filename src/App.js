import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import personalHx from './personalHx.json';
import familyHx from './familyHx.json';
import RunSurvey from './RunSurvey';

function App() {
  const handleSurveyComplete = (surveyResults) => {
    const resultText = surveyResults.getQuestionByName("endResult").value;
    if (resultText.includes("Should be taken down the Family Hx Tract")) {
      return <Navigate to="/familyhx" />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RunSurvey data={personalHx} onComplete={handleSurveyComplete} />} />
        <Route path="/familyhx" element={<RunSurvey data={familyHx} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



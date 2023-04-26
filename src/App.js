import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// personalHx and familyHx contain the json needed to render the surveys from SurveyJS
// the full json's of each surveys can be found in surveys_raw from the base directory
import personalHx from './personalHx.json';
import familyHx from './familyHx.json';
import RunSurvey from './RunSurvey';

function App() {
  return (
    // BrowserRouter allows for multiple web paths to be accessible from the homepage
    // '/' or any invalid path will access the homepage, where the PersonalHx survey is rendered
    // '/familyhx' will access the familyHx page, where the FamilyHx survey is rendered
    <BrowserRouter>
      <Routes>
        <Route exact path= "/" element={<RunSurvey title = "PersonalHx Survey" data={personalHx} />} />
        <Route path= "/familyhx" element={<RunSurvey title = "FamilyHx Survey" data={familyHx}/>} />
        <Route path= "*" element={<Navigate to="/"/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import personalHx from './personalHx.json';
import familyHx from './familyHx.json';
import RunSurvey from './RunSurvey';

function App() {
  return (
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

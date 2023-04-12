import { BrowserRouter, Routes, Route } from "react-router-dom";
import personalHx from './personalHx.json';
import familyHx from './familyHx.json';
import RunSurvey from './RunSurvey';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<RunSurvey data={personalHx}/>} />
        <Route path = "/familyhx" element={<RunSurvey data={familyHx}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

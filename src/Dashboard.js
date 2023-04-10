import 'survey-analytics/survey.analytics.min.css';
import { useState, useEffect } from 'react';
import { Model } from 'survey-core';
import { VisualizationPanel } from 'survey-analytics';
import { surveyJson } from "./App.js";

const vizPanelOptions = {
    allowHideQuestions: false,
    // allowHideEmptyAnswers: true  // We may want this as true if the answers for the time question are weird
}

const tempSurveyJson = {
    "surveyId": "7765f129-0ddd-4eee-8aa3-4c6de2f5c40c",
    "surveyPostId": "ef9e0428-0d08-4349-b31f-ed918614c025"
}

export default function Dashboard() {
    const [survey, setSurvey] = useState(null);
    const [vizPanel, setVizPanel] = useState(null);

    if (!survey) {
        // const tempSurvey = new Model(tempSurveyJson);
        const tempSurvey = new Model(surveyJson);
        setSurvey(tempSurvey);
    }

    if (!vizPanel && !!survey) {
        loadSurveyResults("https://surveyjs.io/results/survey/d5d0b352-7a56-4f46-80a6-cadbbd3d3dce") //working URL
            .then((surveyResults) => {
                console.log(surveyResults);
                const tempVizPanel = new VisualizationPanel(
                    survey.data.getAllQuestions,
                    survey.getAllQuestions, // Maybe we can use a hidden question for time that takes open response and we submit answer for this question manually in App.JS
                    surveyResults,
                    vizPanelOptions
                );
                tempVizPanel.showHeader = false;
                setVizPanel(tempVizPanel);
            })
    }

    useEffect(() => {
        vizPanel.render(document.getElementById("surveyVizPanel"));
        return () => {
          document.getElementById("surveyVizPanel").innerHTML = "";
        }
      }, [vizPanel]);

    return (
        <div id="surveyVizPanel" />
    )
}

function loadSurveyResults (url) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', url);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.onload = () => {
        const response = request.response ? JSON.parse(request.response) : [];
        resolve(response);
      }
      request.onerror = () => {
        reject(request.statusText);
      }
      request.send();
    });
  }
[![Netlify Status](https://api.netlify.com/api/v1/badges/2fecfbac-729a-499c-90af-ebe5bfbd8ed4/deploy-status)](https://app.netlify.com/sites/runtimeterror-seniorproj/deploys)

# RuntimeTerror Senior Project

## Index 📖
1. [The Team](#team)
2. [Background](#background)
3. [Problem Domain](#domain)
4. [SurveyJS](#surveyjs)
5. [Installation](#installation)
6. [Usage](#usage)

<a name = "team"></a>
## The Team 🤝

Emily Jones, Jakob Melendez, Ashish Satyavarapu, Shruthi Krishnapuram, and James Nguyen

<a name = "background"></a>
## Background 🧠

TODO ASHISH OR SHRUTHI

<a name = "domain"></a>
## Problem Domain 🌎

Currently, the process for identifying whether a patient should be screened for hereditary cancer entails a physician asking a sequence of questions to the patient. These questions can be visualized as a decision tree since they rely on the patient's responses and eventually result in the patient either qualifying or not qualifying for additional screening for hereditary cancer. Due to the quantity of questions and the specific order in which they must be asked, the procedure is intricate and time-consuming, potentially leading physicians to overlook questions or make errors.

<a name = "surveyjs"></a>
## SurveyJS 📝

[SurveyJS](https://surveyjs.io) was used to build the two surveys, PersonalHx and FamilyHx, in order to take the complex process mentioned in the Background, pertaining to the decision trees and convert them into an easy to use web application. The raw json files for each survey, showing how extensive they are, is located in the [surveys_raw](https://github.com/jakobmelendez/SeniorProjectWebsite/tree/master/surveys_raw) folder in this repository.

<a name = "installation"></a>
## Installation 📥

To locally access this web application clone this repository in a desired directory on your computer.

```
git clone https://github.com/jakobmelendez/SeniorProjectWebsite.git
```

Open up the cloned repository in your desired IDE, for instance, Visual Studio Code.

Once in your IDE, navigate to the command line and be sure that you are currently in the cloned repository directory. From here you can run the following command to start the web application locally.

```
npm start
```
After running this command the web application will open in your default browser and will be able to be used.

<a name = "usage"></a>
## Usage 🖥️

To access the website in your browser, click the link presented in the "About" section on this repository page.

The webpage is currently being hosted on [Netlify](https://www.netlify.com/?utm_source=google&utm_medium=paid_search&utm_campaign=12755510784&adgroup=118788138897&utm_term=netlify&utm_content=aud-951962601255:kwd-309804753741&creative=514583565825&device=c&matchtype=b&location=9011698&gad=1&gclid=CjwKCAjwl6OiBhA2EiwAuUwWZWAxukQ1TKc8kBHbDjcxkxcUUOk-uPHodUJWCYf327ddS7URxrID2RoC-yAQAvD_BwE) and its build status is indicated in the above badge.

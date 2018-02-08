# 5.0 Requirements Specification

## 5.1 Introduction

This Software Requirements Specification (SRS) documents the requirements for the Generacer Website Application. Generacer is a web application built to parse number and natural language data from past horse races and render a representation of those races through JavaScript and HTML animation. Depending on the amount of data present, the application has default settings for tracks and horses, but as that information is made available by more detailed accounts and online descriptions of each race, the renditions will be closer to the real event.
The Generacer system architecture is comprised of a web browser-based user interface (front-end), a server (back-end), and a database. The front-end consists of webpages built for the main functions of the application: data input and race render presentation. The back-end and database will be designed to save data about different races and race tracks for future look up.

## 5.2 CSCI Components
- **5.2.1** Front-end CSC -- Web-based GUI for Generacer

  - **5.2.1.1** Navbar CSU -- Top console to display on each of the following pages

    - **5.2.1.1.1** Includes application logo and name

    - **5.2.1.1.2** Navigation options - Allows navigation to other pages in application

  - **5.2.1.2** Home page CSU -- Includes application logo and name

  - **5.2.1.3** About page CSU -- Describes the application

  - **5.2.1.4** Help page CSU -- Describes how to use the application

  - **5.2.1.5** Horse Race Knowledge page CSU -- Describes horse racing as a sport

  - **5.2.1.6** Input page CSU -- Allows input for race rendering

    - **5.2.1.6.1** Manual input module - Allows manual entry of race data

      - **5.2.1.6.1.1** Track data module

      - **5.2.1.6.1.2** Race condition data module

      - **5.2.1.6.1.3** Chart data module

      - **5.2.1.6.1.4** Summary data module

    - **5.2.1.6.2** Track lookup module - Allows looking up track data if it exists in the database

    - **5.2.1.6.3** Race lookup module - Allows looking up race that has previously been inputted and rendered

  - **5.2.1.7** Render page CSU -- Shows render of race based on input in Input page CSU
- **5.2.2** Back-end CSC -- server description

  - **5.2.2.1** Node JS CSU - modules for handling connections and serving web application

  - **5.2.2.2** API Routes CSU -- modules for handling requests to the server

    - **5.2.2.2.1** Save track info

    - **5.2.2.2.1** Get track info
- **5.2.3** Database CSC -- database components that will store the data

  - **5.2.3.1** Queries CSU -- modules will run queries on the stored data

## 5.3 Functional Requirements of CSC
The Generacer web application allows user to input data published after a horse race has concluded to render a representation of what the race likely looked like. This is more useful for older races for which video data does not exist. In the requirements that follow, "user" is understood to be any general individual who interacts with the application.

- **5.3.1** Front-end

  - **5.3.1.1** The front-end shall display a navigation bar (navbar) at the top of all pages

    - **5.3.1.1.1** The navbar shall include the Generacer logo that links to the home page

    - **5.3.1.1.2** The navbar shall include links to all of the applications pages (besides the render page)

    - **5.3.1.1.2.1** The navbar will highlight whichever page is currently displayed

  - **5.3.1.2** The front-end shall have a home page

    - **5.3.1.2.1** The home page shall include the Generacer logo and name

  - **5.3.1.3** The front-end shall have an about page

    - **5.3.1.3.1** The about page shall describe the application

  - **5.3.1.4** The front-end shall have a help page

    - **5.3.1.4.1** The help page shall describe how to use the application

      - **5.3.1.4.1.1** The description shall include how to use the input modules

      - **5.3.1.4.1.2** The description shall include how to use the track lookup module

  - **5.3.1.5** The front-end shall have a horse race knowledge page

    - **5.3.1.5.1** The horse race knowledge page shall describe the horse racing sport

    - **5.3.1.5.2**. The horse race knowledge page shall describe the results produced by a horse race with an example

  - **5.3.1.6** The front-end shall have an input page

    - **5.3.1.6.1** The input page shall have a manual input module

      - **5.3.1.6.1.1** The manual input modules shall have individual modules for the input of track data, race condition data, race chart data, and race summary data.

    - **5.3.1.6.2** The input page shall have a track lookup module

      - **5.3.1.6.2.1** The track lookup module allows users to lookup track data if that track data exists in the database from a previous entry.

    - **5.3.1.6.3** The input page shall have a race lookup module

      - **5.3.1.6.3.1** The race lookup module allows users to lookup race data if that race data exists in the database from a previous entry.

  - **5.3.1.7** The front-end shall have a render page

    - **5.3.1.7.1** The render page shall display an animation of the rendered race

    - **5.3.1.7.2** The render page shall have a linear representation of the race below the animation display

    - **5.3.1.7.3** The render page shall have floating modules for each horse in the race that indicate basic data of the horse

      - **5.3.1.7.3.1** Basic data includes position, speed, etc.
- **5.3.2** Back-end

  - **5.3.2.1** The back-end shall respond to requests made by the front-end

  - **5.3.2.2** The back-end shall make a network connection with the database

  - **5.3.2.3** The back-end shall forward queries from the front-end to the database

  - **5.3.2.4** The back-end shall forward results of database queries to the front-end

  - **5.3.2.5** The back-end shall perform data validation before sending queries to the database

    - **5.3.2.5.1** Validation will include verifying the requested data is of the correct format and verifying syntax (e.g. required fields).

  - **5.3.2.6 The back-end shall use Mongoose object modeling for MongoDB documents. 5.3.2.9** The back-end shall maintain a network log.

  - **5.3.2.7** The back-end network log shall track successful HTTP requests.

  - **5.3.2.8** The back-end network log shall track failed HTTP requests.

  - **5.3.2.9** The back-end shall respond with a 404 error code when a page or route is not found.

  - **5.3.2.10** The back-end shall respond with a 503 error code if the server is overloaded or under maintenance.

  - **5.3.2.11** The back-end shall respond with a 504 error code if the server is not receiving a response from the backend servers within the allotted time period.

  - **5.3.2.12** The back-end shall respond with a 200 code when an HTTP request is successfully made.

  - **5.3.2.13** The back-end shall have a REST API that can be called by the Frontend through an HTTP request.
- **5.3.3** Database

  - **5.3.3.1** The database shall use MongoDB as the database system.

  - **5.3.3.2** The database shall perform queries on stored data.

  - **5.3.3.3** The database shall store track data

    - **5.3.3.3.1** The track data shall include the track name, track distance, and track structure

  - **5.3.3.4** The database shall store race data

    - **5.3.3.4.1** The race data shall include a JSON file of the rendered keyframes of the race as well as all other metadata required for the render page to function.

  - **5.3.3.5** The database shall only be accessible through the Generacer wep application API

## 5.4 Performance Requirements of CSC
- **5.4.1** Acceptable navigation speeds

  - **5.4.1.1** Navigation between pages should take a minimal amount of time
- **5.4.2** Quick search query results

  - **5.4.2.1** Queried data should be returned from database in a minimal amount of time
- **5.4.3** Render speed

  - **5.4.3.1** The time between entering input data and displaying the rendered race should be minimal.

## 5.5 Project Environment Requirements
- **5.5.1** Development environment requirements

| Category | Requirement|
|----------|--------------------------------------------------------------------------------------|
|Front-end |JavaScript, HTML5 Canvas, Bootstrap                                                   |
|Back-end  |Node.js, npm, Express, Mocha, Jade, ESLint, Istanbul, Nodemon, Mongoose, parallelshell|
|Database  |MongoDB                                                                               |

- **5.5.2** Execution environment requirements

| Category | Requirement|
|----------|---------------------|
|Front-end |Web browser          |
|Back-end  |Cloud hosted server  |
|Database  |Cloud hosted database|

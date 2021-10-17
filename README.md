# STOEXPLORE WEB CLIENT

## Overview

A full fledge store management system for keep track of stocks available in your store, manage sales representative, keep track of sales and profit in real time and also a live chat system to communicate with sales representative.

## Dependencies

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux](https://redux.js.org/)
- [Ant Design](https://ant.design/)
- [Backend-Server-URL](https://storexplore.herokuapp.com/)
- [Backend-Repository](https://github.com/devugo/storexplore-server)

## Project Structure

Below shows the project structure;

```
    root
        - public ( Public assets live here )
        - src
            - components ( All reusable UI components in the application)
            - constants ( All unchangeable varibales are defined here )
            - helpers ( All helpers functions i.e regular functions and custom hooks )
            - images ( All project images )
            - interceptors ( Pre rendered components before the main component is rendered )
            - pages ( Pages associated to routes in the app )
            - models ( All entities / data structure )
            - scss ( Default SCSS stylings )
            - store ( Redux store containing the actions, reducers and custom API middleware )
            App.js ( Routing setup )
            index.js ( App entry point )
            .......

```

## Live Demo

- [Demo](https://storexplore-by-devugo.netlify.app).

#### Test Credentials

```
    Store Owner
    {
        "email": "test@gmail.com",
        "password": "Password1234,
    }
    
     
     Sale Manager
    {
        "email": "michael@gmail.com",
        "password": "Password1234,
    }
```

### Site Preview Images

#### Home Page Preview
![Home page](https://storexplore-by-devugo.netlify.app/home-preview.png)

#### Dashboard Page Preview
![Dashboard page](https://storexplore-by-devugo.netlify.app/dashboard-preview.png)

#### Sales Page Preview
![Sales page](https://storexplore-by-devugo.netlify.app/sales-preview.png)

#### Chats Page Preview
![Chats page](https://storexplore-by-devugo.netlify.app/chats-preview.png)

## How to run locally

### Clone the repository

- Run `git clone https://github.com/devugo/storexplore-web-client` on your terminal/cmd to pull the project

### Available Scripts

In the root project directory, you can run:

#### `yarn start` or `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

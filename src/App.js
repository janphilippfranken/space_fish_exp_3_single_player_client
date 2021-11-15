import './App.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Navigation from './components/Navigation/Navigation';
import navigationReducer from './store/reducers/navigation';
import currentParticipantReducer from './store/reducers/currentParticipant';
import currentRoomReducer from './store/reducers/currentRoom';
import conditionDataReducer from './store/reducers/conditionData';
import participantIDReducer from './store/reducers/participantID';
import participantTrainingReducer from './store/reducers/participantTraining';
import participantSocialTrainingReducer from './store/reducers/participantSocialTraining';
import participantSocialTrainingStructureReducer from './store/reducers/participantSocialTrainingStructure';
import generateToken from './utils/generate-token';
import { useEffect, useState } from 'react';
import HerokuFallback from './components/HerokuFallback/HerokuFallback';
import { herokuWarmUpFetch } from './herokuWarmUpFetch';

const participantToken = generateToken(5);

const rootReducer = combineReducers({
  navigation: navigationReducer,
  currentParticipant: currentParticipantReducer,
  currentRoom: currentRoomReducer,
  conditionData: conditionDataReducer,
  participantID: participantIDReducer,
  training: participantTrainingReducer,
  socialTraining: participantSocialTrainingReducer,
  socialTrainingStructure: participantSocialTrainingStructureReducer,
  participantToken: () => participantToken

});

// const store = createStore(rootReducer);

// function App() {
//   const [isHerokuReady, setIsHerokuReady] = useState(false);

//   useEffect(() => {
//     herokuWarmUpFetch(() => setIsHerokuReady(true));
//   }, []);

//   return (
//     <Provider store={store}>
//       {isHerokuReady?  <Navigation /> : <HerokuFallback />}
//       {/* {<HerokuFallback />} */}
//     </Provider>
//   );
// }

// export default App;

// import './App.css';
// import { createStore, combineReducers } from 'redux';
// import { Provider } from 'react-redux';
// import Navigation from './components/Navigation/Navigation';
// import navigationReducer from './store/reducers/navigation';
// import currentParticipantReducer from './store/reducers/currentParticipant';
// import currentRoomReducer from './store/reducers/currentRoom';
// import conditionDataReducer from './store/reducers/conditionData';
// import participantIDReducer from './store/reducers/participantID';
// import generateToken from './utils/generate-token';

// const participantToken = generateToken(5);

// const rootReducer = combineReducers({
//   navigation: navigationReducer,
//   currentParticipant: currentParticipantReducer,
//   currentRoom: currentRoomReducer,
//   conditionData: conditionDataReducer,
//   participantID: participantIDReducer,
//   participantToken: () => participantToken

// });

const store = createStore(rootReducer);

function App() {
  return (
      <Provider store={store}>
          <Navigation />
      </Provider>
  );
}

export default App;

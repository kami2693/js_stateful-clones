'use strict';

function transformStateWithClones(initialState, actions) {
  return actions.reduce((stateHistory, action) => {
    const prevState = stateHistory[stateHistory.length - 1] || initialState;
    let newState;

    switch (action.type) {
      case 'clear':
        newState = {};
        break;
      case 'addProperties':
        newState = { ...prevState, ...action.extraData };
        break;
      case 'removeProperties':
        newState = { ...prevState };

        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;
      default:
        newState = { ...prevState };
    }

    return [...stateHistory, newState];
  }, []);
}

module.exports = transformStateWithClones;

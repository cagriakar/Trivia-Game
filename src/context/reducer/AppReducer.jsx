function AppReducer(state, action) {
	switch (action.type) {
		case 'SET_GAMEMODE':
			return {
				...state,
				gameMode: action.payload
			}

		case 'SET_GAMEMODEPOINT':
			return {
				...state,
				gameMode: action.payload.gameMode,
				point: action.payload.pointChange
			}

		case 'SET_APIURL':
			return {
				...state,
				apiURL: action.payload
			}

		case 'START_GAME':
			return {
				...state,
				gameStarted: action.payload,
				loading: true
			}

		case 'API_ERROR':
			return {
				...state,
				loading: false,
				errorMessage: action.payload,
				questions: null
			}

		case 'GET_QUESTIONS':
			return {
				...state,
				loading: false,
				error: null,
				questions: action.payload
			}

		case 'HANDLE_JOKER':
			return {
				...state,
				hasJoker: action.payload.hasJoker,
				disabledKeys: action.payload.disabledKeys
			}

		case 'SET_USERANSWER':
			return {
				...state,
				userAnswer: action.payload,
				disabledKeys: null,
				hasJoker: state.hasJoker ? (state.questionIndex === 9 ? false : true) : false
			}

		case 'INCREASE_INDEX':
			return {
				...state,
				questionIndex: action.payload,
				userAnswer: null,
				isTimeOut: false,
				timesLeft: 15,
				disabledKeys: null
			}

		case 'SET_TOTALPOINTS':
			return {
				...state,
				totalPoints: action.payload
			}

		case 'SET_TIME':
			return {
				...state,
				timesLeft: action.payload
			}

		case 'SET_TIMEISOUT':
			return {
				...state,
				isTimeOut: action.payload
			}

		default:
			return state
	}
}

export default AppReducer

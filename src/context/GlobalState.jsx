import React, { createContext, useReducer } from 'react'
import axios from 'axios'

import { levelPoint } from '../assets/selectionOption'
import createRandomKeys from '../utils/createRandomKeys'

import AppReducer from './reducer/AppReducer.jsx'

// Initial State
const initialState = {
	questions: null,
	errorMessage: null,
	questionIndex: 0,
	userAnswer: null,
	apiURL: 'https://opentdb.com/api.php?amount=10&type=multiple',
	loading: false,
	gameStarted: false,
	gameMode: 'easy',
	point: 15,
	totalPoints: 0,
	hasJoker: true,
	disabledKeys: null,
	timesLeft: 15,
	isTimeOut: false
}

// Create Context
const GlobalContext = createContext(initialState)

//Provider component
function GlobalProvider(props) {
	const [state, dispatch] = useReducer(AppReducer, initialState)

	// Actions
	function setGameMode(parameter) {
		dispatch({
			type: 'SET_GAMEMODEPOINT',
			payload: { gameModeChange: parameter, pointChange: levelPoint[`${parameter}`] }
		})
	}

	function setApiURL(difficulty, category) {
		const newURL = state.apiURL + '&category=' + category + '&difficulty=' + difficulty
		dispatch({
			type: 'SET_APIURL',
			payload: newURL
		})
	}

	function startGame() {
		dispatch({
			type: 'START_GAME',
			payload: true
		})
	}

	async function getQuestions() {
		try {
			const apiResponse = await axios.get(state.apiURL)

			// using post response from axios
			const response = await apiResponse.data

			const responseCode = await response.response_code

			if (responseCode === 1) {
				throw new Error()
			}

			const res = await response.results

			await res.reduce((answers, result, currentIndex, arr) => {
				const { correct_answer, incorrect_answers } = result

				answers = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5)

				arr[currentIndex] = { ...arr[currentIndex], answers }

				return arr
			}, [])
			dispatch({
				type: 'GET_QUESTIONS',
				payload: res
			})
		} catch (err) {
			const errorMessages = [
				'Oops...',
				'Looks like there is not enough questions in Server for your selected category and difficulty',
				'Please try re-organize your selections'
			]
			dispatch({
				type: 'API_ERROR',
				payload: errorMessages
			})
		}
	}

	function handleJoker() {
		const { answers, correct_answer } = state.questions[state.questionIndex]

		const correctAnswerIndex = answers.indexOf(correct_answer)

		const jokerKeys = createRandomKeys(4, correctAnswerIndex)

		dispatch({
			type: 'HANDLE_JOKER',
			payload: { hasJoker: false, disabledKeys: jokerKeys }
		})
	}

	function setUserAnswer(parameter) {
		dispatch({
			type: 'SET_USERANSWER',
			payload: parameter
		})
	}

	function increaseQuestionIndex() {
		const newIndex = state.questionIndex + 1

		dispatch({
			type: 'INCREASE_INDEX',
			payload: newIndex
		})
	}

	function increaseTotalPoints() {
		//Problem here!!!!!!!!!!!!!
		console.log(state.timesLeft)
		const calculatedPoint = (state.point * (state.timesLeft - 1)) / state.point
		console.log(calculatedPoint)
		dispatch({
			type: 'SET_TOTALPOINTS',
			payload: state.totalPoints + calculatedPoint
		})
	}

	function handleTime() {
		dispatch({
			type: 'SET_TIME',
			payload: state.timesLeft - 1
		})
	}

	function timeIsOut() {
		dispatch({
			type: 'SET_TIMEISOUT',
			payload: true
		})
	}

	return (
		// passing all states into provider to use globally
		<GlobalContext.Provider
			value={{
				questions: state.questions,
				errorMessage: state.errorMessage,
				questionIndex: state.questionIndex,
				userAnswer: state.userAnswer,
				gameStarted: state.gameStarted,
				loading: state.loading,
				gameMode: state.gameMode,
				point: state.point,
				totalPoints: state.totalPoints,
				hasJoker: state.hasJoker,
				disabledKeys: state.disabledKeys,
				timesLeft: state.timesLeft,
				isTimeOut: state.isTimeOut,
				handleJoker,
				increaseTotalPoints,
				getQuestions,
				increaseQuestionIndex,
				setUserAnswer,
				setApiURL,
				setGameMode,
				startGame,
				handleTime,
				timeIsOut
			}}>
			{props.children}
		</GlobalContext.Provider>
	)
}

export { GlobalContext, GlobalProvider }

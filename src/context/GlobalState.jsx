import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import { defaultResponse } from '../assets/quests';
import { levelPoint } from '../assets/selectionOption';
import createRandomKeys from '../utils/createRandomKeys';
import AppReducer from './reducer/AppReducer.jsx';

const baseApiURL = 'https://opentdb.com/api.php?amount=10&type=multiple';

// Initial State
const initialState = {
	questions: null,
	errorMessage: null,
	questionIndex: 0,
	userAnswer: null,
	apiURL: baseApiURL,
	loading: false,
	gameStarted: false,
	gameCategory: null,
	gameDifficulty: 'easy',
	point: 15,
	totalPoints: 0,
	hasJoker: true,
	disabledKeys: null,
	timesLeft: 15,
	isTimeOut: false
};

// Create Context
const GlobalContext = createContext(initialState);

//Provider component
function GlobalProvider(props) {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// Actions
	function setGameDifficulty(selectedDifficulty) {
		dispatch({
			type: 'SET_GAME_DIFFICULTY',
			payload: {
				gameDifficulty: selectedDifficulty,
				point: levelPoint[`${selectedDifficulty}`]
			}
		});
	}

	function setGameCategory(selectedCategory) {
		dispatch({
			type: 'SET_GAME_CATEGORY',
			payload: selectedCategory
		});
	}

	function startGame() {
		dispatch({
			type: 'START_GAME',
			payload: true
		});
	}

	async function getQuestions() {
		const apiURLParameters = {
			params: {
				category: state.gameCategory,
				difficulty: state.gameDifficulty
			}
		};

		try {
			const apiResponse = await axios.get(baseApiURL, apiURLParameters);

			const response = await apiResponse.data;

			const responseCode = await response.response_code;

			if (responseCode !== 0) {
				throw new Error();
			}

			const res = await response.results;

			await res.reduce((answers, result, currentIndex, arr) => {
				const { correct_answer, incorrect_answers } = result;

				answers = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);
				arr[currentIndex] = { ...arr[currentIndex], answers };

				return arr;
			}, []);
			dispatch({
				type: 'GET_QUESTIONS',
				payload: res
			});
		} catch (err) {
			//as of 05.05.2020 there is no response from API, if so use defaultAnswers
			if (err.message === 'Network Error') {
				const res = defaultResponse.results;

				res.reduce((answers, result, currentIndex, arr) => {
					const { correct_answer, incorrect_answers } = result;

					answers = [...incorrect_answers, correct_answer].sort(
						() => Math.random() - 0.5
					);
					arr[currentIndex] = { ...arr[currentIndex], answers };

					return arr;
				}, []);
				dispatch({
					type: 'GET_QUESTIONS',
					payload: res
				});
				return;
			}

			const errorMessages = [
				'Oops...',
				'Looks like there is an error',
				'Please try re-organize your selections'
			];
			dispatch({
				type: 'API_ERROR',
				payload: errorMessages
			});
		}
	}

	function handleJoker() {
		// desructuring for easy reference
		const { answers, correct_answer } = state.questions[state.questionIndex];
		// find the correct answer index
		const correctAnswerIndex = answers.indexOf(correct_answer);
		// create 2 random number with custom function: createRandomKeys()
		const jokerKeys = createRandomKeys(4, correctAnswerIndex);

		dispatch({
			type: 'HANDLE_JOKER',
			payload: { hasJoker: false, disabledKeys: jokerKeys }
		});
	}

	function setUserAnswer(givenAnswer) {
		dispatch({
			type: 'SET_USER_ANSWER',
			payload: givenAnswer
		});
	}

	function increaseQuestionIndex() {
		const newIndex = state.questionIndex + 1;

		dispatch({
			type: 'INCREASE_INDEX',
			payload: newIndex
		});
	}

	function increaseTotalPoints(timesRemaining) {
		const calculatedPoint = (state.point * timesRemaining) / 15;
		dispatch({
			type: 'SET_TOTAL_POINTS',
			payload: state.totalPoints + calculatedPoint
		});
	}

	function timeIsOut() {
		dispatch({
			type: 'SET_TIME_IS_OUT',
			payload: true
		});
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
				gameCategory: state.gameCategory,
				gameDifficulty: state.gameDifficulty,
				point: state.point,
				totalPoints: state.totalPoints,
				hasJoker: state.hasJoker,
				disabledKeys: state.disabledKeys,
				isTimeOut: state.isTimeOut,
				handleJoker,
				increaseTotalPoints,
				getQuestions,
				increaseQuestionIndex,
				setUserAnswer,
				setGameCategory,
				setGameDifficulty,
				startGame,
				timeIsOut
			}}>
			{props.children}
		</GlobalContext.Provider>
	);
}

export { GlobalContext, GlobalProvider };

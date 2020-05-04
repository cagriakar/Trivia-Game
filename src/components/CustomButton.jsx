import React, { useContext } from 'react'
import { Button, Slide } from '@material-ui/core'
import { GlobalContext } from '../context/GlobalState'

// Powerful Button component handles almost every functionalities by its dynamic function binded to its onClick prop
const CustomButton = ({ ...props }) => {
	const {
		questionIndex,
		increaseQuestionIndex,
		userAnswer,
		setUserAnswer,
		disabledKeys,
		handleJoker,
		errorMessage,
		isTimeOut,
		timesLeft
	} = useContext(GlobalContext)

	const handleClick = (event) => {
		// check if joker-button clicked
		if (event.nativeEvent.path[0].id === 'joker-button') {
			// handle joker usage
			handleJoker()
		}
		// check if any error from API, turn back to root "/trivia" to select category and difficulty again
		else if (errorMessage) {
			window.location.replace('/trivia')
		}
		// check if user declared his answer
		else if (userAnswer) {
			// check if it was last question
			if (questionIndex === 9) {
				//turn back to root "/trivia" to select category and difficulty again
				window.location.replace('/trivia')
			}
			// it wasn't last question, then
			else {
				// handle to switch next question
				increaseQuestionIndex()
			}
		}
		// check if time is out or not
		else if (isTimeOut) {
			// handle to switch next question
			increaseQuestionIndex()
		}
		// none of all above, then
		else {
			console.log(`timesLeft: ${timesLeft}`)
			//handle to send the answer decalared by user to GlobalContext
			setUserAnswer(event.target.innerHTML)
		}
	}

	return (
		<Slide direction="up" in={true} timeout={500}>
			<Button
				color="primary"
				// check if any answers will be disabled or not, due to joker usage
				variant={disabledKeys?.has(props.id) ? 'outlined' : 'contained'}
				disabled={disabledKeys?.has(props.id) ? true : false}
				{...props}
				onClick={handleClick}>
				{props.buttontext}
			</Button>
		</Slide>
	)
}

export default CustomButton

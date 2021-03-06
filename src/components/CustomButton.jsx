import React, { useContext } from 'react';
import { Button, Slide } from '@material-ui/core';
import { GlobalContext } from '../context/GlobalState';

// Powerful Button component handles almost every functionalities by its dynamic function binded to its onClick prop
const CustomButton = ({ ...props }) => {
	const {
		questionIndex,
		increaseQuestionIndex,
		userAnswer,
		setUserAnswer,
		errorMessage,
		isTimeOut
	} = useContext(GlobalContext);

	const handleClick = (event) => {
		// check if any error from API, turn back to root "/trivia" to select category and difficulty again
		if (errorMessage) {
			window.location.replace('/trivia');
			return;
		}
		// check if user declared his answer
		if (userAnswer) {
			// check if it was last question
			if (questionIndex === 9) {
				//turn back to root "/trivia" to select category and difficulty again
				window.location.replace('/trivia');
				return;
			}
			// it wasn't last question, then
			// handle to switch next question
			return increaseQuestionIndex();
		}
		// check if time is out or not
		if (isTimeOut) {
			// handle to switch next question
			return increaseQuestionIndex();
		}
		// none of all above, then
		//handle to send the answer decalared by user to GlobalContext
		setUserAnswer(event.target.innerHTML);
	};

	return (
		<Slide direction="up" in={true} timeout={500}>
			<Button
				color="primary"
				// check if any answers will be disabled or not, due to joker usage
				variant="contained"
				{...props}
				onClick={handleClick}>
				{props.buttontext}
			</Button>
		</Slide>
	);
};

export default CustomButton;

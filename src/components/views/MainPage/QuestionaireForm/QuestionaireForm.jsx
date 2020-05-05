import React, { useState, useContext } from 'react';
import {
	Grid,
	Box,
	Paper,
	Typography,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormHelperText,
	Button,
	InputLabel,
	Select,
	MenuItem,
	Container,
	Slide,
	Divider,
	makeStyles
} from '@material-ui/core';
import { difficulties, categories } from '../../../../assets/selectionOption';
import { GlobalContext } from '../../../../context/GlobalState';

const useStyles = makeStyles({
	textFontFamily: {
		fontFamily: 'Rajdhani'
	}
});

const QuestionaireForm = () => {
	const classes = useStyles();

	const {
		gameCategory,
		setGameCategory,
		startGame,
		gameDifficulty,
		setGameDifficulty
	} = useContext(GlobalContext);

	// state: form validation error
	const [error, setError] = useState(null);

	// state: form validation error message
	const [helperText, setHelperText] = useState('Required');

	const handleRadioChange = (event) => {
		// handle to send difficulty selection to GlobalContext in order for usage in PointSystem
		setGameDifficulty(event.target.value);
	};

	const handleSelection = (event) => {
		// handle to send difficulty category to GlobalContext
		setGameCategory(event.target.value);
		// handle to change form validation error state
		setError(false);
		// handle to change form validation error message state
		setHelperText(`Questions will be in above selected category`);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// check if category selection is valid
		if (gameCategory) {
			// handle to start the game (state: just before to send a get request to API)
			startGame();
		} else {
			// category selection is invalid
			// handle to change form validation error message state
			setHelperText("Don't forget to choose a category");
			// handle to change form validation error state
			setError(true);
		}
	};

	return (
		<Grid container justify="center">
			{/* for better margin control */}
			<Grid item xs={1} />
			{/* for better margin control */}
			<Slide direction="up" in={true} timeout={500}>
				<Grid item container xs={10} style={{ maxWidth: '500px', opacity: 0.8 }}>
					<Grid item container justify="center" style={{ marginBottom: '1rem' }}>
						<Paper component={Box} p={2} style={{ flexGrow: '1' }}>
							<form onSubmit={handleSubmit} id="questionare-form">
								{/* difficulty selection part of Form  */}
								<Container component={Box} mb={2}>
									<FormControl component="fieldset" margin="dense">
										{/* Label */}
										<FormLabel component="legend">
											<Typography
												variant="overline"
												className={classes.textFontFamily}>
												Difficulty
											</Typography>
										</FormLabel>
										{/* Radio Selection */}
										<RadioGroup
											row
											aria-label="difficulty"
											name="difficulty"
											value={gameDifficulty}
											onChange={handleRadioChange}>
											{difficulties.map((difficulty, index) => (
												<FormControlLabel
													key={index}
													value={difficulty}
													control={<Radio />}
													label={
														<Typography
															className={classes.textFontFamily}
															style={{
																fontSize: '20px'
															}}>
															{difficulty}
														</Typography>
													}
													style={{
														marginLeft: '1rem'
													}}
												/>
											))}
										</RadioGroup>
									</FormControl>
								</Container>

								<Divider />
								{/* category selection part of Form  */}
								<Container>
									<FormControl component="fieldset" error={error}>
										{/* Legend for category selection */}
										<FormLabel component="legend">
											<Typography
												variant="subtitle1"
												className={classes.textFontFamily}>
												Select a Category
											</Typography>
										</FormLabel>
										<FormControl variant="outlined" error={error}>
											{/* DropDown Selection Label*/}
											<InputLabel
												id="category"
												error={false}
												style={{
													fontFamily: 'Rajdhani'
												}}>
												Category
											</InputLabel>
											{/* DropDown Selection */}
											<Select
												labelId="category"
												id="category"
												value={gameCategory ? gameCategory : ''}
												onChange={handleSelection}
												label="category"
												className={classes.textFontFamily}>
												{categories.map((category, index) => (
													<MenuItem
														key={index}
														value={category.value}
														className={classes.textFontFamily}>
														{category.description}
													</MenuItem>
												))}
											</Select>
											<FormHelperText className={classes.textFontFamily}>
												{helperText}
											</FormHelperText>
										</FormControl>
									</FormControl>
								</Container>
							</form>
						</Paper>
					</Grid>
				</Grid>
			</Slide>
			{/* for better margin control */}
			<Grid item xs={1} />
			{/* for better margin control */}
			<Grid container>
				<Slide direction="up" in={true} timeout={500}>
					<Button
						color="primary"
						variant="contained"
						type="submit"
						form="questionare-form"
						style={{ margin: 'auto', opacity: 0.8 }}>
						<Typography variant="button">Let's play</Typography>
					</Button>
				</Slide>
			</Grid>
		</Grid>
	);
};

export default QuestionaireForm;

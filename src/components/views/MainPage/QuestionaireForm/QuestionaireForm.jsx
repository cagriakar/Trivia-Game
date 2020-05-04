import React, { useState, useContext } from 'react'
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
	Divider
} from '@material-ui/core'
import { difficulties, categories } from '../../../../assets/selectionOption'
import { GlobalContext } from '../../../../context/GlobalState'

const QuestionaireForm = () => {
	const { setApiURL, startGame, setGameMode } = useContext(GlobalContext)

	// state: form selection difficulty
	const [value, setValue] = useState('easy')

	// state: form selection for category
	const [category, setCategory] = useState('')

	// state: form validation error
	const [error, setError] = useState(null)

	// state: form validation error message
	const [helperText, setHelperText] = useState('Required')

	const handleRadioChange = (event) => {
		// handle to send difficulty selection to GlobalContext
		setValue(event.target.value)
		// handle to send difficulty selection to GlobalContext in order for usage in PointSystem
		setGameMode(event.target.value)
	}

	const handleSelection = (event) => {
		// handle to send difficulty category to GlobalContext
		setCategory(event.target.value)
		// handle to change form validation error state
		setError(false)
		// handle to change form validation error message state
		setHelperText(`Questions will be in above selected category`)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		// check if category selection is valid
		if (category) {
			// handle to send URL to GlobalContext in order to use with API (state: creating the URL based on user's selection)
			setApiURL(value, category)
			// handle to start the game (state: just before to send a get request to API)
			startGame()
		} else {
			// category selection is invalid
			// handle to change form validation error message state
			setHelperText("Don't forget to choose a category")
			// handle to change form validation error state
			setError(true)
		}
	}

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
												style={{ fontFamily: 'Rajdhani' }}>
												Difficulty
											</Typography>
										</FormLabel>
										{/* Radio Selection */}
										<RadioGroup
											row
											aria-label="difficulty"
											name="difficulty"
											value={value}
											onChange={handleRadioChange}>
											{difficulties.map((difficulty, index) => (
												<FormControlLabel
													key={index}
													value={difficulty}
													control={<Radio />}
													label={
														<Typography
															style={{
																fontFamily: 'Rajdhani',
																fontSize: '20px'
															}}>
															{difficulty}
														</Typography>
													}
													style={{
														textTransform: 'capitalize',
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
												style={{
													fontFamily: 'Rajdhani'
												}}>
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
												value={category}
												onChange={handleSelection}
												label="category"
												style={{
													fontFamily: 'Rajdhani'
												}}>
												{categories.map((category, index) => (
													<MenuItem
														key={index}
														value={category.value}
														style={{
															fontFamily: 'Rajdhani'
														}}>
														{category.description}
													</MenuItem>
												))}
											</Select>
											<FormHelperText
												style={{
													fontFamily: 'Rajdhani'
												}}>
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
						<Typography variant="button" style={{ textAlign: 'center' }}>
							Let's play
						</Typography>
					</Button>
				</Slide>
			</Grid>
		</Grid>
	)
}

export default QuestionaireForm

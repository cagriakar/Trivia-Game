import React, { useContext } from 'react'
import Lottie from 'react-lottie'
import trueLottie from '../../../../../assets/lottieFiles/true.json'
import { Grid, Box, Paper, Typography, Slide, Fade, Divider } from '@material-ui/core'
import { GlobalContext } from '../../../../../context/GlobalState'

const CorrectAnswer = () => {
	const { point, totalPoints, timesLeft } = useContext(GlobalContext)

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: trueLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	}

	return (
		<Grid container component={Box} mt={2} justify="center">
			{/* for better margin control */}
			<Grid item xs={1} />
			{/* for better margin control */}
			<Fade in={true} timeout={500}>
				<Grid item container xs={10} style={{ maxWidth: '500px', opacity: 0.8 }}>
					<Grid item container justify="center" style={{ marginBottom: '1rem' }}>
						<Paper component={Box} p={2} style={{ flexGrow: '1' }}>
							<Lottie
								options={defaultOptions}
								height={200}
								width={200}
								speed={0.75}
							/>
							<Typography
								variant="h6"
								style={{ textAlign: 'center', marginBottom: '1rem' }}>
								Correct
							</Typography>
							<Typography variant="subtitle1" style={{ textAlign: 'center' }}>
								You have earned {(point * timesLeft) / point} Points
							</Typography>
							<Divider style={{ marginBottom: '1rem' }} />
							<Typography variant="h6" style={{ textAlign: 'center' }}>
								Total: {totalPoints} Points
							</Typography>
						</Paper>
					</Grid>
				</Grid>
			</Fade>

			{/* for better margin control */}
			<Grid item xs={1} />
			{/* for better margin control */}
		</Grid>
	)
}

export default CorrectAnswer

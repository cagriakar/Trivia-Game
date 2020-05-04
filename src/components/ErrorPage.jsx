import React, { useContext } from 'react'
import { Grid, Box, Paper, Typography, Slide, Divider } from '@material-ui/core'
import { GlobalContext } from '../context/GlobalState'
import oopsLottie from '../assets/lottieFiles/oopsLottie.json'
import Lottie from 'react-lottie'

const ErrorPage = () => {
	const { errorMessage } = useContext(GlobalContext)

	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: oopsLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	}

	return (
		<Grid container justify="center">
			<Grid item xs={1} />
			<Slide direction="up" in={true} timeout={500}>
				<Grid item container xs={10} style={{ maxWidth: '500px', opacity: 0.8 }}>
					<Grid item container justify="center" style={{ marginBottom: '1rem' }}>
						<Paper component={Box} p={2} style={{ flexGrow: '1' }}>
							<Lottie options={defaultOptions} height={300} width={300} speed={0.5} />
							{/* <Typography variant="h6" style={{ textAlign: 'center' }}>
								{errorMessage[0]}
							</Typography>
							<Divider />
							<Typography variant="subtitle1" style={{ textAlign: 'center' }}>
								{errorMessage[1]}
							</Typography>
							<Typography variant="h6" style={{ textAlign: 'center' }}>
								{errorMessage[2]}
							</Typography> */}
						</Paper>
					</Grid>
				</Grid>
			</Slide>
			<Grid item xs={1} />
		</Grid>
	)
}

export default ErrorPage

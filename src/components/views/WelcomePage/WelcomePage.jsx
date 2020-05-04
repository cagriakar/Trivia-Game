import React from 'react'
import Lottie from 'react-lottie'
import logoLottie from '../../../assets/lottieFiles/logoLottie.json'
import covidLottie from '../../../assets/lottieFiles/covidLottie.json'
import { Link } from 'react-router-dom'
import { Grid, Box, Paper, Typography, Button, Slide, Grow } from '@material-ui/core'

const WelcomePage = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: logoLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	}

	const defaultOptions2 = {
		loop: true,
		autoplay: true,
		animationData: covidLottie,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	}

	return (
		<Grid container style={{ textAlign: 'center', opacity: 0.8 }} component="main">
			<Grow in={true} timeout={3000}>
				<Grid
					component="section"
					container
					justify="center"
					style={{ marginBottom: '1rem', marginTop: '1rem' }}>
					<Lottie options={defaultOptions2} height={50} width={100} />
				</Grid>
			</Grow>
			<Grid container justify="center" component="section">
				{/* for better margin control */}
				<Grid item xs={1} />
				{/* for better margin control */}
				<Slide direction="up" in={true} timeout={500}>
					<Grid item container xs={10} style={{ maxWidth: '500px' }}>
						<Grid item container justify="center" style={{ marginBottom: '1rem' }}>
							<Paper component={Box} px={2} py={3} style={{ flexGrow: '1' }}>
								<Lottie options={defaultOptions} height={120} width={120} />
								<Typography
									id="bold-text"
									variant="h5"
									style={{
										textAlign: 'center',
										fontFamily: 'Montserrat Subrayada',
										color: 'dark blue'
									}}>
									TRIVIA GAME
								</Typography>
							</Paper>
						</Grid>
					</Grid>
				</Slide>
				{/* for better margin control */}
				<Grid item xs={1} />
				{/* for better margin control */}
			</Grid>
			<Slide direction="up" in={true} timeout={1000}>
				<Link
					to="/trivia"
					component={Button}
					color="primary"
					variant="contained"
					style={{ margin: 'auto' }}>
					Get Start!
				</Link>
			</Slide>
		</Grid>
	)
}

export default WelcomePage

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import './App.css'
import WelcomePage from './components/views/WelcomePage/WelcomePage'
import MainPage from './components/views/MainPage/MainPage'
import { GlobalProvider } from './context/GlobalState'

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#696969'
		}
	},
	typography: {
		fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
		button: {
			fontWeight: '600'
		},
		overline: {
			fontWeight: '600'
		},
		h6: {
			textTransform: 'uppercase',
			fontWeight: '600'
		},
		subtitle1: {
			textTransform: 'uppercase',
			fontWeight: '600'
		},
		body1: {
			textTransform: 'uppercase'
		}
	}
})

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalProvider>
				<BrowserRouter>
					<Switch>
						<Route path="/" exact component={WelcomePage} />
						<Route path="/trivia" exact component={MainPage} />
					</Switch>
				</BrowserRouter>
			</GlobalProvider>
		</ThemeProvider>
	)
}

export default App

import { jssPreset, StylesProvider, ThemeProvider } from "@material-ui/core"
import { create } from "jss"
import React from "react"
import { render } from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./components/App"
import { theme } from "./theme"

const jss = create({
	plugins: [...jssPreset().plugins],
})

render(
	<Router>
		<StylesProvider jss={jss}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</StylesProvider>
	</Router>,
	document.getElementById("app"),
)

import { Container, LinearProgress, Paper } from "@material-ui/core"
import React, { Suspense } from "react"
import { Route, Switch } from "react-router-dom"
import Task from "../Task"
import Tasks from "../Tasks"

function App() {
	return (
		<Container maxWidth="sm">
			<Paper>
				<Suspense fallback={<LinearProgress />}>
					<Switch>
						<Route component={Task} path="/:id" />
						<Route component={Tasks} path="/" />
					</Switch>
				</Suspense>
			</Paper>
		</Container>
	)
}

export default App

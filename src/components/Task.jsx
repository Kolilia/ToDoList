import {
	Button,
	CircularProgress,
	DialogActions,
	Divider,
	FormControlLabel,
	FormHelperText,
	Grid,
	IconButton,
	LinearProgress,
	Switch,
	TextField,
} from "@material-ui/core"
import { green } from "@material-ui/core/colors"
import { makeStyles } from "@material-ui/core/styles"
import { ArrowBack, Send } from "@material-ui/icons"
import axios from "axios"
import React, { useCallback, useEffect, useState } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"

const useStyles = makeStyles({
	content: {
		fontSize: "1.2rem",
		marginTop: ".5rem",
	},
	header: {
		margin: 0,
		textAlign: "center",
	},
	body: {
		padding: "1rem",
	},
	field: {
		display: "flex",
		justifyContent: "center",
	},
	description: {
		wordBreak: "break-word",
	},
	headerField: {
		margin: 0,
	},
	actions: {
		display: "flex",
		justifyContent: "space-between",
	},
	bottomActions: {
		flex: 1,
	},
	closeButton: {
		color: "#fff",
		fontSize: "1rem",
		height: "auto",
		whiteSpace: "nowrap",
	},
	confirmButton: {
		color: "#fff",
		fontSize: "1rem",
		height: "auto",
		whiteSpace: "nowrap",
		backgroundColor: green[600],
	},
	buttonProgress: {
		color: "#fff",
		position: "absolute",
		top: "50%",
		left: "50%",
		marginTop: -12,
		marginLeft: -12,
	},
})

function Task() {
	const classes = useStyles()
	const match = useRouteMatch()
	const history = useHistory()
	const [data, setData] = useState({})
	const [loading, setLoading] = useState(false)
	const [editableMode, setEditableMode] = useState(false)
	const [touchesTitle, setTouchesTitle] = useState(false)
	const [payload, setPayload] = useState({
		title: "",
		description: "",
		completed: false,
	})
	const { id } = match.params

	const fetchData = useCallback(
		async function () {
			if (!id) {
				return
			}

			setLoading(true)

			const { data } = await axios.get(
				`https://5fd7bd009dd0db0017ee9a56.mockapi.io/api/v1/tasks/${id}`,
			)

			if (data) {
				setData(data)
				setPayload({
					title: data?.title,
					description: data?.description,
					completed: data?.completed,
				})
			}

			setLoading(false)
		},
		[id],
	)

	useEffect(
		function () {
			fetchData()
		},
		[fetchData],
	)

	function onChangeEditable(event) {
		const { checked } = event.target
		setEditableMode(checked)
	}

	function onChange(event) {
		const { name, value, checked } = event.target

		if (name === "title") {
			setPayload(function (prevState) {
				return { ...prevState, title: value }
			})
			setTouchesTitle(true)
		}
		if (name === "description") {
			setPayload(function (prevState) {
				return { ...prevState, description: value }
			})
		}
		if (name === "completed") {
			setPayload(function (prevState) {
				return { ...prevState, completed: checked }
			})
		}
	}

	async function addItem() {
		setTouchesTitle(true)

		if (!payload.title) {
			return
		}
		setLoading(true)

		const result = await axios.put(
			`https://5fd7bd009dd0db0017ee9a56.mockapi.io/api/v1/tasks/${id}`,
			{ ...payload },
		)

		if (result?.data) {
			fetchData()
			setEditableMode(false)
		}

		setLoading(false)
	}

	function cancel() {
		setEditableMode(false)
		setPayload({
			title: data?.title,
			description: data?.description,
			completed: data?.completed,
		})
	}

	return (
		<div className={classes.body}>
			<div className={classes.actions}>
				<div>
					<IconButton onClick={history.goBack}>
						<ArrowBack />
					</IconButton>
				</div>
				<div>
					<FormControlLabel
						label="Режим редактирования"
						control={
							<Switch
								checked={editableMode}
								value={true}
								onChange={onChangeEditable}
							/>
						}
					/>
				</div>
			</div>

			{loading && <LinearProgress />}
			<h1 className={classes.header}>
				{editableMode ? (
					<div>
						<TextField
							value={payload?.title}
							name="title"
							onChange={onChange}
							InputLabelProps={{
								shrink: true,
							}}
							label="Заголовок"
							fullWidth
						/>
						{touchesTitle && !payload.title && (
							<FormHelperText error>
								Обязательное поле
							</FormHelperText>
						)}
					</div>
				) : (
					<b>{data?.title}</b>
				)}
			</h1>
			<Divider />
			<div className={classes.content}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<div className={classes.field}>
							<div>
								<h4 className={classes.headerField}>
									Описание:
								</h4>
								{editableMode ? (
									<TextField
										value={payload?.description}
										name="description"
										onChange={onChange}
										multiline
										rows={2}
										fullWidth
									/>
								) : (
									<div className={classes.description}>
										{data?.description}
									</div>
								)}
							</div>
						</div>
					</Grid>
					<Grid item xs={6}>
						<div className={classes.field}>
							<div>
								<h4 className={classes.headerField}>
									Статус задачи:
								</h4>
								{editableMode ? (
									<FormControlLabel
										label="Выполнена ли задача?"
										control={
											<Switch
												name="completed"
												checked={payload?.completed}
												value={true}
												onChange={onChange}
											/>
										}
									/>
								) : (
									<div>
										{data?.completed
											? "Выполнена"
											: "Не выполнена"}
									</div>
								)}
							</div>
						</div>
					</Grid>
					{editableMode && (
						<Grid item xs={12}>
							<div className={classes.bottomActions}>
								<DialogActions>
									<Button
										color="primary"
										variant="contained"
										className={classes.closeButton}
										onClick={cancel}
									>
										Отменить
									</Button>
									<Button
										color="primary"
										variant="contained"
										className={classes.confirmButton}
										disabled={loading}
										onClick={addItem}
									>
										Подтвердить
										{!loading && (
											<Send style={{ marginLeft: 5 }} />
										)}
										{loading ? (
											<CircularProgress
												size={24}
												className={
													classes.buttonProgress
												}
												style={{ color: "#fff" }}
											/>
										) : null}
									</Button>
								</DialogActions>
							</div>
						</Grid>
					)}
				</Grid>
			</div>
		</div>
	)
}

export default Task

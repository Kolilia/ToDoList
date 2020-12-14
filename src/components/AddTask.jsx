import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	FormHelperText,
	IconButton,
	Switch,
	TextField,
} from "@material-ui/core"
import { green } from "@material-ui/core/colors"
import { makeStyles } from "@material-ui/core/styles"
import { Close, Send } from "@material-ui/icons"
import axios from "axios"
import React, { useState } from "react"

const useStyles = makeStyles({
	paper: {
		width: "100%",
	},
	close: {
		position: "absolute",
		top: 0,
		right: 0,
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
	field: {
		marginBottom: ".5rem",
	},
})

function AddTask({ open, setOpen, fetchData }) {
	const classes = useStyles()
	const [loading, setLoading] = useState(false)
	const [touchesTitle, setTouchesTitle] = useState(false)
	const [payload, setPayload] = useState({
		title: "",
		description: "",
		completed: false,
	})

	function stop(event) {
		event.stopPropagation()
	}

	function close() {
		setOpen(false)
	}

	async function addItem() {
		setTouchesTitle(true)

		if (!payload.title) {
			return
		}
		setLoading(true)

		const result = await axios.post(
			`https://5fd7bd009dd0db0017ee9a56.mockapi.io/api/v1/tasks`,
			{ ...payload },
		)

		if (result?.data) {
			fetchData()
			setOpen(false)
		}

		setLoading(false)
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

	return (
		<Dialog
			classes={{ paper: classes.paper }}
			disableBackdropClick
			className={classes.dialog}
			open={open}
			onClick={stop}
			onClose={close}
			maxWidth="xs"
			fullWidth
		>
			<DialogTitle>
				<IconButton onClick={close} className={classes.close}>
					<Close />
				</IconButton>
				Добавить Задачу
			</DialogTitle>
			<DialogContent>
				<div>
					<div className={classes.field}>
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
					<div className={classes.field}>
						<TextField
							value={payload?.description}
							name="description"
							onChange={onChange}
							InputLabelProps={{
								shrink: true,
							}}
							label="Описание"
							multiline
							rows={2}
							fullWidth
						/>
					</div>
					<div className={classes.field}>
						<FormControlLabel
							label="Отметить сразу выполненной"
							control={
								<Switch
									name="completed"
									checked={payload?.completed}
									value={true}
									onChange={onChange}
								/>
							}
						/>
					</div>
				</div>
			</DialogContent>
			<DialogActions>
				<Button
					color="primary"
					variant="contained"
					className={classes.closeButton}
					onClick={close}
				>
					Закрыть
				</Button>
				<Button
					color="primary"
					variant="contained"
					className={classes.confirmButton}
					disabled={loading}
					onClick={addItem}
				>
					Подтвердить
					{!loading && <Send style={{ marginLeft: 5 }} />}
					{loading ? (
						<CircularProgress
							size={24}
							className={classes.buttonProgress}
							style={{ color: "#fff" }}
						/>
					) : null}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AddTask

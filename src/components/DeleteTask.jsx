import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
} from "@material-ui/core"
import { green } from "@material-ui/core/colors"
import { makeStyles } from "@material-ui/core/styles"
import { Close, Send } from "@material-ui/icons"
import axios from "axios"
import React, { useEffect, useState } from "react"

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
	text: {
		fontSize: "1.4rem",
		textAlign: "center",
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

function DeleteTask({ open, setOpen, data, fetchData, setData }) {
	const classes = useStyles()
	const [loading, setLoading] = useState(false)

	function stop(event) {
		event.stopPropagation()
	}

	function close() {
		setOpen(false)
	}

	async function deleteItem() {
		setLoading(true)

		const result = await axios.delete(
			`https://5fd7bd009dd0db0017ee9a56.mockapi.io/api/v1/tasks/${data?.id}`,
		)

		if (result?.data) {
			fetchData()
			setOpen(false)
		}

		setLoading(false)
	}

	useEffect(
		function () {
			return function () {
				setData({})
			}
		},
		[setData],
	)

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
				Удалить Задачу({data?.title})
			</DialogTitle>
			<DialogContent>
				<p className={classes.text}>
					Вы уверены, что хотите удалить текущую задачу{" "}
					<b>{data?.title}</b>?
				</p>
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
					onClick={deleteItem}
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

export default DeleteTask

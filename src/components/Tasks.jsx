import {
	Divider,
	IconButton,
	LinearProgress,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	TextField,
} from "@material-ui/core"
import { green, grey } from "@material-ui/core/colors"
import { makeStyles } from "@material-ui/core/styles"
import { Add, Check, Delete } from "@material-ui/icons"
import axios from "axios"
import React, { useCallback, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import AddTask from "./AddTask"
import DeleteTask from "./DeleteTask"

const useStyles = makeStyles({
	header: {
		margin: 0,
		color: grey[500],
		textAlign: "center",
	},
	content: {
		fontSize: "1rem",
		maxHeight: 600,
		overflowY: "auto",
	},
	item: {
		display: "flex",
		justifyContent: "space-between",
	},
	titleItem: {
		display: "flex",
		alignItems: "center",
	},
	completeTask: {
		backgroundColor: green[300],
	},
	actions: {
		display: "flex",
		justifyContent: "space-between",
		marginBottom: ".7rem",
	},
	line: {
		marginBottom: ".7rem",
	},
})

function Tasks() {
	const classes = useStyles()
	const history = useHistory()
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [currentDelete, setCurrentDelete] = useState({})
	const [openDelete, setOpenDelete] = useState(false)
	const [openAdd, setOpenAdd] = useState(false)
	const [showFilter, setShowFilter] = useState("All")

	const [intermediateData, setIntermediateData] = useState(false)

	const fetchData = useCallback(async function () {
		setLoading(true)

		const { data } = await axios.get(
			"https://5fd7bd009dd0db0017ee9a56.mockapi.io/api/v1/tasks",
		)

		if (data) {
			setData(data)
			setIntermediateData(data)
		}

		setLoading(false)
	}, [])

	useEffect(
		function () {
			fetchData()
		},
		[fetchData],
	)

	const mapData = data.map(function (item) {
		function openDelete(event) {
			event.stopPropagation()
			setCurrentDelete(item)
			setOpenDelete(true)
		}

		async function completeTask(event) {
			event.stopPropagation()

			setLoading(true)

			const {
				data,
			} = await axios.put(
				`https://5fd7bd009dd0db0017ee9a56.mockapi.io/api/v1/tasks/${item?.id}`,
				{ ...item, completed: true },
			)

			if (data) {
				fetchData()
			}

			setLoading(false)
		}

		function goToDetail() {
			history.push(`/${item?.id}`)
		}

		return (
			<ListItem
				key={item?.id}
				button
				className={item?.completed ? classes.completeTask : ""}
				onClick={goToDetail}
			>
				<ListItemText
					primary={
						<div className={classes.item}>
							<div className={classes.titleItem}>
								{item?.title}
							</div>
							<div>
								{!item.completed && (
									<IconButton onClick={completeTask}>
										<Check />
									</IconButton>
								)}

								<IconButton onClick={openDelete}>
									<Delete />
								</IconButton>
							</div>
						</div>
					}
				/>
			</ListItem>
		)
	})

	function openDialogAdd() {
		setOpenAdd(true)
	}

	function onChangeFilter(event) {
		const { value } = event.target

		if (value === "All") {
			setData(intermediateData)
		}
		if (value === "Completed") {
			setData(
				intermediateData.filter(function (item) {
					return item?.completed === true
				}),
			)
		}
		if (value === "NotCompleted") {
			setData(
				intermediateData.filter(function (item) {
					return item?.completed === false
				}),
			)
		}

		setShowFilter(value)
	}

	return (
		<div>
			<h1 className={classes.header}>
				<b>TODO List</b>
			</h1>
			<div className={classes.actions}>
				<div>
					<IconButton onClick={openDialogAdd}>
						<Add />
					</IconButton>
				</div>
				<div>
					<TextField
						label="Фильтр"
						value={showFilter}
						onChange={onChangeFilter}
						select
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
					>
						<MenuItem key="All" value="All">
							Все
						</MenuItem>
						<MenuItem key="Completed" value="Completed">
							Выполненные
						</MenuItem>
						<MenuItem key="NotCompleted" value="NotCompleted">
							Не выполненные
						</MenuItem>
					</TextField>
				</div>
			</div>

			<div className={classes.line}>
				<Divider />
			</div>

			<div className={classes.content}>
				{loading && <LinearProgress />}
				<List>{mapData}</List>
			</div>

			{openDelete && (
				<DeleteTask
					open={openDelete}
					setOpen={setOpenDelete}
					data={currentDelete}
					setData={setCurrentDelete}
					fetchData={fetchData}
				/>
			)}

			{openAdd && (
				<AddTask
					open={openAdd}
					setOpen={setOpenAdd}
					fetchData={fetchData}
				/>
			)}
		</div>
	)
}

export default Tasks

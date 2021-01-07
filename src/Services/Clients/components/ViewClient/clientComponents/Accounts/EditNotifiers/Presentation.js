import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles, Button, Drawer, Grid } from '@material-ui/core'
import { FiEdit3 } from 'react-icons/fi'
import ChipInput from 'material-ui-chip-input'

const useStyles = makeStyles({
	setDrawer: {
		width: 'auto',
	},
})

function Presentation(props) {
	const {
    to,
    cc,
    bcc,
    helperText,
    handleDelete,
    handleAdd,
    handleSubmit,
  } = props
	const classes = useStyles()
	const [drawerState, setState] = React.useState({
		right: false,
	})
	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return
		}

		setState({ ...drawerState, [anchor]: open })
	}
	return (
    <div>
      <Button onClick={toggleDrawer("right", true)}>
        <EditIcon />{" "}
      </Button>
      <Drawer
        anchor={"right"}
        open={drawerState["right"]}
        onClose={toggleDrawer("right", false)}
        className={classes.setDrawer}
      >
        <div className="m-3">
          <div className="text-center">
            <FiEdit3 fontSize="50px" />
            <h3>
              <u>Edit Account Details</u>
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <ChipInput
                  value={to}
                  onAdd={(chip) => handleAdd("to", chip)}
                  onDelete={(_, index) => handleDelete("to", index)}
                  helperText={helperText.to}
                  allowDuplicates={false}
                  label="To"
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <ChipInput
                  value={cc}
                  onAdd={(chip) => handleAdd("cc", chip)}
                  onDelete={(_, index) => handleDelete("cc", index)}
                  helperText={helperText.cc}
                  allowDuplicates={false}
                  label="CC"
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <ChipInput
                  value={bcc}
                  onAdd={(chip) => handleAdd("bcc", chip)}
                  onDelete={(_, index) => handleDelete("bcc", index)}
                  helperText={helperText.bcc}
                  allowDuplicates={false}
                  label="BCC"
                  fullWidth
                  size="small"
                />
              </Grid>
            </Grid>
            <div className="text-center mt-3">
              <Button
                variant="contained"
                color={"secondary"}
                type="submit"
              >
                Update
              </Button>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  )
}

export default Presentation

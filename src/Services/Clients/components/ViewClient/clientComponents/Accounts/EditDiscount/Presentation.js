import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import {
	TextField,
	MenuItem,
	makeStyles,
	Button,
	Drawer,
	Grid,
	Tooltip,
	IconButton,
} from '@material-ui/core'
import { FiEdit3 } from 'react-icons/fi'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline"

const useStyles = makeStyles({
	setDrawer: {
		width: 'auto',
	},
})

function Presentation(props) {
	const {
    status,
    discountDetails,
    handleDiscountDetails,
    onRemoveDiscount,
    onAddDiscount,
    handleChange,
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
              <u>Edit Discount Details</u>
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <TextField
                  select
                  label="Status"
                  size="small"
                  style={{ minWidth: "100%" }}
                  fullWidth
                  onChange={handleChange}
                  name="status"
                  variant="outlined"
                  value={status}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                {discountDetails.map((item, index) => {
                  return (
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <TextField
                          size="small"
                          variant="outlined"
                          value={item["name"]}
                          name="name"
                          onChange={(e) => handleDiscountDetails(e, index)}
                          label="Name"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          style={{ minWidth: "100%" }}
                          size="small"
                          label="Select"
                          variant="outlined"
                          value={item["type"]}
                          onChange={(e) => handleDiscountDetails(e, index)}
                          select
                          name="type"
                        >
                          <MenuItem value="byValue">By Value</MenuItem>
                          <MenuItem value="byPercentage">
                            By Percentage
                          </MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          size="small"
                          type="number"
                          variant="outlined"
                          value={item["value"]}
                          onChange={(e) => {
                            const val = Number(e.target.value)
                            if (
                              (discountDetails[index]["type"] ===
                                "byPercentage" &&
                                val < 100) ||
                              discountDetails[index]["type"] === "byValue"
                            ) {
                              discountDetails[index]["value"] = val
                              handleChange(e, index)
                            }
                          }}
                          label="Discount"
                          name="value"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <div className="d-flex">
                          {discountDetails.length > 1 ? (
                            <div>
                              <Tooltip title="Remove this discount">
                                <IconButton
                                  onClick={() => onRemoveDiscount(index)}
                                >
                                  <RemoveCircleOutlineIcon
                                    className="text-danger"
                                    fontSize="small"
                                  />
                                </IconButton>
                              </Tooltip>
                            </div>
                          ) : null}
                          {index === discountDetails.length - 1 ? (
                            <div>
                              <Tooltip title="Add multiple discounts">
                                <IconButton onClick={onAddDiscount}>
                                  <AddCircleOutlineIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </div>
                          ) : null}
                        </div>
                      </Grid>
                    </Grid>
                  )
                })}
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

import React from "react"
import { Tabs, Tab, Grid, IconButton, AppBar } from "@material-ui/core"
import { Add, Close } from "@material-ui/icons"
import Form from "../Form"
import TabPanel from "../../../../../../../shared/tabPanel"

function Presentation(props) {
  const {
    locationsList,
    value,
    handleTabChange,
    addLocation,
    deleteLocation,
  } = props
  return (
    <div style={{ flex: 1, width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item xs={11}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              {locationsList.map((tab, index) => (
                <Tab
                  key={tab.key.toString()}
                  value={tab.id}
                  label={
                    <div>
                      {"Location " + index}
                      {tab.key !== 0 ? (
                        <IconButton
                          id={tab.id}
                          onClick={deleteLocation}
                          color="inherit"
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      ) : null}
                    </div>
                  }
                />
              ))}
            </Tabs>
          </AppBar>

          {locationsList.map((item, index) => (
            <TabPanel value={value} index={item.id}>
              <Form
                key={item.key.toString()}
                item={item}
                index={index}
                locationsList={locationsList}
              />
            </TabPanel>
          ))}
        </Grid>
        <Grid xs={1}>
          <IconButton color="inherit" onClick={addLocation}>
            <Add fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  )
}

export default Presentation

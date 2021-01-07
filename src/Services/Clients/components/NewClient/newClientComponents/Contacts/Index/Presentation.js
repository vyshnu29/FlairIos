import React from "react"
import { Tabs, Tab, Grid, IconButton, AppBar } from "@material-ui/core"
import { AddCircleOutlineOutlined as Add, Close } from "@material-ui/icons"
import Form from "../Form"
import TabPanel from "../../../../../../../shared/tabPanel"

function Presentation(props) {
  const {
    contactsList,
    value,
    handleTabChange,
    addContact,
    deleteContact,
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
              {contactsList.map((tab, index) => (
                <Tab
                  key={tab.key.toString()}
                  value={tab.id}
                  label={
                    <div>
                      {"Contact " + index}
                      {tab.key !== 0 ? (
                        <IconButton
                          id={tab.id}
                          onClick={deleteContact}
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
          {contactsList.map((item, index) => (
            <TabPanel value={value} index={item.id}>
              <Form
                key={item.key.toString()}
                item={item}
                index={index}
                contactsList={contactsList}
              />
            </TabPanel>
          ))}
        </Grid>
        <Grid xs={1}>
          <IconButton color="inherit" onClick={addContact}>
            <Add />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  )
}

export default Presentation

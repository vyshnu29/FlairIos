import React, { useEffect } from "react"
import Presentation from "./Presentation"
import { connect } from "react-redux"
import { removeMember, updatePermissions } from "../../../middleware"

function Container(props) {
  const [state, setState] = React.useState({
    assignees: props.route.params.assignees,
    initialAssignee: [],
  })


  useEffect(() => {
    setState({
      assignees: props.route.params.assignees,
    })
  }, [props.route.params.assignees])

  const handleUpdateLevels = (uid) => {
    const {   updatePermissions   } = props
    let level = state.assignees.filter((assignee) => uid === assignee.uid)[0]
    let data = {
      create: level.create,
      update: level.update,
      read: level.read,
      del: level.delete,
      projectId: props.route.params.projectId,
      uid:   uid
    }
    console.log(level)
    updatePermissions(data)
    // dispatch({
    //     type : UPDATE_ACCESS_LEVELS,
    //     payload : {
    //         data : {
    //             uid : uid,
    //             newAccessLevel : {
    //                 create : level.create,
    //                 update : level.update,
    //                 read : level.read,
    //                 delete : level.delete,
    //                 projectId : state.project.id
    //             }
    //         }
    //     }
    // })
    props.navigation.goBack();
  }
  const handleRemove = (uid) => {
    console.log(uid)
    const { removeMember } = props
    let data = {
      employees: [uid],
      projectId: props.route.params.projectId,
    }
    removeMember(data)
    // dispatch({
    //     type : REMOVE_MEMBER,
    //     payload : {
    //         data : {
    //             projectId : state.project.id,
    //             employeeUID : uid
    //         },
    //         dispatch : dispatch
    //     }
    // })
    props.navigation.goBack();
  }

  const handleLevelChange = (uid, permission, key) => {
    let currState = JSON.parse(JSON.stringify(state))
    let accessLevels = currState.assignees
    accessLevels.forEach((access, index) => {
      if (access.uid === uid) {
        console.log(access)
        accessLevels[index][key] = !permission
      }
    })
    
    setState({
      ...state,
      assignees: accessLevels,
    })
    
   
  }
  
  return (
        <Presentation
          assignees={state.assignees}
          {...props}
          handleLevelChange={handleLevelChange}
          handleUpdateLevels={handleUpdateLevels}
          handleRemove={handleRemove}
        />
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeMember: (payload) => {
      dispatch(removeMember(payload))
    },
    updatePermissions: (payload) => {
      dispatch(updatePermissions(payload))
    },
  }
}

export default connect(null, mapDispatchToProps)(Container)

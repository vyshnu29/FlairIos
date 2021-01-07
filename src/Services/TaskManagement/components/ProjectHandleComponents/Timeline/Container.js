import React from "react"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import Presentation from "./Presentation"
import { compose } from "redux"
import SettingIcon from 'react-native-vector-icons/MaterialIcons';
import MetaInfo from "../../../../../shared/getMetaInfo";
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from "react-redux"
import validate from "../../../../../shared/validation";

function Container(props) {
  const metaInfo = new MetaInfo();
  const [state, setState] = React.useState({
    data: [],
  })
  React.useEffect(() => {
    let total = [];
    props.timelines.map(item => {
         switch (item.type) {
           case 'createProject':
             total.push({
               time: validate.dateFormatter(item.createdAt),
               title: metaInfo.emailToName(item.actionBy),
               description: 'created this project.',
               icon: <SettingIcon name="person-pin" color='white' />,
             });
   
           case 'addMemberToProject':
             total.push({
               time: validate.dateFormatter(item.createdAt),
               title: metaInfo.emailToName(item.actionBy),
               description: 'added' + '  ' + metaInfo.emailToName(item.subject.uid) + '  ' +'to this project.',
               icon: <SettingIcon name="person-pin" color='white' />,
             });
   
           case 'deleteProjectMember':
             total.push({
               time: validate.dateFormatter(item.createdAt),
               title: metaInfo.emailToName(item.actionBy),
               description: 'removed to this project' +  '  ' + metaInfo.emailToName(item.subject.uid) ,
               icon: <SettingIcon name="person-pin" color='white' />,
             });
   
           case 'updateProjectAccessLevels':
             total.push({
               time: validate.dateFormatter(item.createdAt),
               title: metaInfo.emailToName(item.actionBy),
               description: ' updated the project access levels of' +  '  ' + metaInfo.emailToName(item.subject.uid),
               icon: <SettingIcon name="person-pin" color='white' />,
             });
   
           case 'updateProject':
             total.push({
               time: validate.dateFormatter(item.createdAt),
               title: metaInfo.emailToName(item.actionBy),
               description: 'updated the project details.',
               icon: <SettingIcon name="person-pin" color='white' />,
             });
             case "newLabel":
              total.push({
                time: validate.dateFormatter(item.createdAt),
                title: metaInfo.emailToName(item.actionBy),
                description: 'Created New Label',
                icon: <SettingIcon name="person-pin" color='white' />,
              });
            case "deleteLabel":
              total.push({
                time: validate.dateFormatter(item.createdAt),
                title: metaInfo.emailToName(item.actionBy),
                description: 'deleted New Label',
                icon: <SettingIcon name="person-pin" color='white' />,
              });
            case "updateLabel":
              total.push({
                time: validate.dateFormatter(item.createdAt),
                title: metaInfo.emailToName(item.actionBy),
                description: 'Updated New Label',
                icon: <SettingIcon name="person-pin" color='white' />,
              });
              
   
           default:
             null;
         }
        
       });
       setState({
         ...state,
        data: total,
      })
  }, [])
  console.log("AA",state.data.length)
  if (state.data.length)
    return (
        <Presentation {...props} {...state}/>
    )
	return <Spinner visible={true} />
}

export default Container

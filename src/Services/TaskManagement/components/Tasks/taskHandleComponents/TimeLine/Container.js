import React from "react"
import { firestoreConnect, isLoaded } from "react-redux-firebase"
import Presentation from "./Presentation"
import SettingIcon from 'react-native-vector-icons/MaterialIcons';
import MetaInfo from "../../../../../../shared/getMetaInfo";
import Spinner from 'react-native-loading-spinner-overlay'
import validate from "../../../../../../shared/validation";

function Container(props) {
  const metaInfo = new MetaInfo();
  const [state, setState] = React.useState({
    data: [],
  })
  React.useEffect(() => {
    let total = [];
    if(props.route.params.TaskTimeLine)
    props.route.params.TaskTimeLine.map(item => {
         switch (item.type) {
           case 'createTask':
             total.push({
               time: validate.dateFormatter(item.createdAt),
               title: metaInfo.emailToName(item.actionBy),
               description: 'created this task.',
               icon: <SettingIcon name="person-pin" color='white' />,
             });
   
           
   
           case 'updateTask':
             total.push({
               time: validate.dateFormatter(item.createdAt),
               title: metaInfo.emailToName(item.actionBy),
               description: 'updated this task.',
               icon: <SettingIcon name="person-pin" color='white' />,
             });
             case "newCommentOnTask":
              total.push({
                time: validate.dateFormatter(item.createdAt),
                title: metaInfo.emailToName(item.actionBy),
                description: 'added comment.',
                icon: <SettingIcon name="person-pin" color='white' />,
              });
            case "updateComment":
              total.push({
                time: validate.dateFormatter(item.createdAt),
                title: metaInfo.emailToName(item.actionBy),
                description: 'updated comment.',
                icon: <SettingIcon name="person-pin" color='white' />,
              });
            case "deleteCommentInTask":
              total.push({
                time: validate.dateFormatter(item.createdAt),
                title: metaInfo.emailToName(item.actionBy),
                description: 'deleted the comment.',
                icon: <SettingIcon name="person-pin" color='white' />,
              });
              case "createSubTask":
                total.push({
                  time: validate.dateFormatter(item.createdAt),
                  title: metaInfo.emailToName(item.actionBy),
                  description: 'created the nested task.',
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

	if (state.data)
    return (
        <Presentation {...props} {...state}/>
    )
	return <Spinner visible={true} />
}

export default Container


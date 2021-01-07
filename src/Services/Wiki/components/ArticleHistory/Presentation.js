import React from "react"
import MetaInfo from "../../../../shared/getMetaInfo"
import {
    Badge,
    Title,
    Avatar,
    FAB
  } from 'react-native-paper';
  import {
    View,
    FlatList,
    RefreshControl,
    TouchableOpacity,
  } from 'react-native';
  import IconHis from 'react-native-vector-icons/MaterialIcons'
  import {
    Container,
    Header,
    List,
    ListItem,
    Thumbnail,
    Tab,
    Tabs,
    TabHeading,
    Icon,
    Text,
    ScrollableTab,
    Left,
    Button,
    Body,
    Right,
  } from 'native-base';
import { isLoaded } from "react-redux-firebase"
import validate from "../../../../shared/validation"

function Presentation(props) {
  const { article_history, history, categoryMetaInfo } = props
  const metaInfo = new MetaInfo()
//   const columns = [
//     {
//       title: "Article Title",
//       field: "title",
//       render: (rowData) => (
//         <span>
//           <Link
//             to={"/console/wiki/" + rowData.articleId + "/" + rowData.historyId}
//           >
//             {rowData.title}
//           </Link>
//         </span>
//       ),
//     },
//     { title: "Category", field: "category" },
//     { title: "Created On", field: "createdAt" },
//     { title: "Created By", field: "createdBy" },
//   ]

  let data = []

  history &&
    history.forEach((doc) => {
      const { title, categoryId } = doc.eventDetails.after
      data.push({
        title,
        category: categoryMetaInfo[categoryId],
        createdAt: validate.dateAndTimeFormatter(doc.createdAt),
        createdBy: metaInfo.emailToName(doc.actionBy),
        type: doc.type,
        historyId: doc.id,
        articleId: doc.subject.wikiArticleId,
      })
    })

  return (
    <>
        <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                name="arrow-back"
                onPress={() => {
                  props.navigation.goBack();
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white'}}>Article History</Title>
          </Body>
        </Header> 
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <List>
              <ListItem avatar>
                <Left>
                  <IconHis  name = 'history' size={24} color='grey' />
                  {/* <Thumbnail source={{ uri: 'Image URL' }} /> */}
                </Left>
                <Body>
                <TouchableOpacity onPress={() => {props.navigation.navigate('ViewArticle',{articleId:item.articleId, isHistory : true , historyId : item.historyId})}}>
                  <Text style={{color:'#62B1F6'}}>{item.title}</Text>
                  </TouchableOpacity>
                  <Text style={{color:'#62B1F6'}}>{item.category}</Text>
                  <Text note>{"type" + " - " +item.type}</Text>
                  <Text note>{"by" + " - " + item.createdBy}</Text>
                </Body>
                <Right>
                <Text note>{validate.dateFormatter(item.createdAt)}</Text>
                </Right>
              </ListItem>
            </List>
                // <List>
                //   <ListItem avatar>
                //     <Left>
                //       <Avatar.Text
                //         size={55}
                //         label={item.title[0].toUpperCase()}
                //         style={{backgroundColor: '#c42053'}}
                //       />
                //     </Left>
                //     <Body>
                //       <TouchableOpacity>
                //         <Title
                //           style={{color: '#0000FF', fontSize: 16}}
                //           mode="text">
                //           {item.title.toUpperCase()}
                //         </Title>
                //       </TouchableOpacity>

                //       <View style={{flexDirection: 'row'}}>
                //         <View style={{flexDirection: 'column'}}>
                //           <Text>Category</Text>
                //           <Text>Type</Text>
                //           <Text>Created On</Text>
                //           <Text>Created By</Text>
                //         </View>
                //         <View style={{flexDirection: 'column'}}>
                //           <Text> : </Text>
                //           <Text> : </Text>
                //           <Text> : </Text>
                //           <Text> : </Text>
                //         </View>
                //         <View style={{flexDirection: 'column'}}>
                //           <Text>{item.category}</Text>
                //           <Text>{item.type}</Text>
                //           <Text>{item.createdAt}</Text>
                //           <Text>{item.createdBy}</Text>
                //         </View>
                //       </View>
                //     </Body>
                //   </ListItem>
                // </List>
             
            );
          }}
         
        
        />
      </Container>
    </>
  )
}

export default Presentation

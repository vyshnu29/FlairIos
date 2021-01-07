import React, {useState} from 'react';
import {
  Divider,
  Avatar,
  Appbar,
  Menu,
  Title,
} from 'react-native-paper';
import {
  Container,
  Header,
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
import Spinner  from 'react-native-loading-spinner-overlay'
import {
  View,
  TouchableOpacity,
} from 'react-native';
import Articles from "../Articles"

function Presentation(props) {
  const { categories } = props
  console.log("Al",categories)
  if(categories.length)
  return (
      <>
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
            <Title style={{color: 'white'}}>More Articles</Title>
          </Body>
        </Header>
        <Tabs renderTabBar={() => <ScrollableTab />}>
        {categories.map((category , index) => {
          return (
            <Tab
            heading={
              <TabHeading key={index}>
                <Text>{category.name}</Text>
              </TabHeading>
            }>
              <Articles
              {...props}
                  categoryName={category.name}
                  categoryId={category.id}
                 />
          </Tab>
          )
        })}
        </Tabs>
  
    </>
  )
  return (<Spinner visible={true} />)
}

export default Presentation

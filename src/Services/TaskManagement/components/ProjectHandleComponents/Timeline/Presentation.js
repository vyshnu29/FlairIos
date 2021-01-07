import React from "react";
import {
  Container,
  Header,
  Icon,
  Text,
  ScrollableTab,
  Left,
  Title,
  Button,
  Body,
  Right,
} from 'native-base';
import Timeline from 'react-native-timeline-flatlist';




function Presentation(props) {
  const { data } = props;
  console.log("fa",data);
  return (
    <Container>
   <Header style={{backgroundColor: '#3F51B5'}} androidStatusBarColor="#000">
      <Left>
                    <Button transparent>
                      <Icon
                        style={{color: 'white'}}
                        color="white"
                        name= "chevron-back"
                        onPress={() => {
                          props.navigation.goBack();
                        }}
                      />
                    </Button>
                  </Left>
        <Body>
          <Title style={{alignSelf: 'center', alignContent: 'center',color:'white',fontSize:18}}>
           Timeline
          </Title>
        </Body>
        <Right></Right>
      </Header>
    <Timeline
            data={data}
            scrollbar={false}
            circleSize={20}
            circleColor="#87cefa"
            lineColor="rgb(45,156,219)"
            timeContainerStyle={{minWidth: 75, marginTop: 5}}
            timeStyle={{
              textAlign: 'center',
              backgroundColor: '#ff9797',
              color: 'white',
              padding: 5,
              borderRadius: 13,
            }}
            descriptionStyle={{color: 'grey'}}
            options={{
              style: {paddingTop: 5},
            }}
            innerCircle={'icon'}
            onEventPress={(item) => 
              alert(`${item.title} at ${item.time}`)
            }
            separator={false}
            detailContainerStyle={{
              marginBottom: 20,
              margin:5,
              paddingLeft: 5,
             paddingRight: 5,
              backgroundColor: '#BBDAFF',
              borderRadius: 7,
            }}
            columnFormat="two-column"
          />
    </Container>
  );
}

export default Presentation;

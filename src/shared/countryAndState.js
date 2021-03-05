import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  CheckBox,
  StyleSheet,
  Linking,
  FlatList,
} from 'react-native';
import DelIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  Header,
  Icon,
  Item,
  Content,
  Form,
  Button,
  List,
  ListItem,
  Input,
  Textarea,
  Right,
  Left,
  Body,
} from 'native-base';
import {BottomSheet} from 'react-native-btr';
import {DataTable, TextInput, Title, FAB} from 'react-native-paper';
import make_API_Call from "../providers/REST_API"
import PropTypes from "prop-types"

function CountryAndState(props) {
  const {
    handleKeyValuePair,
    countries,
    states,
    state,
    country,
    spacing,
  } = props

  const [state1, setState1] = useState ({
    countryId: "",
    stateId:'',
    countryname: "",
    statename:''
  })

  const handleCountry = (item,name) => {
    setState1((state1) => ({ ...state1, countryId: item,countryname: name, }))
    handleKeyValuePair("country", item)
    handleKeyValuePair("states", [])
    handleKeyValuePair("state", "")
    return loadStates(item)
  }

  const handleState = (item,name) => {
    setState1((state1) => ({ ...state1, stateId: item,statename: name,  }))
    return handleKeyValuePair("state", item)
  }

  const [collapsed, setcollapsed] = React.useState(false);
  const toggleExpanded = () => {
    setcollapsed(!collapsed);
  };

  const [collapsed1, setcollapsed1] = React.useState(false);
  const toggleExpanded1 = () => {
    setcollapsed1(!collapsed1);
  };

  const [selectedCountry, setSelectedCountry] = useState({})
  const [selectedState, setSelectedState] = useState({})

  useEffect(() => {
    if (country) {
      loadStates(country)
    }
    setSelectedCountry(countries.filter((item) => item.iso2 === country)[0])
    setSelectedState(states.filter((item) => item.state_code === state)[0])
  }, [country, state, countries, states])


  const loadStates = (code) => {
    make_API_Call("get", `/loadstates?countrycode=${code}`)
      .then((data) => {
        if (data.length) {
          handleKeyValuePair("states", data)
        } else {
          handleKeyValuePair("states", [
            {
              id: "no_state",
              state_code: "no_state",
              country_code: code,
              name: "None",
            },
          ])
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
  return (
<View>
       <View style={{marginBottom:15, width: '93%',height: 49, borderWidth: 1, borderColor: '#e6e6e6',alignSelf: 'flex-start',}}>
       <TouchableOpacity onPress={toggleExpanded}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
               {state1.countryname ? (
                <Text style={{fontSize: 16, margin: 10, color: 'grey'}}>
                  {state1.countryname }
                </Text>
              ) : (
                <Text style={{fontSize: 16, margin: 10, color: 'grey'}}>
                  Select Country
                </Text>
              )}
              <Icon name="add" style={{margin: 7}} />
            </View>
          </TouchableOpacity>
          <BottomSheet
            visible={collapsed}
            onBackButtonPress={toggleExpanded}
            onBackdropPress={() => {
              setcollapsed(!collapsed);
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                width: '100%',
                height: 350,
              }}>
              <Header>
                <Body>
                  <Title style={{color: 'white', alignSelf: 'center'}}>
                    Select Country
                  </Title>
                </Body>
              </Header>
              <FlatList
                data={countries}
              // keyExtractor={(item) => item.iso2.toString()}
                renderItem={({item}) => {
                  return (
                    <List>
                      <ListItem avatar>
                        <Body>
                          <Text>{item.name}</Text>
                        </Body>
                        <Right style={{bottom: 6}}>
                                    <CheckBox
                                      value={state1.countryId.includes(item.iso2)}
                                      onValueChange={(value) =>
                                        handleCountry(item.iso2,item.name)
                                      }
                                    />
                        </Right>
                      </ListItem>
                    </List>
                  );
                }}
              />
            </View>
          </BottomSheet>
        
     </View>

     <View style={{marginBottom:15, width: '93%',height: 49, borderWidth: 1, borderColor: '#e6e6e6',alignSelf: 'flex-start',}}>
       <TouchableOpacity onPress={toggleExpanded1}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {state1.statename  ? (
                <Text style={{fontSize: 16, margin: 10, color: 'grey'}}>
                  {state1.statename }
                </Text>
              ) : (
                <Text style={{fontSize: 16, margin: 10, color: 'grey'}}>
                  Select State
                </Text>
              )}
              <Icon name="add" style={{margin: 7}} />
            </View>
          </TouchableOpacity>
          <BottomSheet
            visible={collapsed1}
            onBackButtonPress={toggleExpanded1}
            onBackdropPress={() => {
              setcollapsed1(!collapsed1);
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                width: '100%',
                height: 350,
              }}>
              <Header>
                <Body>
                  <Title style={{color: 'white', alignSelf: 'center'}}>
                    Select State
                  </Title>
                </Body>
              </Header>
              <FlatList
                data={states}
              // keyExtractor={(item) => item.iso2.toString()}
                renderItem={({item}) => {
                  return (
                    <List>
                      <ListItem avatar>
                        <Body>
                          <Text>{item.name}</Text>
                        </Body>
                        <Right style={{bottom: 6}}>
                                    <CheckBox
                                      value={state1.stateId.includes(item.state_code)}
                                      onValueChange={(value) =>
                                        handleState(item.state_code,item.name)
                                      }
                                    />
                        </Right>
                      </ListItem>
                    </List>
                  );
                }}
              />
            </View>
          </BottomSheet>
        
     </View>
     </View>
  )
}

export default CountryAndState

CountryAndState.prototype = {
  countries: PropTypes.array.isRequired,
  states: PropTypes.array.isRequired,
  state: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  handleKeyValuePair: PropTypes.func.isRequired,
  spacing: PropTypes.number.isRequired,
}

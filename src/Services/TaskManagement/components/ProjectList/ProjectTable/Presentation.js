import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Container} from 'native-base';
import ProjectTable from '../../ReusableUi/ProjectTable'
import {createFilter} from 'react-native-search-filter';
import validate from '../../../../../shared/validation';
import { it } from 'date-fns/locale';

function Presentation(props) {
  const {state, condition, tabPair, searchTerm} = props;

  const statusList = ['Open', 'Closed'];
  const KEYS_TO_FILTERS = ['clientname', 'startdate', 'enddate', 'status'];

  let num = Date.parse(new Date());

  const filterData = Object.values(state[tabPair[condition]].data).filter(
    (e) => e.startdate < num,
  );
  const data =
    condition === 2
      ? filterData.map((item) => {
          return {
            clientname: item.title,
            id: item.id,
            cid: item.cid,
            startdate: validate.dateFormatter(item.startdate),
            enddate: validate.dateFormatter(item.enddate),
            status: statusList.indexOf(item.status),
          };
        })
      : Object.values(state[tabPair[condition]].data).map((item) => {
          return {
            clientname: item.title,
            id: item.id,
            cid: item.cid,
            startdate: validate.dateFormatter(item.startdate),
            enddate: validate.dateFormatter(item.enddate),
            status: statusList.indexOf(item.status),
          };
        });
  let isLoading =
    state[tabPair[condition]].noOfLoadings === 0
      ? state[tabPair[condition]].isLoading
      : false;
  const filteredInfo = data.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

  if (!isLoading)
    return(
        <FlatList
        bounces={false}
          data={filteredInfo}
          renderItem={({item}) => {
            return (
             <ProjectTable item={item} {...props}/>
            );
          }}
        />

    );
  return <ActivityIndicator style={{top: 50}} />;
}

export default Presentation;

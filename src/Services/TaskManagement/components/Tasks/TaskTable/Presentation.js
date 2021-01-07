import React from 'react';
import {
  FlatList,
} from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {differenceInDays} from 'date-fns';
import {Container} from 'native-base';
import {configuration} from '../../../../../config/companyConfig';
import MetaInfo from '../../../../../shared/getMetaInfo';
import TaskTable from '../../ReusableUi/TaskTable'
import SearchInput, {createFilter} from 'react-native-search-filter';

function Presentation(props) {
  const {taskList, id, project, employee, searchTerm} = props;
  const metaInfo = new MetaInfo();
  const formatter = (date) => {
    let final = '';
    try {
      final = Intl.DateTimeFormat(
        configuration['date-code'],
        configuration.dateformat,
      ).format(new Date(date));
    } catch (error) {
      console.log(error);
      final = date;
    }
    return final;
  };

  dayjs.extend(relativeTime);

  const diff = dayjs();
  const getDueBy = (enddate, status) => {
    if (status === 'Completed' || status === 'Closed') return false;
    return new Date().setHours(0, 0, 0, 0) -
      new Date(enddate).setHours(0, 0, 0, 0) >
      0
      ? true
      : false;
  };

  const formatDueBy = (enddate, status) => {
    if (getDueBy(enddate, status)) {
      const days = differenceInDays(
        new Date().setHours(0, 0, 0, 0),
        new Date(enddate).setHours(0, 0, 0, 0),
      );
      if (days === 1) return days.toString() + ' day';
      return days.toString() + ' days';
    }
    return '---';
  };

  let tasksList = taskList;
  let data = [];
  let labels = project.useLabels;
  let projectMembers = Object.values(project.Users).map((user) => user.uid);
  let allAssignees = [];
  let temp = [];

  if (taskList) {
    taskList.forEach((task) => {
      temp.push(task.assignee && Object.values(task.assignee));
    });
    temp = [...new Set(temp)];
    if (employee.role === 'user') projectMembers = temp;
    projectMembers.forEach((member) => {
      let count = 0;
      taskList.forEach((task) => {
        if (task.assignee.includes(member)) {
          count++;
        }
      });
      allAssignees.push({
        uid: member,
        count: count,
      });
    });
  }
  // const validate = new Validation()

  const projectLabels = Object.values(project.labels).filter((e) => e.isExist);
  tasksList &&
    tasksList.forEach((task) => {
      data.push({
        title: task.title,
        id: task.id,
        cid: task.cid,
        startdate: formatter(task.startdate),
        enddate: formatter(task.enddate),
        status: task.status,
        assignees: task.assignee && task.assignee,
        createdByName: metaInfo.emailToName(task.createdBy),
        type: task.type,
        labels: projectLabels.filter(
          (item) => task.labels && Object.values(task.labels).includes(item.id),
        ),
        createdBy: task.createdBy,
        projectTaskId: project.cid + '-' + task.cid,
        category: task.category,
        priority: task.priority,
        taskId: task.category === 'subtask' ? task.taskId : '',
        dueby: formatDueBy(task.enddate, task.status),
        projectId: id,
        labelsList: projectLabels
          .filter(
            (item) =>
              task.labels &&
              Object.values(task.labels).filter(
                (items) => items.id === item.id,
              ),
          )
          .map((e) => e.name),
      });
    });

  const KEYS_TO_FILTERS = [
    'priority',
    'createdBy',
    'projectTaskId',
    'title',
    'type',
    'status',
  ];
  const filteredInfo = data.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
  console.log('s', searchTerm);
  return (
    <Container>
      <FlatList
        data={filteredInfo}
        renderItem={({item}) => {
          return (
            <TaskTable {...props} item={item}/>
          );
        }}
      />
    </Container>
  );
}

export default Presentation;

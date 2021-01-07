import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import TaskManagement from '../assets/checklist.png'
import EmployeeList from '../assets/employee.png'
import Wiki from '../assets/article.png'
import Clients from '../assets/crm.png'
import Placements from '../assets/recruitment.png'
import TimeSheets from '../assets/chronometer.png'
import Expenses from '../assets/expenses.png'
import Invoices from '../assets/bill.png'
import Deductions from '../assets/deductions.png'
import PayRolls from '../assets/salary.png'
import History from '../assets/history.png'
import Ess from '../assets/email.png'
import Letter from '../assets/letter.png'
const modules = [
  {
    text: "Task management",
    img:  <Image source={TaskManagement}style={{ width: 40,height: 40, }}/>,
    link: "TaskManagement",
    moduleName: "task-management",
  },
  {
    text: "Timesheets",
    img: <Image source={TimeSheets}style={{ width: 40,height: 40, }}/>,
    link: "TimeSheets",
    moduleName: "timesheets",
  },
  {
    text: "Expenses",
    img: <Image source={Expenses}style={{ width: 40,height: 40, }}/>,
    link: "Expenses",
    moduleName: "timesheets",
  },
  {
    text: "Invoices",
    img: <Image source={Invoices}style={{ width: 40,height: 40, }}/>,
    link: "Invoices",
    moduleName: "timesheets",
  },
  {
    text: "Deductions",
    img: <Image source={Deductions}style={{ width: 40,height: 40, }}/>,
    link: "Deductions",
    moduleName: "accounts-manager",
  },
  {
    text: "Payrolls",
    img: <Image source={PayRolls} style={{ width: 40,height: 40, }}/>,
    link: "PayRolls",
    moduleName: "accounts-manager",
  },
  {
    text: "Wiki",
    img: <Image source={Wiki} style={{ width: 40,height: 40, }}/>,
    link: "Wiki",
    moduleName: "wiki",
  },
  

  {
    text: "Employee",
    img: <Image source={EmployeeList}style={{ width: 40,height: 40, }}/>,
    link: "EmployeesList",
    moduleName: "employees-manager",
  },
  {
    text: "Ess Requests",
    img: <Image source={Ess}style={{ width: 40,height: 40, }}/>,
    link: "EssRequest",
    moduleName: "employee-self-services",
  },
  {
    text: "Letter Requests",
    img: <Image source={Letter}style={{ width: 40,height: 40, }}/>,
    link: "LetterRequest",
    moduleName: "employee-self-services-manager",
  },
  {
    text: "Placements",
    img: <Image source={Placements}style={{ width: 40,height: 40, }}/>,
    link: "Placements",
    moduleName: "timesheets-manager",
  },
  {
    text: "Clients",
    img: <Image source={Clients}style={{ width: 40,height: 40, }}/>,
    link: "ClientList",
    moduleName: "timesheets-manager",
  },
 
  {
    text: "History",
    img: <Image source={History}style={{ width: 40,height: 40, }}/>,
    link: "History",
    moduleName: "common-module",
  },
];

export default modules;

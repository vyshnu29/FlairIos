import React, { useEffect } from "react"
import AllSevices from '../../shared/HeaderBar/index'
import Wiki from '../../Services/Wiki/components/Index/index'
import Articles from '../../Services/Wiki/components/MoreArticles/Index/index'
import WikiSettings from '../../Services/Wiki/components/WikiSettings/index'
import EmployeesList from '../../Services/EmployeeManagment/components/EmployeeSort/Index/index'
import TaskManagement from '../../Services/TaskManagement/components/ProjectList/Index/index'
import NewProject from '../../Services/TaskManagement/components/NewProject/index'
import AcessTable from '../../Services/TaskManagement/components/ProjectHandleComponents/AccessTables/index'
import { createStackNavigator } from '@react-navigation/stack';
import ProjectTimeline from '../../screens/ProjectTimeline'
import SettingsTab from '../../Services/TaskManagement/components/ProjectHandleComponents/Settings'
import Tasks from '../../Services/TaskManagement/components/ProjectHandler/index'
import ViewArticle from '../../Services/Wiki/components/ViewArticle/index'
import WikiSearch from '../../shared/WikiSearch'
import ArticleHistory from '../../Services/Wiki/components/ArticleHistory/index'
import Labels from '../../Services/TaskManagement/components/Labels/index'
import EditArticle from '../../Services/Wiki/components/NewArticle/index'
import LinkTask from '../../Services/TaskManagement/components/Tasks/taskHandleComponents/LinkTask/index'
import UnLinkTask from '../../Services/TaskManagement/components/Tasks/taskHandleComponents/UnLinkTask/index'
import TaskTimeLine from '../../Services/TaskManagement/components/Tasks/taskHandleComponents/TimeLine/index'
import NewTask from '../../Services/TaskManagement/components/Tasks/taskHandleComponents/NewTask/index'
import EditTask from '../../Services/TaskManagement/components/Tasks/TaskActions/index'
import TasksHandler from '../../Services/TaskManagement/components/Tasks/TaskHandler/index'
import ProjectDetails from '../../Services/TaskManagement/components/ProjectHandleComponents/UpdateProject/index'
import ClientList from '../../Services/Clients/components/ClientSort/index'
import ViewClient from '../../Services/Clients/components/ViewClient/Index/index'
import Placements from '../../screens/PlacementsScreen'
import PlacementsView from '../../screens/PlacementsViewScreen'
import TimeSheets from '../../screens/TimeSheets'
import Expenses from '../../screens/ExpenseListScreen'
import Invoices from '../../Services/Invoices/components/InvoicesList/Index/index'
import Deductions from '../../screens/DeductionListScreen'
import PayRolls from '../../screens/PayrollsListScreen'
import History from '../../Services/History/index'
import ResetPassword from '../../Services/Authentication/components/ChangePassword/index'
import EssRequest from '../../screens/ESSRequestScreen'
import LetterRequest from '../../screens/LetterRequestScreen'
import ClientExpenses from '../../screens/ClientExpensesScreen'
import Spinner from "react-native-loading-spinner-overlay"

const Stack = createStackNavigator();

function StackScreens(props) {
  
  return (
      <Stack.Navigator  headerMode='none' >
          <Stack.Screen name="AllSevices"  component={AllSevices}/>
          <Stack.Screen name="ResetPassword"  component={ResetPassword}/>
          <Stack.Screen name="Wiki" component={Wiki}/>
          <Stack.Screen name="EmployeesList" component={EmployeesList}/>
          <Stack.Screen name="WikiSearch" component={WikiSearch}/>
          <Stack.Screen name="Articles" component={Articles}/>
          <Stack.Screen name="WikiSettings" component={WikiSettings}/>
          <Stack.Screen name="TaskManagement" component={TaskManagement}/>
          <Stack.Screen name="NewProject" component={NewProject}/>
          <Stack.Screen name="Tasks" component={Tasks}/>
          <Stack.Screen name="Settings" component={SettingsTab}/>
          <Stack.Screen name="AcessTable"  component={AcessTable}/>
          <Stack.Screen name="ProjectTimeline"  component={ProjectTimeline}/>
          <Stack.Screen name="ProjectDetails"  component={ProjectDetails}/>
          <Stack.Screen name="ViewArticle"  component={ViewArticle}/>
          <Stack.Screen name="ArticleHistory"  component={ArticleHistory}/>
          <Stack.Screen name="EditArticle"  component={EditArticle}/>
          <Stack.Screen name="NewTask"  component={NewTask}/>
          <Stack.Screen name="EditTask"  component={EditTask}/>
          <Stack.Screen name="TasksHandler"  component={TasksHandler}/>
          <Stack.Screen name="LinkTask"  component={LinkTask}/>
          <Stack.Screen name="Labels"  component={Labels}/>
          <Stack.Screen name="UnLinkTask"  component={UnLinkTask}/>
          <Stack.Screen name="TaskTimeLine"  component={TaskTimeLine}/>
          <Stack.Screen name="ClientList"  component={ClientList}/>
          <Stack.Screen name="ViewClient"  component={ViewClient}/>
          <Stack.Screen name="Placements"  component={Placements}/>
          <Stack.Screen name="PlacementsView"  component={PlacementsView}/>
          <Stack.Screen name="TimeSheets"  component={TimeSheets}/>
          <Stack.Screen name="Expenses"  component={Expenses}/>
          <Stack.Screen name="ClientExpenses"  component={ClientExpenses}/>
          <Stack.Screen name="Invoices"  component={Invoices}/>
          <Stack.Screen name="Deductions"  component={Deductions}/>
          <Stack.Screen name="PayRolls"  component={PayRolls}/>
          <Stack.Screen name="History"  component={History}/>
          <Stack.Screen name="EssRequest" component={EssRequest}/>
          <Stack.Screen name="LetterRequest"  component={LetterRequest}/>
      </Stack.Navigator>
  );
  return (<Spinner visible={true} />)
}


export default StackScreens

import React from 'react';
import {Avatar, Title} from 'react-native-paper';
import {View, FlatList,  Text, Dimensions} from 'react-native';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,

  Button,
  Icon,
  Input,
} from 'native-base';
import {configuration} from '../../config/companyConfig';
import validate from '../../shared/validation';
import MetaInfo from '../../shared/getMetaInfo';
import IconHis from 'react-native-vector-icons/MaterialIcons';

export default function Presentation(props) {
  const {history} = props;
  let historyList = history;
  const [searchTerm, SetsearchTerm] = React.useState('');
  const [visible, SetVisible] = React.useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const searchUpdated = (term) => {
    SetsearchTerm(term);
  };
  const formatter = (date) =>
    Intl.DateTimeFormat(configuration['date-code'], {
      ...configuration.dateformat,
    }).format(new Date(date));

  const metaInfo = new MetaInfo();

  let data = [];

  function formatSubject(type, subject, ActionBy) {
    console.log(subject);
    switch (type) {
      case 'demoteuser':
        return <Text note>Demoted {subject} to user.</Text>

      case 'enableuser':
        return <Text note>{subject} is activated.</Text>

      case 'promoteuser':
        return <Text note>Promoted {subject} to manager.</Text>

      case 'disableuser':
        return <Text note>{subject} is suspended.</Text>

      case 'createProject':
        return <Text note>Created project {subject.title}.</Text>
      case 'newLabel':
        return <Text note>Created New Label {subject.name}</Text>
      case 'updateLabel':
        return <Text note>Updated Label {subject.name}</Text>

      case 'createTask':
        return <Text note>Added task {subject.title}.</Text>

      case 'updateTask':
        return <Text note>Updated task {subject.title}.</Text>
      case 'expenseRejected':
        return <Text note>Rejected Expense {''}</Text>
      case 'expenseApproved':
        return <Text note>Approved Expense {''}</Text>
      case 'expenseUpdated':
        return <Text note>Updated Expense</Text>
      case 'placementCreated':
        return (
          <Text note>
            Placement Created With ID {''}
            {subject.placementID}
          </Text>
        );

      case 'inviteUser':
        return <Text note>Invited {subject}.</Text>

      case 'userRegister':
        return <Text note>Employee {subject} registered.</Text>

      case 'newCommentOnTask':
        return <Text note>Added comment to a task {subject.title}.</Text>

      case 'updateCommentOnTask':
        return <Text note>Updated Comment {subject.title}.</Text>
      case 'newClient':
        return <Text note>Created New Client {subject.title}.</Text>
      case 'timesheetUpdated':
        return <Text note>Updated Timesheet.</Text>
      case 'timesheetSubmitted':
        return <Text note>Submitted Timesheet.</Text>
      case 'updateCompanyDetails':
        return <Text note>Updated the company Details.</Text>

      case 'deleteCommentInTask':
        return (
          <Text note>
            Deleted comment {subject.title ? subject.title : ''}.
          </Text>
        )
      case 'deleteCommentInTask':
        return <Text note> {subject.title}.</Text>

      case 'inviteAgain':
        return <Text note>Invited again {subject}.</Text>

      case 'createSubTask':
        return <Text note>Added Subtask {subject.title}.</Text>

      case 'deleteUser':
        return <Text note>Removed {subject}.</Text>

      case 'updateProfile':
        try {
          return (
            <Text note>
              Updated {subject.email}{' '}
              {"'s " + subject.section.map((item) => item)}.
            </Text>
          )
        } catch (error) {
          return <Text note>Updated profile {subject}.</Text>
        }

      case 'addMemberToProject':
        return <Text note>Added {subject.uid} to Project.</Text>

      case 'deleteProjectMember':
        return <Text note>Removed {subject.uid} from Project.</Text>

      case 'updateProjectAccessLevels':
        return <Text note>Updated {subject.uid} Project permissions.</Text>

      case 'updateProject':
        return <Text note>Updated project: {subject.title}.</Text>

      case 'employeeRequestLetter':
        return <Text note>Requested {subject}.</Text>

      case 'officerRejectsLetter':
        return (
          <Text note>
            Rejected {subject.ActionOn} {subject.docType} letter.
          </Text>
        )

      case 'officerIssuesLetter':
        return (
          <Text note>
            Issued {subject.ActionOn} {subject.docType} letter.
          </Text>
        )

      case 'addAuthorisedSignature':
        return <Text note>{subject}'s signature added.</Text>

      case 'deletedAuthorisedSignature':
        return (
          <Text note>
            {subject}
            's signature removed.
          </Text>
        )

      case 'addLetterTemplate':
        return (
          <Text note>
            Created new letter template: {subject.name} in {subject.type}{' '}
          </Text>
        )

      case 'updateLetterTemplate':
        return (
          <Text note>
            Updated letter template: {subject.name} in {subject.type}{' '}
          </Text>
        )

      case 'deleteLetterTemplate':
        return (
          <Text note>
            Deleted letter template:{subject.name} from {subject.type}{' '}
          </Text>
        )

      case 'newCategoryInWiki':
        return (
          <Text note>New wiki category added: {subject.categoryName} .</Text>
        )

      case 'deleteCategoryInWiki':
        return (
          <Text note>A wiki category deleted: {subject.categoryName} .</Text>
        )

      case 'updateCategoryInWiki':
        return (
          <Text note>A wiki category updated: {subject.categoryName}.</Text>
        )

      case 'newPageInWiki':
        return <Text note>New wiki page created: {subject.title} .</Text>

      case 'updatePageInWiki':
        return <Text note>Wiki page updated: {subject.title} .</Text>

      case 'deletePageInWiki':
        return <Text note>Wiki page deleted: {subject.title} .</Text>

      case 'voteForWikiArticle':
        return <Text note>Voted for an article: {subject.title} .</Text>

      case 'downVoteForWikiArticle':
        return <Text note>Devoted for an article: {subject.title} .</Text>

      case 'followWikiArticle':
        return (
          <Text note>Started following the article {subject.title} .</Text>
        )

      case 'unFollowWikiArticle':
        return <Text note>Unfollowed the article: {subject.title} </Text>

      case 'newArticleComment':
        return (
          <Text note>
            Commented on the article:{' '}
            {subject.hasOwnProperty('title') ? subject.title : 'article'} .
          </Text>
        )

      case 'updateArticleComment':
        return (
          <Text note>
            Updated comment on the article:{' '}
            {subject.hasOwnProperty('title') ? subject.title : 'article'}.
          </Text>
        )

      case 'deleteArticleComment':
        return (
          <Text note>
            Deleted comment on the article:{' '}
            {subject.hasOwnProperty('title') ? subject.title : 'article'}.
          </Text>
        )
      case 'updatePlacement':
        return (
          <Text note>
            Updated Placement {' '}
            {subject.hasOwnProperty('title')
              ? subject.title
              : subject.sectionName}
            .
          </Text>
        )
      case 'addSectionToPlacement':
        return (
          <Text note>
            Addeed Section For Placement :{' '}
            {subject.hasOwnProperty('title')
              ? subject.title
              : subject.sectionNmae + 'For' + subject.placementID}
            .
          </Text>
        )

      default:
        return <Text note>-----------------</Text>
    }
  }

  historyList.forEach((history) => {
    data.push({
      actionby: history.actionBy,
      actionbyName: metaInfo.emailToName(history.actionBy),
      timestamp:
        history.createdAt === ''
          ? history.createdAt
          : formatter(history.createdAt),
      //history: formatSearch(history.type, history.subject),
      type: history.type,
      subject: Object.values(history.subject),
    });
  });
  const KEYS_TO_FILTERS = [
    'actionby',
    'actionbyName',
    'timestamp',
    'type',
    'subject',
  ];
  const filteredEmails = data.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
  return (
    <Container>
      {!visible ? (
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                props.navigation.goBack();
              }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white'}}>History</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                SetVisible(!visible);
              }}>
              <Icon name="search" />
            </Button>
          </Right>
        </Header>
      ) : null}

      <View>
        {visible ? (
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => {
                  SetVisible(!visible);
                }}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <View>
                <Input
                  placeholder="Search..."
                  autoFocus
                  onChangeText={(term) => {
                    searchUpdated(term);
                  }}
                  placeholderTextColor="grey"
                  style={{width: windowWidth - 100}}
                />
              </View>
            </Body>
            <Right />
          </Header>
        ) : null}
      </View>
      <FlatList
        data={filteredEmails}
        keyExtractor={(item, index) => {
          return item.timesheetID;
        }}
        renderItem={({item}) => {
          return (
            <List>
              <ListItem avatar>
                <Left>
                  <IconHis name="history" size={26}  color="grey" />
                </Left>
                <Body>
                  <Title style={{color: '#62B1F6', fontSize: 14}}>{item.actionbyName}</Title>
                  {formatSubject(item.type, item.subject, item.actionBy)}
                </Body>
                <Right>
                  <Text style={{color: 'grey',fontSize:12}} >{item.timestamp}</Text>
                </Right>
              </ListItem>
            </List>
          );
        }}
      />
    </Container>
  );
}

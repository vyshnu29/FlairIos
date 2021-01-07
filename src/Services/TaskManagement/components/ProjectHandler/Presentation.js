import React from 'react';
import TaskManager from '../Tasks/TaskManager';
import validate from '../../../../shared/validation';
import UnAuthorized from '../../../../shared/unAuthorized';

export default function Presentation(props) {
  const {
    project,
    handleComponentUpdate,
    id,
    modules,
    EmpDetails,
    _load_project,
  } = props;

  let employee = {};
  let access = false;
  //  const id = project[0].id
  let supervisorCount = 0;
  try {
    const employees = Object.values(project[0].Users);
    employee = employees.filter((user) => user.uid === EmpDetails.uid)[0];
    if (employees.map((user) => user.uid).includes(EmpDetails.uid))
      access = true;
    else if (project[0].createdBy === EmpDetails.email) access = true;
  } catch (error) {
    employee = {};
    access = false;
  }
  //  checking supervisor count
  try {
    const employees = project[0].Users;
    employees.forEach((member) => {
      if (validate.checkSupervisor(member.uid)) supervisorCount++;
    });
  } catch (error) {}

  if (
    EmpDetails.role === 'admin' ||
    modules.includes('task-management-manager') ||
    (access && (employee.create || employee.update || employee.read))
  )
    return (
      <>
        {supervisorCount < 2 ? (
         <TaskManager
         {...props}
         handleComponentUpdate={handleComponentUpdate}
       />
        ) : (
          <UnAuthorized
            text={
              'This project contain multiple Supervisors, Please contact Admin/Manager"'
            }
            colorProp={'#f0ad4e'}
            {...props}
          />
        )}
      </>
    );

  return (
    <UnAuthorized
      text={'You are unauthorized to view this content'}
      colorProp={'#d9534f'}
      {...props}
    />
  );
}

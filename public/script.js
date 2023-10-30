const inquirer = require('inquirer');
const ConnectToDatabase = require('../db/connection');
const { get } = require('http');


  async function GetData(data) {
    try {
      const database = await ConnectToDatabase();

      let [results] = [];
      let choice = []

      switch(data){
        case 'department':
            [results] = await database.execute('SELECT department FROM department');
            choice = results.map((res) => `${res.department_id}: ${res.department}`);
            break;
        case 'role':
            [results] = await database.execute('SELECT job_title FROM role');
            choice = results.map((res) => `${res.role_id}: ${res.job_title}`);
            break;
        case 'employees':
            [results] = await database.execute('SELECT * FROM employees');
            choice = results.map((res) => `${res.employee_id}: ${res.first_name} ${res.last_name}`);
           break;
      }

      return choice;
      
    } catch (err) {
      console.error('Error executing SQL query: ' + err);
      throw err;
    }
  }

async function Start(){
    HomeMenu();
}

function HomeMenu() {
    inquirer.prompt([{
        type: 'list',
        name: 'mainmenu',
        message: 'Main Menu',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
        ]
    }]).then((result) => {
        switch(result.mainmenu){
            case 'View all departments':
                console.log("Fetching All Departments...");
                GetTable("department");
                break;
            case 'View all roles':
                console.log("Fetching All Roles...");
                GetTable("role");
                break;
            case 'View all employees':
                console.log("Fetching All Employees...");
                GetTable("employees");
                break;
            case 'Add a department':
                console.log("Opening Add Department Menu");
                OpenMenu("department");
                break;
            case 'Add a role':
                console.log("Opening Add Role Menu");
                OpenMenu("role");
                break;
            case 'Add an employee':
                console.log("Opening Add Employee Menu");
                OpenMenu("employee");
                break;
            case 'Update an employee role':
                console.log("Opening Update Employee Role Menu");
                OpenMenu("employee_edit");
                break;
        }
    })
}

async function GetTable (table) {
    try {
        const database = await ConnectToDatabase();
        const [results] = await database.execute(`SELECT * FROM ${table}`);
        console.table(results);
        await database.end();
        HomeMenu();
      } catch (err) {
        console.error('Error executing SQL query: ' + err);
      }
}

async function OpenMenu(menu){
    let questions = [];
    switch(menu){
        case "department":
            questions = [{
                type: 'input',
                name: 'department_name',
                message: 'Please enter new department name : '
            }]
            break;
        case "role":
            questions = [{
                type: 'input',
                name: 'role_name',
                message: 'Please enter new role name : '
            }, {
                type: 'input',
                name: 'role_salary',
                message: 'Please enter new roles salary (e.g 80k): '
            },  {
                type: 'list',
                name: 'role_department',
                message: 'Please select department for this role: ',
                choices: await GetData("department"),
            }]
            break;
        case "employee" :
            questions = [{
                type: 'input',
                name: 'firstname',
                message: 'Please enter the first name : '
            }, {
                type: 'input',
                name: 'lastname',
                message: 'Please enter the last name : '
            },  {
                type: 'list',
                name: 'employee_role',
                message: 'Please select a role for this employee : ',
                choices: await GetData("role"),
            },  {
                type: 'list',
                name: 'employee_manager',
                message: 'Please select a manager for this employee : ',
                choices: await GetData("employees"),
            }]
            break;
        case "employee_edit":
            questions = [{
                type: 'list',
                name: 'employee_manager',
                message: 'Please select an employee to edit : ',
                choices: await GetData("employees"),
            }, {
                type: 'list',
                name: 'employee_role',
                message: 'Please select a new role for this employee : ',
                choices: await GetData("role"),
            }, ]
            break;
    }

    let results;
    await inquirer.prompt(questions).then((_results) => {
        results = _results;
    })

    switch(menu){
        case "department":
            console.log(`
            Added new department with name ${results.department_name}
            `);
            break;
        case "role":
            console.log(`
            ${results.role_name} has been added to the ${results.role_department} department with a pay rate of ${results.salary}
            `);
            break;
        case "employee" :
            console.log(`
            ${results.first_name} ${results.last_name} has been added as an employee
            `);
            break;
        case "employee_edit":
            break;
    }

    HomeMenu();
}

//===================================================
//====================== Running Logic ==============
//===================================================

Start();
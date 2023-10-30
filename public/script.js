const inquirer = require('inquirer');
const ConnectToDatabase = require('../db/connection');
const { get } = require('http');

async function GetDepartments() {
    try {
      const database = await ConnectToDatabase();
      const [results] = await database.execute('SELECT department FROM department');
      const departmentChoices = results.map((res) => res.department);

      return departmentChoices;
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
                choices: await GetDepartments(),
            }]
            break;
        case "employee" :
            break;
        case "employee_edit":
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
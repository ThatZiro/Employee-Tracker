const inquirer = require('inquirer');

function Start(){
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
        console.log(result);
        switch(result.mainmenu){
            case 'View all departments':
                console.log("Fetching All Departments");
                break;
            case 'View all roles':
                console.log("Fetching All Roles");
                break;
            case 'View all employees':
                console.log("Fetching All Employees");
                break;
            case 'Add a department':
                console.log("Opening Add Department Menu");
                break;
            case 'Add a role':
                console.log("Opening Add Role Menu");
                break;
            case 'Add an employee':
                console.log("Opening Add Employee Menu");
                break;
            case 'Update an employee role':
                console.log("Opening Update Employee Role Menu");
                break;
        }

        HomeMenu();
    })
}


//===================================================
//====================== Running Logic ==============
//===================================================

Start();
// README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
//-how to link the contense pages-[Custom foo description](#foo)
//# Foo

const inquirer = require("inquirer");
const fs = require("fs");

inquirer
	.prompt([
		{
			type: "input",
			name: "projectTitle",
			message: "What is the title of the project?",
		},
		{
			type: "input",
			name: "description",
			message: "What is the description?",
		},
		{
			type: "input",
			name: "installation",
			message: "What is the installation process?",
		},
		{
			type: "input",
			name: "usage",
			message: "What is the usage information?",
		},
		{
			type: "input",
			name: "license",
			message: "What is the license is the application covered under?",
		},
		{
			type: "input",
			name: "contributing",
			message: "What are the contribution guidelines?",
		},
		{
			type: "input",
			name: "tests",
			message: "What are the test instructions?",
		},
		{
			type: "input",
			name: "github",
			message: "What is your GitHub username?",
		},
		{
			type: "input",
			name: "email",
			message: "What is your email?",
		},
		{
			type: "input",
			name: "contact",
			message: "What is the best way to reach you?",
		},
	])
	.then(
		(
			projectTitle,
			description,
			installation,
			usage,
			license,
			contributing,
			tests,
			email,
			contact
		) => {
			// Use user feedback for... whatever!!
			const readme = `${projectTitle} 

        #despcrition
        ${description}

        #table-of-Contents
        [Description](#description)

        #installation
        ${installation}
        
        #usage
        ${usage}

        #license
        ${license}

        #contributing
        ${contributing}

        #tests
        ${tests}
        
        #questions
        ${email}
        ${contact}`;

			fs.writeFile("README.md", readme, (err) =>
				err ? console.error(err) : console.log("Success!")
			);
		}
	)
	.catch((error) => {
		if (error.isTtyError) {
			// Prompt couldn't be rendered in the current environment
		} else {
			// Something else went wrong
			console.log("errr");
		}
	});

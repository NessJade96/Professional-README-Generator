const inquirer = require("inquirer");
const fs = require("fs");

let lookuplicenseBadge = {
	"Apache 2.0": `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`,
	MIT: `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`,
	"Boost 1.0": `[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)`,
};

let lookup = {
	"Apache 2.0": `
        Copyright [yyyy] [name of copyright owner]

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
     
          http://www.apache.org/licenses/LICENSE-2.0
     
        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.`,
	MIT: `Copyright [DATE] [name of copyright owner]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`,
	"Boost 1.0": `Boost Software License - Version 1.0 - August 17th, 2003

    Permission is hereby granted, free of charge, to any person or organization
    obtaining a copy of the software and accompanying documentation covered by
    this license (the "Software") to use, reproduce, display, distribute,
    execute, and transmit the Software, and to prepare derivative works of the
    Software, and to permit third-parties to whom the Software is furnished to
    do so, all subject to the following:
    
    The copyright notices in the Software and this entire statement, including
    the above license grant, this restriction and the following disclaimer,
    must be included in all copies of the Software, in whole or in part, and
    all derivative works of the Software, unless such copies or derivative
    works are solely in the form of machine-executable object code generated by
    a source language processor.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT
    SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE
    FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE,
    ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.`,
};

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
			type: "checkbox",
			name: "license",
			message: "what license will you choose?",
			choices: ["Apache 2.0", "Boost 1.0", "MIT"],
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
	.then((args) => {
		const {
			projectTitle,
			description,
			installation,
			usage,
			license,
			contributing,
			tests,
			email,
			contact,
			result,
		} = args;
		function getLicense(license) {
			let result = lookup[license];
			return result;
		}
		function getLicenseBadge(license) {
			let licenseBadge = lookuplicenseBadge[license];
			return licenseBadge;
		}
		const licenseResponse = getLicense(license);
		const licenseBadgeResponse = getLicenseBadge(license);

		const readme = `# ${projectTitle} ${licenseBadgeResponse}

## despcrition
${description}

## table-of-Contents
[Description](#description) <br/>
[Installation](#installation) <br/>
[Usage](#usage) <br/>
[License](#license) <br/>
[Contributing](#contributing) <br/>
[Tests](#tests) <br/>
[Questions](#questions) <br/>

## installation
${installation}
        
## usage
${usage}

## license
${licenseResponse}

## contributing
${contributing}

## tests
${tests}
        
## questions
${email}
${contact}
`;

		fs.writeFile("README.md", readme, (err) =>
			err ? console.error(err) : console.log("Success!")
		);
	})
	.catch((error) => {
		if (error.isTtyError) {
		} else {
			console.log(error);
		}
	});

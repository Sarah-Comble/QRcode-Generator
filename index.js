
// inquirer npm package to get user input.

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      type: 'input',
      name: 'text',
      message: 'What text do you want to convert to QR code?',
    },
  ])

  // qr-image npm package to turn the user entered URL into a QR code image.

  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.text;
    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('qr.png'));
    console.log('QR code generated successfully!');

// txt file to save the user input using the native fs node module.

    fs.writeFile("URL_FROM_USER.txt", answers.text, (err) => {
    if (err) throw err; 
    console.log("file has been saved!");
  });

  })


  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else went wrong", error);
    }
  });



const querystring = require('querystring');

const inputString = "name=Lan&course=NodeJS&score=9";

const parsedData = querystring.parse(inputString);

console.log(`Name: ${parsedData.name}`);
console.log(`Course: ${parsedData.course}`);
console.log(`Score: ${parsedData.score}`);

const newStudentObj = {
  name: "Dong",
  course: "NodeJS",
  score: 10
};

const newQueryString = querystring.stringify(newStudentObj);

console.log(newQueryString); 

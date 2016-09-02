#Adaptive Quizzing

This will be an application which will present students with questions that adapt from free response to multiple choice with progressively fewer choices in order to match the student's level of recall.

##TODO:
1. Need to create a ref/populate from the question schema's userID field to a User model. 
2. Once authentication is implemented, the userid should be stored in the session and used when POSTing a question.

##DOCS:
In version 1 of this app, there are 3 models: Question, Topic, Users. Version 2 will have a model for a "Quiz," which will be randomly generated based on topic/subtopic selection.

Currently, the user model has prototypal methods to validate a password and to hash a password. the password hashing occurs as a middleware/hook before db write.

Authentication happens via a post to /api/users/login route, which is in the users.js routes file. There's an aux function in this file called prepSession which is the function responsible for writing the authentication/authorization data to the session. Currently, there's a boolean value for authentication, a username, and a user ID is missing.

----
One alternative:  

The Quiz model will have the following:
  * id
  * owner: determines if you can edit quiz or view results
  * questions[] with references to question ids
  * participants[] with refs to user ids (used for authorization to access/view)
  * submissions[]: with refs to submission model ids
  
There needs to be a quizSubmission model as well:
  * id
  * userid
  * quizid (from request parameter)
  * Array of tuples for answers: {questionid, answerCorrect:boolean}
  
---
Another alternative:  

User just hits an endpoint and posts a payload with a number of questions, a topic and an array of subtopics. Gets back an array of questions. This is simpler and more expansible. No security necessary.
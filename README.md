#Adaptive Quizzing

This will be an application which will present students with questions that adapt from free response to multiple choice with progressively fewer choices in order to match the student's level of recall.

##TODO:
1. Need to create a questionType field in the schema to flag whether the question will be adaptive or not.
2. Need to create a ref/populate from the question schema's userID field to a User model. 
3. Need to implement user models and authentication.
4. Once authentication is implemented, the userid should be stored in the session and used when POSTing a question.
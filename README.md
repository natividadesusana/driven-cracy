# Project - Drivencracy API

This project aims to build an API for creating and voting in polls using Node.js and MongoDB. The API will be straightforward, enabling users to create and vote on polls, with options stored in collections using the MongoDB library.

## Data storage
   - To persist data (poll, poll and vote), use Mongo collections with the `mongodb` library.
   - The format of a poll must be:
    
         {
         _id: ObjectId("54759eb3c090d83494e2d222"),
         title: 'What is your favorite programming language?',
         expireAt: "2022-02-28 01:00"
         }
        
   - The format of a voting option must be:

         {
         _id: ObjectId("54759eb3c090d83494e2d999"),
         title: "Javascript",
         pollId: ObjectId("54759eb3c090d83494e2d222")
         }
        
   - The format of a vote must be:
        
         {
         _id: ObjectId("54759eb3c090d83494e2d000")
         createdAt: "2022-02-13 01:00",
         choiceId: ObjectId("54759eb3c090d83494e2d999"),
         }
 
        
## POST `/poll`
   - [ ] It must receive a title parameter in the body of the request, containing the name of the poll to be registered and expireAt, containing the poll expiration date and time:

         {
             title: "What is your favorite language?",
         expireAt: "2022-02-28 01:00"
         }
        
   - [ ] **Title** cannot be an empty string, return status 422.
   - [ ] If **expireAt** is empty it should be considered 30 poll days by default.
   - [ ] Should return the poll created in case of success with status 201.

## GET `/poll`
   - [ ] Returns the list of all polls:

         [
           {
           _id: "54759eb3c090d83494e2d222",
               title: "What is your favorite language?",
           expireAt: "2022-02-28 01:00"
           },
         ...
         ]
    
## POST `/choice`
   - [ ] It must receive a title parameter in the body of the request, containing the name of the option to be registered and pollId.
   
         {
             title: "JavaScript",
         pollId: "54759eb3c090d83494e2d222",
         }
        
     - Validation:
         - [ ] A poll option cannot be entered without an existing poll, return status 404.
         - [ ] **Title** cannot be an empty string, return status 422.
         - [ ] **Title** cannot be repeated, return status 409.
         - [ ] If the poll has already expired, it should return an error with status 403.
   - [ ] Should return the created voting option in case of success with status 201.

## GET `/poll/:id/choice`
   - [ ] Returns the list of voting options for a poll:
 
         [
           {
           _id: "54759eb3c090d83494e2d999",
           title: "Javascript",
           pollId: "54759eb3c090d83494e2d222"
           },
           {
           _id: "54759eb3c090d83494e2d888",
           title: "Python",
           pollId: "54759eb3c090d83494e2d222"
           },
           ...
         ]
    
   - [ ] Validation: if the poll does not exist, it must return status 404.

## POST `/choice/:id/vote`
   - [ ] Does not receive any data from the request body. Must register a vote for the selected option.
   - [ ] The vote must store the date and time it was created in the backend.
     - Validations:
         - [ ] Check if it is an existing option, if it does not exist, return 404.
         - [ ] Cannot be registered if the poll is already expired, return error 403.
   - [ ] Returns status 201 on success.
   
## GET `/poll/:id/result`
   - [ ] Returns the result of a poll, that is, the **most voted** voting option in the poll so far, following the suggested format:
   
         {
           _id: "54759eb3c090d83494e2d222",
           title: "What is your favorite programming language?"
           expireAt: "2022-02-14 01:00",
           result : {
           title: "Javascript",
           votes: 487
           }
         }
    
  - [ ] Validation: if the poll does not exist, it must return status 404.

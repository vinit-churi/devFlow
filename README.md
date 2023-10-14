# Task: Active Lesson 16 - Create Votes UI
 - create action to upvote and downvote
    - upvote the user when user clicks on the upvote icon then disable it until the response from the server is received 
    
    - if the user has has already upvoted. remove the upvote.
    - similar thing for the downvote.

## what Actions to write?

 - action to upvote
    - upvote the user when user clicks on the upvote icon then disable it until the response from the server is received 
    - when clicked on the already upvoted icon then remove the upvote
 - action to downvote
    - downvote the user when user clicks on the downvote icon then disable it until the response from the server is received
    - when clicked on the already downvoted icon then remove the downvote

## parameters for the actions?

 - upvote and downvote operation is to be performed on question and answers model
    - <b>Question</b>
        - question id
        - user id 
    - <b>Answer</b>
        - answer id
        - user id 

## How to handle the UI update ?
    > I think the Votes component should be a client component 
    > This component will receive prop
    > votes type => question | answer
    > current votes data => upvotes and downvotes count
    > the votes data should be loaded the the parent component 
    > i.e in the question page, I think the data is already fetch as we are required to render it.
    


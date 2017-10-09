Readable
=====

by Dario Varotto

## Project 2 - Udacity React Nanodegree

A content and comment web app.
 Users will be able to post content to predefined categories, comment on their posts and 
 other user's posts, and vote on posts and comments.
 Users will also be able to edit and delete posts and comments.
 
Bootstrapped with create-react-app.

UI powered by [material-ui 1.0beta](https://material-ui-next.com).
Using React-Router for routing, React Saga for dealing with async API calls. 

### Notes

When fetching the list of posts per category, I'm doing an API call when changing the category:
having small posts, would allow also to keep all posts in the state and just filter them,
but I wanted to deal with the more generic case, where we'll have many posts, and they can
come paginated, so a different category page will need a new API call.



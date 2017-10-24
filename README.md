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
Using [React-Router](https://github.com/ReactTraining/react-router)
 for routing, [Redux-Saga](https://github.com/redux-saga/redux-saga)
 for dealing with async API calls. 

### How to run it
1. Clone and run the API server:

	Instructions here:
		https://github.com/udacity/reactnd-project-readable-starter

2. Clone this app

	```
	git clone git@github.com:dariosky/udacity-readable.git
	cd udacity-readable
	```
3. Run it like the usual create-react-app applications:

	```
	npm install
	npm start
	```
	 
### Notes

When fetching the list of posts per category, I'm doing an API call when changing the category:
having just a few posts, would allow to keep all posts in the state and just filter them,
but I wanted to deal with the generic case, where we'll have many posts, and they can
come paginated, so a different category page will need a new API call.

In the `saga.js` we can enable `delayedRequest` to test
delays on the API calls, and see the async sagas at work.

From the post-list page we can add a post,
while from the post detail we can see body, comments and edit the
post via a similar button.

All of the application state is kept in redux:
I used 4 reducers:

* posts: keep the list of posts in the current tab
* categories: is queried once to get the available categories
	and keep state of the current once
* options: for the application preferences, currently just the sort order
* postDetail: the state for an eventual post detail,
	here we keep the open postId and its comments

For convenience the application is also hosted 
in http://readable.netlify.com/
(but it works with your server API on your localhost)

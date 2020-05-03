var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var fs = require('fs');
var posts = require('./posts.json');
var users = require('./users.json');

app.use(express.static('client'));


/**
 * @api {get} /posts Request all posts
 * @apiName GetPosts
 * @apiGroup Posts
 * 
 * @apiSuccess {JSON} posts Posts from all users
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "1":{
 *              "author":{
 *                  "img":"https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png",
 *                  "name":"Charlie47"
 *              },
 *              "content":{
 *                  "title":"Weekend in London",
 *                  "timestamp":"3 January 2020",
 *                  "cover_img":"https://cdn.londonandpartners.com/-/media/images/london/visit/general-london/towerbridgecopyrightvisitlondoncomantoinebuchet.jpg?mw=1920&hash=B6672601055B38B34C592E0160B0445AA063B876",
 *                  "text":"Had a fantastic getaway in London. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog."
 *              },
 *              "comments":{
 *                  "number_of":"4",
 *                  "comment":[
 *                      {
 *                          "img":"https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg",
 *                          "name":"Bill",
 *                          "timestamp":"5 January 2020 09:19",
 *                          "text":"Sounds amazing! Hope you had a good time!"}
 *          ...
 */
app.get('/posts', function (req, resp) {
  resp.send(posts);
});

/**
 * @api {post} /posts/new Send post data to create new post
 * @apiName NewPost
 * @apiGroup Posts
 * 
 * @apiParam {String} post_title    Title of post entered by user.
 * @apiParam {String} user_img      URL of user's profile picture.
 * @apiParam {String} username      Username of logged-in user.
 * @apiParam {String} timestamp     Date and time when post was made.
 * @apiParam {String} post_img      URL of image to be used for the post.
 * @apiParam {String} post_text     Content of the post.
 * 
 * @apiSuccess {JSON} content Returned parameters.
 * 
 * @apiSuccessExample Success-Example:
 *      HTTP/1.1 200 OK
 *      {
 *          post_title:"Weekend in London",
 *          user_img:"https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png",
 *          username:"Charlie47",
 *          timestamp:"3 January 2020",
 *          post_img:"https://cdn.londonandpartners.com/-/media/images/london/visit/general-london/towerbridgecopyrightvisitlondoncomantoinebuchet.jpg?mw=1920&hash=B6672601055B38B34C592E0160B0445AA063B876",
 *          post_text:"Had a fantastic getaway in London. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog."
 *      }
 * 
 */
app.post('/posts/new', function (req, resp) {
  const content = req.body;
  let max = 0;
  for (var post in Object.keys(posts)) {
    if (parseInt(post) > max) {
      max = parseInt(post);
    }
  }
  max += 2;
  const number = max.toString();
  post = {
    author: {
      img: content.user_img,
      name: content.username
    },
    content: {
      title: content.post_title,
      timestamp: content.timestamp,
      cover_img: content.post_img,
      text: content.post_text
    },
    comments: {
      number_of: 0,
      comment: []
    }
  };
  posts[number] = post;
  var json = JSON.stringify(posts);
  fs.writeFile('./posts.json', json, function (err) {
    if (err) throw err;
    console.log('new post added');
  });

  resp.json(content);
});

/**
 * @api {post} /posts/comments/new Send comment data to create new comment
 * @apiName NewComment
 * @apiGroup Posts
 * 
 * @apiParam {String} postID        Unique ID of new post.
 * @apiParam {String} authorImg   URL of image for user's profile picture.
 * @apiParam {String} authorName    Username of user making comment.
 * @apiParam {String} text          Content of comment.
 * 
 * @apiSuccess {JSON} comment Returned parameters.
 * 
 * @apiSuccessExample Success-Example:
 *      HTTP/1.1 200 OK
 *      {
 *          postID:"1",
 *          authorImg:"https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg",
 *          authorName:"Bill",
 *          text:"Sounds amazing! Hope you had a good time!"
 *      }
 */
app.post('/posts/comments/new', function (req, resp) {
  const comment = req.body;
  const now = new Date();
  const month = now.toLocaleString('default', { month: 'long' });
  const timestamp = now.getDate() + ' ' + month + ' ' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes();

  const insert = {
    img: comment.authorImg,
    name: comment.authorName,
    timestamp: timestamp,
    text: comment.text
  };

  posts[comment.postID].comments.comment.push(insert);
  const number = posts[comment.postID].comments.number_of;
  const newNumber = (parseInt(number, 10) + 1).toString();
  posts[comment.postID].comments.number_of = newNumber;

  var json = JSON.stringify(posts);
  fs.writeFile('./posts.json', json, function (err) {
    if (err) throw err;
    console.log('new comment added');
  });

  resp.json(comment);
});

/**
 * @api {get} /user Request to check if a user exists
 * @apiName CheckUserExists
 * @apiGroup User
 * 
 * @apiParam {String} uname Username of user to search for.
 * 
 * @apiSuccess {Boolean} found Whether the user searched for exists.
 * 
 * @apiSuccessExample Success-Example:
 *      HTTP/1.1 200 OK
 *      true
 */
app.get('/user', function (req, resp) {
  const username = req.query.uname;
  let found = false;
  for (var user in users.users) {
    if (username === users.users[user].username) {
      found = true;
      break;
    }
  }
  resp.send(found);
});

/**
 * @api {post} /user/new Send user data to create a new user account
 * @apiName CheckUserExists
 * @apiGroup User
 * 
 * @apiParam {String} username  Username of new user.
 * @apiParam {String} password  Password of new user.
 * @apiParam {String} img       URL of new user's profile picture.
 * 
 * @apiSuccess {JSON} newUser   Returned parameters.
 * 
 * @apiSuccessExample Success-Example:
 *      HTTP/1.1 200 OK
 *      {
 *          username:"Bill",
 *          password:"Bill123",
 *          img:"https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg"
 *      }
 */
app.post('/user/new', function (req, resp) {
  console.log('adding new user...');
  const newUser = req.body;
  users.users.push(newUser);

  var json = JSON.stringify(users);
  fs.writeFile('./users.json', json, function (err) {
    if (err) throw err;
    console.log('new user added');
  });
  resp.json(newUser);
});

/**
 * @api {get} /user/login Request to confirm a user's username and password
 * @apiName LoginUser
 * @apiGroup User
 * 
 * @apiParam {String} uname Username of user to be authenticated.
 * @apiParam {String} pass  Password of user to be authenticated.
 * 
 * @apiSuccess {JSON} [user]        Details of authenticated user.
 * @apiSuccess {Boolean} [found]    Whether the user exists.
 * 
 * @apiSuccessExample Success-Example:
 *      HTTP/1.1 200 OK
 *      {
 *          username:"Bill",
 *          password:"Bill123",
 *          img:"https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg"
 *      }
 */
app.get('/user/login', function (req, resp) {
  const username = req.query.uname;
  const password = req.query.pass;
  var found = false;
  for (var user in users.users) {
    if (username === users.users[user].username && password === users.users[user].password) {
      resp.json(users.users[user]);
      found = true;
      break;
    }
  }
  if (!found) {
    resp.send(found);
  }
});

module.exports = app;

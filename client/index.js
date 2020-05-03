var user = 0;

function makeAll (posts, filter = '', author = '') {
  filter = filter.toLowerCase();
  if (author === '') {
    var content = '<h4><small>ALL POSTS</small></h4>';
  } else {
    content = '<h4><small>MY POSTS</small></h4>';
  }
  var keys = Object.keys(posts);
  var pos = -1;

  const cards = [];
  for (var post in posts) {
    let card = '';
    if (filter === '' || (filter !== '' && (posts[post].content.title.toLowerCase().includes(filter) || posts[post].author.name.toLowerCase().includes(filter) || posts[post].content.text.toLowerCase().includes(filter)))) {
      if (author === '' || (author !== '' && posts[post].author.name.includes(author))) {
        pos += 1;
        card += '<hr><h2>' + posts[post].content.title + '</h2>';
        card += '<h5><form role="form"><img src="' + posts[post].author.img + '" class="img-circle" height="65" width="65"> ' + posts[post].author.name + ' on ' + posts[post].content.timestamp;

        card += '<h5><img class="cover" src="' + posts[post].content.cover_img + '"></h5><br>';
        card += '<p>' + posts[post].content.text + '</p><hr>';

        card += '<p><span class="badge">' + posts[post].comments.number_of + '</span> Comments:</p><br><div class="row">';

        for (var comment in posts[post].comments.comment) {
          card += '<div class="col-sm-2 text-center"><img src="' + posts[post].comments.comment[comment].img + '" class="img-circle" height="65" width="65"></div>';
          card += '<div class="col-sm-10"><h4>' + posts[post].comments.comment[comment].name + '<small> ' + posts[post].comments.comment[comment].timestamp + '</small></h4>';
          card += '<p>' + posts[post].comments.comment[comment].text + '</p><br><br></div>';
        }
        card += '</div><h4> Leave a Comment:</h4><form role="form"><div class="form-group"><textarea id="commenttext' + keys[pos] + '" class="form-control" rows="3" required></textarea></div><button id="commentbutton' + keys[pos] + '" type="button" class="btn btn-danger" onclick="newComment(' + keys[pos] + ')">Submit</button></form></div><br>';
      }
    }
    cards.push(card);
  }

  for (var i in cards.reverse()) {
    content += cards[i];
  }

  if (pos !== -1) {
    return content;
  } else {
    return content + '<hr>NO POSTS AVAILABLE<br>';
  }
}

function makeNewPostPage () {
  let content = '<h4><small>NEW POST</small></h4>';
  content += '<hr><h2><form><label>Title: </label> <input type="text" id="posttitle"></form></h2>';
  const now = new Date();
  const month = now.toLocaleString('default', { month: 'long' });
  const timestamp = now.getDate() + ' ' + month + ' ' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes();

  content += '<h5><form role="form"><img src="' + user.img + '" class="img-circle" height="65" width="65"> ' + user.username + ' on ' + timestamp;

  content += '<br><h5><form><label>Image URL: </label> <input type="text" id="postimg"></form></h5><br>';

  content += '</div><h4> Your Post:</h4><form role="form"><div class="form-group"><textarea id="posttext" class="form-control" rows="3" required></textarea></div><button id="submitbutton" type="button" class="btn btn-danger" onclick="newPost()">Submit</button></form></div><br>';

  document.getElementById('main-content').innerHTML = content;
  document.getElementById('nav_btn_home').className = '';
}

async function newPost () {
  const now = new Date();
  const month = now.toLocaleString('default', { month: 'long' });

  const content = {
    post_title: document.getElementById('posttitle').value,
    user_img: user.img,
    username: user.username,
    timestamp: now.getDate() + ' ' + month + ' ' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes(),
    post_img: document.getElementById('postimg').value,
    post_text: document.getElementById('posttext').value
  };
  if (content.post_title === '' || content.post_img === '' || content.post_text === '') {
    alert('Please complete all required fields.');
  } else {
    try {
      await this.fetch('http://127.0.0.1:8090/posts/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
      });
      makeHomePage();
      document.getElementById('nav_btn_home').className = 'active';
    } catch (e) {
      if (e === 'TypeError: Failed to fetch') {
          alert('Connection to Server Lost');
      } else {
        alert(e);
      }
    }
  }
}

function makeNavigationButtons (user) {
  var content = '<ul class="nav nav-pills nav-stacked"><li id="nav_btn_home"><a href="javascript:void(0);" onclick="makeHomePage();">Home</a></li>';
  if (user === 0) {
    content += '<li id="nav_btn_login"><a href="javascript:void(0);" id="signinbutton" onclick="makeSignInPage();">Log In / Sign Up</a></li>';
  } else {
    content += '<li id="nav_btn_user"><a href="javascript:void(0);" onclick="myPosts()">My Posts</a></li><li id="nav_btn_new"><a href="javascript:void(0);" onclick="makeNewPostPage()">New Post</a></li>';
  }
  content += '</ul><br>';
  document.getElementById('nav_buttons').innerHTML = content;
};

function myPosts () {
  document.getElementById('nav_btn_home').className = '';
  makeHomePage('', user.username);
}

function newSearch () {
  query = document.getElementById('searchInput').value;
  document.getElementById('nav_btn_home').className = 'active';
  makeHomePage(query);
}

async function makeHomePage (filter = '', author = '') {
  try {
    const response = await this.fetch('http://127.0.0.1:8090/posts', { json: { key: 'value' } });
    const body = await response.text();
    const content = makeAll(JSON.parse(body), filter, author);
    document.getElementById('main-content').innerHTML = content;
  } catch (e) {
    if (e === 'TypeError: Failed to fetch') {
        alert('Connection to Server Lost');
    } else {
      alert(e);
    }
  }
}

async function newComment (post) {
  try {
    if (user === 0) {
      alert('Please log in to post comments.');
    } else {
      var text = document.getElementById('commenttext' + post).value;
      if (text === '') {
        alert('Error: Empty Comment');
        return false;
      }
      var comment = {
        postID: post,
        authorImg: user.img,
        authorName: user.username,
        text: text
      };
      await this.fetch('http://127.0.0.1:8090/posts/comments/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      });
      makeHomePage();
      document.getElementById('nav_btn_home').className = 'active';
    }
  } catch (e) {
    if (e === 'TypeError: Failed to fetch') {
        alert('Connection to Server Lost');
    } else {
      alert(e);
    }
  }
}

function makeSignInPage () {
  var content = '<h2>Log In</h2><hr><form name="login"><label for="username"><b>Username:</b></label><br><input id="username" type="text" placeholder="Enter Username.." name="username" required><br><br>';
  content += '<label for="password"><b>Password:</b></label><br><input id="password" type="password" placeholder="Enter Password.." name="password" required><br><br>';
  content += '<button type="button" class="btn btn-danger" onclick="submitLogin()">Log In</button><br><hr></form>';

  content += '<br><h2>Sign Up</h2><hr><form><label for="nusername"><b>Username:</b></label><br>This is the name that will be visible to all users when you make a post or comment.<br>';
  content += '<input type="text" id="nusername" placeholder="Enter Username.." name="nusername" required><br><br><label for="npassword"><b>Password:</b></label><br>';
  content += 'You will use this password each time you log in. Make sure it is secure!<br><input type="password" id="npassword" placeholder="Enter Password.." name="npassword" required><br><br>';
  content += '<label for="nimg"><b>Image URL:</b></label><br>Enter the URL for an image to be displayed as your profile picture.<br><input type="text" id="nimg" placeholder="Enter URL.." name="nurl" required><br><br>';
  content += '<button type="button" class="btn btn-danger" onclick="submitSignup()">Sign Up</button><br><hr></form>';
  document.getElementById('nav_btn_home').className = '';
  document.getElementById('main-content').innerHTML = content;
  return content;
}

async function submitSignup () {
  const username = document.getElementById('nusername').value;
  const password = document.getElementById('npassword').value;
  const img = document.getElementById('nimg').value;
  if (username === '' || password === '' || img === '') {
    alert('Error: Empty Field');
    return false;
  } else {
    try {
      const response = await this.fetch('http://127.0.0.1:8090/user?uname=' + username);
      const body = await response.text();
      if (body === 'true') {
        alert('"' + username + '" is already taken. Please choose another username.');
      } else {
        const newUser = {
          username: username,
          password: password,
          img: img
        };
        await this.fetch('http://127.0.0.1:8090/user/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        });

        var header = '<h4><img src="' + newUser.img + '" class="img-circle" height=70 width=70> ';
        header += '&nbsp; &nbsp; Hello, ' + newUser.username + '</h4>';
        document.getElementById('user_header').innerHTML = header;

        user = newUser;

        makeNavigationButtons(user);
        makeHomePage();
        document.getElementById('nav_btn_home').className = 'active';
      }
    } catch (e) {
      if (e === 'TypeError: Failed to fetch') {
          alert('Connection to Server Lost');
      } else {
        alert(e);
      }
  }
}
}

async function submitLogin () {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username === '' || password === '') {
    alert('Error: Empty Field');
    return false;
  }
  try {
    const response = await this.fetch('http://127.0.0.1:8090/user/login?uname=' + username + '&pass=' + password);
    const body = await response.text();
    if (body === 'false') {
      alert('Failed to login "' + username + '". Please try again.');
    } else {
      user = JSON.parse(body);
      var header = '<h4><img src="' + user.img + '" class="img-circle" height=70 width=70> ';
      header += '&nbsp; &nbsp; Hello, ' + user.username + '</h4>';
      document.getElementById('user_header').innerHTML = header;

      makeNavigationButtons(user);
      makeHomePage();
      document.getElementById('nav_btn_home').className = 'active';
    }
  } catch (e) {
    if (e === 'TypeError: Failed to fetch') {
        alert('Connection to Server Lost');
    } else {
      alert(e);
    }
}
}

window.addEventListener('load', async function (event) {
  makeNavigationButtons(user);
  makeHomePage();
  document.getElementById('nav_btn_home').className = 'active';
});

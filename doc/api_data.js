define({ "api": [
  {
    "type": "get",
    "url": "/posts",
    "title": "Request all posts",
    "name": "GetPosts",
    "group": "Posts",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "posts",
            "description": "<p>Posts from all users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"1\":{\n        \"author\":{\n            \"img\":\"https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png\",\n            \"name\":\"Charlie47\"\n        },\n        \"content\":{\n            \"title\":\"Weekend in London\",\n            \"timestamp\":\"3 January 2020\",\n            \"cover_img\":\"https://cdn.londonandpartners.com/-/media/images/london/visit/general-london/towerbridgecopyrightvisitlondoncomantoinebuchet.jpg?mw=1920&hash=B6672601055B38B34C592E0160B0445AA063B876\",\n            \"text\":\"Had a fantastic getaway in London. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.\"\n        },\n        \"comments\":{\n            \"number_of\":\"4\",\n            \"comment\":[\n                {\n                    \"img\":\"https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg\",\n                    \"name\":\"Bill\",\n                    \"timestamp\":\"5 January 2020 09:19\",\n                    \"text\":\"Sounds amazing! Hope you had a good time!\"}\n    ...",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "temp/app.js",
    "groupTitle": "Posts"
  },
  {
    "type": "post",
    "url": "/posts/comments/new",
    "title": "Send comment data to create new comment",
    "name": "NewComment",
    "group": "Posts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "postID",
            "description": "<p>Unique ID of new post.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authorImg",
            "description": "<p>URL of image for user's profile picture.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authorName",
            "description": "<p>Username of user making comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Content of comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "comment",
            "description": "<p>Returned parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "HTTP/1.1 200 OK\n{\n    postID:\"1\",\n    authorImg:\"https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg\",\n    authorName:\"Bill\",\n    text:\"Sounds amazing! Hope you had a good time!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "temp/app.js",
    "groupTitle": "Posts"
  },
  {
    "type": "post",
    "url": "/posts/new",
    "title": "Send post data to create new post",
    "name": "NewPost",
    "group": "Posts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "post_title",
            "description": "<p>Title of post entered by user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_img",
            "description": "<p>URL of user's profile picture.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of logged-in user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Date and time when post was made.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "post_img",
            "description": "<p>URL of image to be used for the post.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "post_text",
            "description": "<p>Content of the post.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "content",
            "description": "<p>Returned parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "HTTP/1.1 200 OK\n{\n    post_title:\"Weekend in London\",\n    user_img:\"https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png\",\n    username:\"Charlie47\",\n    timestamp:\"3 January 2020\",\n    post_img:\"https://cdn.londonandpartners.com/-/media/images/london/visit/general-london/towerbridgecopyrightvisitlondoncomantoinebuchet.jpg?mw=1920&hash=B6672601055B38B34C592E0160B0445AA063B876\",\n    post_text:\"Had a fantastic getaway in London. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "temp/app.js",
    "groupTitle": "Posts"
  },
  {
    "type": "get",
    "url": "/user",
    "title": "Request to check if a user exists",
    "name": "CheckUserExists",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uname",
            "description": "<p>Username of user to search for.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "found",
            "description": "<p>Whether the user searched for exists.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "HTTP/1.1 200 OK\ntrue",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "temp/app.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/new",
    "title": "Send user data to create a new user account",
    "name": "CheckUserExists",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of new user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of new user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "img",
            "description": "<p>URL of new user's profile picture.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "newUser",
            "description": "<p>Returned parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "HTTP/1.1 200 OK\n{\n    username:\"Bill\",\n    password:\"Bill123\",\n    img:\"https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "temp/app.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/login",
    "title": "Request to confirm a user's username and password",
    "name": "LoginUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uname",
            "description": "<p>Username of user to be authenticated.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>Password of user to be authenticated.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": true,
            "field": "user",
            "description": "<p>Details of authenticated user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": true,
            "field": "found",
            "description": "<p>Whether the user exists.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "HTTP/1.1 200 OK\n{\n    username:\"Bill\",\n    password:\"Bill123\",\n    img:\"https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "temp/app.js",
    "groupTitle": "User"
  }
] });

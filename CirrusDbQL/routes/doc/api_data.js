define({ "api": [
  {
    "type": "delete",
    "url": "/:id",
    "title": "Delete a User",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X DELETE http://clients.db.cirrus.io:10083/v1/users/5755d16266176f6d3ec888ce",
        "type": "curl"
      }
    ],
    "name": "DeleteUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Success status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of event.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 ok\n {\n   \"success\": true,\n   \"message\": \"User with id \" + id + \" deleted.\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "./user.js",
    "groupTitle": "Users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the user was not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoValidId",
            "description": "<p>The id is not valid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n  {\n    \"success\": false,\n    \"message\": \"User not found with id: \" + id\n  }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Not Acceptable\n  {\n    \"success\": false,\n    \"message\": \"This is not a valid User id: \" + id\n  }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/list",
    "title": "Request Users list",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://clients.db.cirrus.io:10083/v1/users/list",
        "type": "curl"
      }
    ],
    "name": "GetList",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "User",
            "description": "<p>Users information.</p>"
          },
          {
            "group": "Success 200",
            "type": "Stirng",
            "optional": false,
            "field": "User._id",
            "description": "<p>User unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.name",
            "description": "<p>Users name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.password",
            "description": "<p>Users password.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.username",
            "description": "<p>Users username.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Obejct[]",
            "optional": false,
            "field": "User.devices",
            "description": "<p>Users devices.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "User.oauth",
            "description": "<p>Users OAuth providers.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.role",
            "description": "<p>Users access role</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 ok\n[\n  {\n    \"_id\": \"574f31e3f5bb2b6f7ec4798e\",\n    \"name\": \"Nadia\",\n    \"password\": \"$2a$10$6Mq0bcVCZfQ.DKNPshN8vuY67Hvg0wlIxAecdCHXZ3JC1mtZUuUkG\",\n    \"username\": \"nborgia\",\n    \"email\": \"nborgia@pt.lu\",\n    \"__v\": 0,\n    \"devices\": [],\n    \"oauth\": [],\n    \"role\": \"Family\"\n  },\n  {\n    \"_id\": .....,\n    ......\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Empty",
            "description": "<p>Client.Cirrus.io DB is Empty.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 Empty\n  {\n    \"success\": false,\n    \"message\": \"Client.Cirrus.io DB is Empty.\"\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "./user.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/:id",
    "title": "Request User by id",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://clients.db.cirrus.io:10083/v1/users/5755d16266176f6d3ec888ce",
        "type": "curl"
      }
    ],
    "name": "GetUserById",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "User",
            "description": "<p>Users information.</p>"
          },
          {
            "group": "Success 200",
            "type": "Stirng",
            "optional": false,
            "field": "User._id",
            "description": "<p>User unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.name",
            "description": "<p>Users name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.password",
            "description": "<p>Users password.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.username",
            "description": "<p>Users username.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Obejct[]",
            "optional": false,
            "field": "User.devices",
            "description": "<p>Users devices.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "User.oauth",
            "description": "<p>Users OAuth providers.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.role",
            "description": "<p>Users access role</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 ok\n[\n  {\n    \"_id\": \"574f31e3f5bb2b6f7ec4798e\",\n    \"name\": \"Nadia\",\n    \"password\": \"$2a$10$6Mq0bcVCZfQ.DKNPshN8vuY67Hvg0wlIxAecdCHXZ3JC1mtZUuUkG\",\n    \"username\": \"nborgia\",\n    \"email\": \"nborgia@pt.lu\",\n    \"__v\": 0,\n    \"devices\": [],\n    \"oauth\": [],\n    \"role\": \"Family\"\n  },\n  {\n    \"_id\": .....,\n    ......\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./user.js",
    "groupTitle": "Users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the user was not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoValidId",
            "description": "<p>The id is not valid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n  {\n    \"success\": false,\n    \"message\": \"User not found with id: \" + id\n  }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Not Acceptable\n  {\n    \"success\": false,\n    \"message\": \"This is not a valid User id: \" + id\n  }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:username",
    "title": "Request User by username",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://clients.db.cirrus.io:10083/v1/users/foobar",
        "type": "curl"
      }
    ],
    "name": "GetUserByUsername",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users username.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "User",
            "description": "<p>Users information.</p>"
          },
          {
            "group": "Success 200",
            "type": "Stirng",
            "optional": false,
            "field": "User._id",
            "description": "<p>User unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.name",
            "description": "<p>Users name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.password",
            "description": "<p>Users password.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.username",
            "description": "<p>Users username.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Obejct[]",
            "optional": false,
            "field": "User.devices",
            "description": "<p>Users devices.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "User.oauth",
            "description": "<p>Users OAuth providers.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.role",
            "description": "<p>Users access role</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 ok\n  {\n    \"_id\": \"574f31e3f5bb2b6f7ec4798e\",\n    \"name\": \"Nadia\",\n    \"password\": \"$2a$10$6Mq0bcVCZfQ.DKNPshN8vuY67Hvg0wlIxAecdCHXZ3JC1mtZUuUkG\",\n    \"username\": \"nborgia\",\n    \"email\": \"nborgia@pt.lu\",\n    \"__v\": 0,\n    \"devices\": [],\n    \"oauth\": [],\n    \"role\": \"Family\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The username of the user was not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n  {\n    \"success\": false,\n    \"message\": \"User not found with: \" + username\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "./user.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/create",
    "title": "Create User",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://clients.db.cirrus.io:10083/v1/users/foobar",
        "type": "curl"
      }
    ],
    "name": "PostCreate",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Users name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password (uncrypted).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Users role.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oauthprovider",
            "description": "<p>Users oauth provider.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "User",
            "description": "<p>Users information.</p>"
          },
          {
            "group": "Success 200",
            "type": "Stirng",
            "optional": false,
            "field": "User._id",
            "description": "<p>User unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.name",
            "description": "<p>Users name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.password",
            "description": "<p>Users password.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.username",
            "description": "<p>Users username.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.email",
            "description": "<p>Users email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Obejct[]",
            "optional": false,
            "field": "User.devices",
            "description": "<p>Users list of devices.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "User.oauth",
            "description": "<p>Users list of OAuth providers.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "User.role",
            "description": "<p>Users access role</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 ok\n  {\n    \"_id\": \"574f31e3f5bb2b6f7ec4798e\",\n    \"name\": \"Nadia\",\n    \"password\": \"$2a$10$6Mq0bcVCZfQ.DKNPshN8vuY67Hvg0wlIxAecdCHXZ3JC1mtZUuUkG\",\n    \"username\": \"nborgia\",\n    \"email\": \"nborgia@pt.lu\",\n    \"__v\": 0,\n    \"devices\": [],\n    \"oauth\": [],\n    \"role\": \"Family\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Duplicate entry</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n  {\n     \"success\": false,\n     \"errcode\": 11000,\n     \"message\": \"E11000 duplicate key error collection: Cirrus.users index: keyname_1 dup key: { : \\\"keyname\\\" }\"\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "./user.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/:username/password",
    "title": "Request Users password",
    "version": "0.0.1",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://clients.db.cirrus.io:10083/v1/users/foobar",
        "type": "curl"
      }
    ],
    "name": "PostPasswordByUsername",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users username.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>Users encrypted password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 ok\n  {\n    $2a$10$6Mq0bcVCZfQ.DKNPshN8vuY67Hvg0wlIxAecdCHXZ3JC1mtZUuUkG\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The username of the user was not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Empty",
            "description": "<p>The username is not set</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n  {\n    \"success\": false,\n    \"message\": \"User not found for username: \"+ username\n  }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Not Acceptable\n  {\n    \"success\": false,\n    \"message\": \"Empty username not allowed.\"\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "./user.js",
    "groupTitle": "Users"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "_vagrant_CirrusDbQL_routes_doc_main_js",
    "groupTitle": "_vagrant_CirrusDbQL_routes_doc_main_js",
    "name": ""
  }
] });

# Backend endpoints

## Table of contents

- [Users](#users)
  - [Login user](#login-user-example)
  - [Get all users](#get-all-users-example)
  - [Get one user](#get-one-user-by-id-example)
  - [Register new user](#register-user-example)
  - [Update existing user](#update-user-example)
  - [Delete user](#delete-user-example)
- [Groups](#groups)
  - [Get all groups](#get-all-users-example)
  - [Get group messages](#get-group-messages)
  - [New group](#new-group)
  - [Delete group](#delete-group)
  - [Update group](#update-group)
  - [Add user to group](#add-user-to-group)
- [Messages](#messages)
  - [Get all messages](#get-all-messages-example)
  - [Get message by id](#get-message-by-id-example)
  - [New message](#new-message-example)
  - [Delete message](#delete-message-example)

## Users

### Login user example

```http
POST http://localhost:8080/api/users/login

# Headers:
Content-Type: application/x-www-form-urlencoded

# Request body:
userName: makke
passwd: Qwerty7
```

Response is JWT token and user info:

```json
{
  "token": <token>,
  "user": {
    "id": 1,
    "userName": "makke",
    "email": "asd@asd.com",
    "password": "$2b$10$poAOl326BiFuYkF506r8h.fCT21xummkWsYs0VJGU.CnK/1wGqSOq",
    "createdAt": "2020-11-06T21:16:08.165Z",
    "updatedAt": "2020-11-06T21:16:08.165Z"
  }
}
```

&nbsp;

&nbsp;

### Get all users example

```http
GET http://localhost:8080/api/users/

# Headers:
Authorization: Bearer <token_here>
```

Returns all users and their groups and messages.  
Response:

```json
{
  "users": [
    {
      "id": 1,
      "userName": "makke",
      "email": "asd@asd.com",
      "password": "$2b$10$poAOl326BiFuYkF506r8h.fCT21xummkWsYs0VJGU.CnK/1wGqSOq",
      "createdAt": "2020-11-06T21:16:08.165Z",
      "updatedAt": "2020-11-06T21:16:08.165Z",
      "Groups": [
        {
          "id": 1,
          "groupName": "testGroup",
          "createdAt": "2020-11-06T21:16:08.181Z",
          "updatedAt": "2020-11-06T21:16:08.181Z",
          "groupUsers": {
            "groupId": 1,
            "userId": 1
          }
        }
      ],
      "Messages": [
        {
          "id": 1,
          "groupId": 1,
          "userId": 1,
          "message": "Test message",
          "createdAt": "2020-11-06T21:16:08.200Z",
          "updatedAt": "2020-11-06T21:16:08.200Z"
        }
      ]
    },
    {
      "id": 2,
      "userName": "testi",
      "email": "asd123@asd.com",
      "password": "$2b$10$/8tug4WRYLqrv/ImbVhno.35bPeyOYNlu5Gn9IhSdDPQP182yPhEy",
      "createdAt": "2020-11-07T15:05:21.756Z",
      "updatedAt": "2020-11-07T15:05:21.756Z",
      "Groups": [],
      "Messages": []
    }
  ]
}
```

&nbsp;

&nbsp;

### Get one user by id example

```http
GET http://localhost:8080/api/users/get/1

# Headers:
Authorization: Bearer <token>
```

Returns user info, messages and groups.  
Response:

```json
{
  "userId": 1,
  "username": "makke",
  "email": "asd@asd.com",
  "groups": [
    {
      "id": 1,
      "groupName": "testGroup",
      "createdAt": "2020-11-06T21:16:08.181Z"
    }
  ],
  "messages": [
    {
      "id": 1,
      "groupId": 1,
      "userId": 1,
      "message": "Test message",
      "createdAt": "2020-11-06T21:16:08.200Z"
    }
  ]
}
```

&nbsp;

&nbsp;

### Register user example

```http
POST http://localhost:8080/api/users/register

# Headers:
Authorization: Bearer <token>

# Request body:
username: testi123
email: asd1234@asd.com
passwd: 12345
```

Response:

```json
{
  "msg": "User registered"
}
```

&nbsp;

&nbsp;

### Update user example

```http
PUT http://localhost:8080/api/users/update

# Headers:
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer <token>

# Request body:
id: 30
userName: user
email: asd12346@asd.com
passwd: Qwerty7
```

Response:

```json
{
  "msg": "User updated!"
}
```

&nbsp;

&nbsp;

### Delete user example

```http
DELETE http://localhost:8080/api/users/delete

# Headers:
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer <token>

# Request body:
id: 30
```

Response:

```json
{
  "msg": "User deleted!"
}
```

&nbsp;

&nbsp;

## Groups

### Get all groups

```http
GET http://localhost:8080/api/groups

# Headers:
Authorization: <token>
```

Response:

```json
"group": [
  {
    "id": 1,
    "groupName": "testGroup",
    "createdAt": "2020-12-03T13:25:16.085Z",
    "updatedAt": "2020-12-03T13:25:16.085Z",
    "Users": [
      {
        "id": 1,
        "userName": "makke",
        "email": "asd@asd.com",
        "password": "$2b$10$d6Grum8DryxIs6kedG8Za.idGCBbY3dFEeANAySHKl7SkDaB1s8hy",
        "createdAt": "2020-12-03T13:25:16.072Z",
        "updatedAt": "2020-12-03T13:25:16.072Z",
        "GroupUsers": {
          "userId": 1,
          "groupId": 1
        }
      }
    ],
    "Messages": [
      {
        "id": 1,
        "groupId": 1,
        "userId": 1,
        "message": "Test message",
        "createdAt": "2020-12-03T13:25:16.097Z",
        "updatedAt": "2020-12-03T13:25:16.097Z"
      }
    ]
  }
]
```

&nbsp;

&nbsp;

### Get group messages

```http
GET http://localhost:8080/api/groups/get/1

# Headers:
Authorization: <token>
```

Response:

```json
{
  "groupId": 1,
  "groupName": "testGroup",
  "createdAt": "2020-12-03T13:25:16.085Z",
  "messages": [
    {
      "id": 1,
      "groupId": 1,
      "userId": 1,
      "sender": "makke",
      "content": "Test message",
      "createdAt": "2020-12-03T13:25:16.097Z"
    }
  ]
}
```

&nbsp;

&nbsp;

### New group

```http
POST http://localhost:8080/api/groups/

# Headers:
Authorization: <token>

# Request body:
groupName: group 2
userId: 1
```

Response:

```json
{
  "msg": "Group created!"
}
```

&nbsp;

&nbsp;

### Delete group

```http
POST http://localhost:8080/api/groups/

# Headers:
Authorization: <token>

# Request body:
groupName: group 2
userId: 1
```

Response:

```json
{
  "msg": "Group created!"
}
```

&nbsp;

&nbsp;

### Update group

```http
PUT http://localhost:8080/api/groups/

# Headers:
Authorization: <token>

# Request body:
id: 2
```

Response:

```json
OK
```

&nbsp;

&nbsp;

### Add user to group

```http
POST http://localhost:8080/api/groups/addUser

# Headers:
Authorization: <token>

# Request body:
userName: makke
groupId: 2
```

Response:

```json
{
  "msg": "User added to group!"
}
```

&nbsp;

&nbsp;

## Messages

### Get all messages example

```http
GET http://localhost:8080/api/messages/

# Headers:
Authorization: <token>
```

Response:

```json
[
  {
    "id": 1,
    "groupId": 1,
    "userId": 1,
    "message": "Test message",
    "createdAt": "2020-12-03T13:25:16.097Z",
    "updatedAt": "2020-12-03T13:25:16.097Z",
    "Group": {
      "id": 1,
      "groupName": "testgroup1",
      "createdAt": "2020-12-03T13:25:16.085Z",
      "updatedAt": "2020-12-06T10:02:53.889Z"
    },
    "User": {
      "id": 1,
      "userName": "makke",
      "email": "asd@asd.com",
      "password": "$2b$10$d6Grum8DryxIs6kedG8Za.idGCBbY3dFEeANAySHKl7SkDaB1s8hy",
      "createdAt": "2020-12-03T13:25:16.072Z",
      "updatedAt": "2020-12-03T13:25:16.072Z"
    }
  }
]
```

&nbsp;

&nbsp;

### Get message by id example

```http
GET http://localhost:8080/api/messages/1

# Headers:
Authorization: <token>
```

Response:

```json
{
  "id": 1,
  "groupId": 1,
  "userId": 1,
  "sender": "makke",
  "content": "Test message",
  "createdAt": "2020-12-03T13:25:16.097Z"
}
```

&nbsp;

&nbsp;

### New message example

```http
POST http://localhost:8080/api/messages/

# Headers:
Authorization: <token>

# Request body:
groupId: 1
userId: 1
message: new message
```

Response:

```json
Created
```

&nbsp;

&nbsp;

### Delete message example

```http
DELETE http://localhost:8080/api/messages/

# Headers:
Authorization: <token>

# Request body:
id: 2
```

Response:

```json
OK
```

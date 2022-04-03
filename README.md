# Demo Blogging App

This is a demo blogging application that is built with NodeJS and GraphQL. In this project, users can create an account, post blogs and provide comments to them as well.
The demo application demonstrates how NodeJS, GraphQL and the rest of the technology stack fit together.

&nbsp;

## Technologies Used

1. NodeJS: to create the backend server and set the logic.
2. GraphQL: Data query language used to send queries from client to the server, and from the NodeJS server to the database.
3. PostgreSQL: the database to which NodeJS is connected.
4. Prisma: ORM technology that sits between NodeJS and PostgreSQL.
5. Docker: Container technology where Prisma will run.
6. Heroku: Cloud platform where the database is hosted.

&nbsp;

## Prerequisites

Have NodeJS and Docker installed in your machine.

&nbsp;

## Running the Application.
1. Checkout the project in your local machine.
2. Through the command line, change the directory to the root of the project and run the command: npm install
3. Create a folder called "config" in the root directory of the project and create a file called "dev.env" in this folder.
4. The "dev.env" contains configurations that should be set before running the project. Copy and paste the below in the file and replace the values.
~~~
PRISMA_ENDPOINT=http://localhost:4466
PRISMA_SECRET=<Insert a secret for the Prisma setup>
JWT_SECRET=<Insert a secret for Jsonwebtoken>
~~~
5. To install the "prisma" package, run from the command line the following command: npm install -g prisma@1.12.0
6. If you don't have a Heroku account create one, then create an application.
7. Within the application add an Add-on for Postgres Heroku. Once done, Heroku will display information about the database(host name, db name, user, password,...).
8. In the root directory of the project, open prisma/docker-compose.yml and change the values of "host", "database", "user", "password".
9. In the command line, change the directory to be located inside the "prisma" folder and run the following command: docker-compose up -d
10. Then run: prisma deploy -e ./../config/dev.env
11. Then run: npm run dev.
12. Go to http://localhost:4000. You should see the GraphQL playground.

&nbsp;

## GraphQL Operations

The demo blogging application allows you to do different operations through GraphQL to interact with the database. The major operations are Query, Mutation and Subscription against the data entities that we have in this project: User, Post and Comment.

### Query
Below you can find the major query operations for the User, Post and Comment.

1. "users": This is a query operation that will return the users in the database.
2. "posts": This is a query operation that will return the published posts in the database.
3. "comments": This is a query operation that will return the comments in the database.
4. "myPosts": This is a query operation that will return the posts created by the authenticated user.

The above query operations can recieve several optional parameters:
- first: The argument takes integer as a value. Its purpose is to return the first "n" records of the specified query operation. This is usually used for pagination.
- skip: The argument takes integer as a value. Its purpose is to return the records after skipping "n" records of the specified data entity. This is usually used for pagination.
- after: The argument takes string as a value representing the ID of a record. Its purpose is to return the records that come after the record with specified ID in the database table.
- orderBy: The argument takes enum as a value. Its purpose is to order the records returned based on specific criteria. The value usually is in the following format: <field or column name>_ASC or <field or column name>_DESC 
- query: The argument is not applied to comments and its value is of type string. This is used to filter out results based on the specified query string.
  
5. "me": This is a query operation that will return the current authenticated user.
6. "post": This is a query operation that accepts an ID as parameter and returns the post with the associated ID.
  
Below is an example of a query operation:
  
~~~
  
 query {
  posts {
    id
    title
    body
    published
    updatedAt
    createdAt
  }
 }

~~~
  
  
### Mutation
Below you can find the major mutation operations for the User, Post and Comment.
  
1. "createUser": This is a equivalent to a sign up operation. Once user is created, the user's information and also authentication token is returned
2. "createPost": This is an operation that allows authenticated users to create a post.
3. "createComment": This is an operation that allows an authenticated user to create comments under specific published post.

The above operations take a single argument called "data", whose value is an object containing key value pairs representing the entity's data. Note that for creating comments, the "data" object should have the post ID as well.
Below is an example:
  
~~~
  
mutation {
  createUser (data: {
    name: "Jean Jilinkirian"
    email: "jeanjilinkirian@gmail.com"
    password: "mypass123"
  }) {
    user {
      id
      name
      email
    }
    token
  }
}

~~~
  
4. "updateUser": The operation allows an authenticated user to change his own information.
5. "updatePost": The operation allows an authenticated user to update his own post's data. It should take an argument to specify the post ID.
6. "updateComment": This is an operation that allows an authenticated user to update his own comment under a published post. It should take an argument to specify the comment ID.
  
The above operations take a single argument called "data", whose value is an object containing key value pairs representing the entity's data.

Below is an example of an update operation:

~~~
  
  mutation {
    updatePost(id: "cl1b2rjmc08fa0a21fgz0dxb6", data: {
      published: true
    }) {
      id
      title
      body
      published
      }
  }
  
~~~
  
7. "login": This authenticates a user into the applicatin. Once a user logs in, he recieves an authentication token. The operation accepts "data" as parameter that contains values required for logging in a user: email and password.
  
You can find the rest of the operations in the "Schema" section in the GraphQL playground(http://localhost:4000)

  
### Subscription
A subscription operation will allow us to get updated information automatically once there is a change done to an entity that we have subscribed to. You won't have to send a new query to recieve updated information.
  
1. "comment": This is a subscription operation that takes an argument the post ID. Once we run the subscription, the operation will automatically return an object that povides information about the comments that are added updated or deleted in the post with the passed ID.
2. "myPosts": This is a subscription operation that will always return an object containing information about changes that are done to the posts of the authenticated user.

  

&nbsp;
  
## Authentication
Once a user is created or a user logs in, an authentication token will be returned with the response. The token is used in the following format with queries that require authentication:
~~~
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbDFiMnF4MmQwOGYwMGEyMXUyeTl6bXNhIiwiaWF0IjoxNjQ4NjIwNzgyfQ.faBwUUn4AiHVDURzcKYwuJkDxUs5zc1GwSqCpJFQ6LQ"
} 
~~~

&nbsp;
  
## Application Status
The application is subject to modifications and optimization.
  
 

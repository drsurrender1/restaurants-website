#   Restaurants Social Media Platform

This project is a web application that serves as a social media platform for restaurants. It provides users with features such as registration, sign-in, search functionality, like/unlike posts, follow/unfollow other users, create posts, receive notifications, view menus and blogs, and authenticates users.

##  Features

User Registration and Authentication: Users can register and create an account to access the platform. The application provides authentication.

Search Functionality: Users can search for restaurants or specific content within the platform, allowing them to find relevant information easily.

Like/Unlike and Follow/Unfollow: Users can like or unlike posts from other users and follow or unfollow restaurants or other users to stay updated with their activities.

Post Creation and Deletion: Users can create and delete posts, allowing them to share their experiences, thoughts, or information with other users.
Notifications: Users receive notifications for various activities, such as new followers, likes on their posts, or comments on their posts.

Menus and Blogs: Users can view menus and blogs posted by restaurants, providing them with information about food offerings and other related content.

MVC Architecture: The project follows the Model-View-Controller (MVC) architectural pattern, ensuring a clear separation of concerns and maintainability.
Technologies Used

The project utilizes a combination of frontend and backend technologies to provide a fully functional social media platform for restaurants:

Frontend: The frontend website is developed using JavaScript, specifically React.js and jQuery. These frameworks enable interactive and responsive user interfaces.

Backend: The backend server is built using Django, a Python web framework that facilitates the creation of RESTful APIs. It enables the handling of various API endpoints to perform actions on a MySQL database.

Database: The project employs a relational database management system (RDBMS) and utilizes SQL queries, stored procedures, and triggers to implement the necessary database operations.
Installation and Setup

##  To set up and run the project locally, please follow these steps:

Ensure that you have the necessary dependencies installed on your system. Run the following commands in your terminal:
sql

```python
$  sudo apt-get update && sudo apt upgrade -y
$  sudo apt upgrade python3
$  sudo apt install python3-pip
$  sudo apt install nodejs
$  sudo apt install npm
$  npm install -g create-react-app
$  npm install --save react react-dom
```
Clone the project repository from GitHub:

```python
$  git clone https://github.com/drsurrender1/restaurants-website.git
```
Change to the project directory:

```python
$  cd restaurants-website/P3/restify
```
Install the required dependencies:

```python
$  npm install
```

Start the development server:

```python
$  npm start
```
The web application will now be accessible at http://localhost:3000.
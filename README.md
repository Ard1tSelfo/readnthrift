# Read n' Thrift 

Read n Thrift is a platfrom designed for book passionates, who love to read books, share their opinions about them and exchange these books with others.  

## Getting Started

These instructions will get you the project up and running on your local machine for development and testing purposes.

### Prerequisites

In order to run and build this project locally you need to have Node.js installed in your local machine. 

* [Node.js](https://nodejs.org/) - nodejs includes [npm](https://www.npmjs.com/) (node package manager) 

### Installing

Using the [node package manager](https://www.npmjs.com) installed with nodejs, install the third-party libraries that this project is dependend on for both the frontend and the backend: 

```
cd frontend
npm install
```
```
cd backend
npm install
```

To finally start the app, run the following command both in the frontend and backend repositories as above. 

```
npm start
```

## Main Features

Read n' Thrift currently covers following use cases:
  1. Creating a profile with a role of either a reader or a bookstore 
  2. Creating, editing & deleting personal bookshelves
  3. Searching for a book with integrated filters
  4. Writing a review and giving a rating for a book
  5. Viewing personalized book recommendations
  6. Browsing current book offers in the Marketplace as well as creating own book offer


## Data Model
The Read n' Thrift is using the following data model. Every user (Book reader) can create multiple bookshelves with books and write reviews for the books. Every user is receiving personalized recommendations based on their preferences. Furthermore, every user can participate at marketplace either as a seller or as a buyer to have a more sustainable lifestyle. 
![](https://github.com/Ard1tSelfo/readnthrift/blob/master/doc/DataModel.png)
 
 ## Example of user's dashboard in Read n' Thrift
 ![](https://github.com/Ard1tSelfo/readnthrift/blob/master/doc/dashboard.png)
 
 ## Planned Features
 We want to integrate following features in the coming future:
  * Bookstore role for the Users - in order to support local bookstores which don't have a website / online shop and let them expand the boundaries of their target audience
  * A "pro" version for the book writes who would like to communicate with their readers and promote their books


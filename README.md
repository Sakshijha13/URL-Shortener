# URL-Shortener

This is a URL Shortener application built using Node.js, Express.js, MongoDB, and EJS. It provides a simple way to shorten long URLs and store them in a database. Additionally, it allows users to add notes while creating short URLs and search for URLs using those notes.

## Features

- The application supports secure authentication using express-sessions and passport.
- The application generates a unique short URL for any provided long URL.
- Users can add optional notes while creating short URLs, allowing them to provide additional context or information.
  All the URLs and notes will be saved in the user's account allowing them to access them even if they login after a long time.
- Users can search for specific URLs using the associated notes, making it easier to locate and manage saved URLs.

## Installation

To run this project locally, you'll need to have Node.js and MongoDB installed on your machine.

1. Clone this repository:

```
git clone https://github.com/Sakshijha13/URL-Shortener.git
```

2. Navigate to the project directory:

```
cd URL-Shortener
```

3. Install the dependencies:

```
npm install
```

4. Start the application:

```
npm start
```

5. Access the application in your web browser at `http://localhost:3000` (or the specified port).

## Usage

1. Access the URL Shortener application in your web browser.

2. To create a short URL, enter a long URL in the input field and click the "Short The Url" button. Optionally, you can add a note to the URL in the provided input field.

3. The application will generate a unique short URL for the given long URL and store it in the database along with the note, if provided.

4. The shortened URL will be displayed on the page. You can copy and share this URL as needed.

5. To search for URLs based on their associated notes, enter a search term in the search bar and click the "Search" button.

6. The application will display a list of URLs that match the search term.

7. Click on a shortened URL in the list to be redirected to the original long URL.

## Technologies Used

- Node.js: A JavaScript runtime environment for server-side development.
- Express.js: A web application framework for Node.js.
- MongoDB: A NoSQL database used for storing the shortened URLs and their associated notes.
- EJS: A template engine for generating dynamic HTML pages.

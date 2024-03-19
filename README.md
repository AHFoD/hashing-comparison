# hashing-comparison

This is a web application for comparing hashing between md5 and bcrypt, included with managing user data. It allows you to create, edit, delete, and view user information.

## Features

- **Create User**: Add a new user with username, age, gender, address, phone number, and password.
- **Edit User**: Modify existing user information including username, age, gender, address, and phone number.
- **Delete User**: Remove a user from the system.
- **View User List**: See a list of all users currently stored in the system.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## How to Use

1. Clone the repository to your local machine.
2. Install Node.js and MongoDB if you haven't already.
3. Install dependencies by running `npm install`.
4. Start the server by running `npm run dev`.
5. Access the API in your browser at `http://localhost:3000`.

## Usage

1. **Create User**:

   - Click on the "Create User" button.
   - Fill out the form with user details.
   - Click "Save" to create the user.

2. **Edit User**:

   - Click on the "Edit" button next to the user you want to edit.
   - Modify the user details in the form.
   - Click "Update" to save the changes.

3. **Delete User**:

   - Click on the "Delete" button next to the user you want to delete.
   - Confirm the deletion.

4. **View User List**:
   - Upon loading the page, you'll see a list of users displayed in a table.
   - The table includes columns for username, age, gender, address, phone number, password, and MD5 hash.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).

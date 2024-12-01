
# Mother's Dining

Mother's Dining is a restaurant management application designed to streamline table reservations, online food orders, and efficient user management. This repository provides backend functionality with RESTful APIs for managing users, orders, and dining experiences.

## Features
#### User Authentication:
* Secure registration and login with JWT-based authentication.
* Role based authentication.
* Manage user profiles.

#### Menu Management:
* Browse available menus.
* Filter items by categories.

#### Table Reservation:
* Book tables for in-house dining.
* View reservation details.

#### Online Food Ordering:
* Place orders for home delivery.
* Track order status.

#### Admin Features:
* Manage menus, orders, and reservations.
* Generate analytics and reports.

#### Technologies Used
* Backend: Node.js, Express.js
* Database: MongoDB
* Authentication: JWT (JSON Web Tokens)
* Others: Middleware for input validation and error handling

## API Endpoints

### User APIs

#### Register/ Sign-up

**GET** /api/register

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Responce**:
```json
{
  "message": "User registered successfully",
  "userId": "12345"
}
```
#### Login

  **GET** /api/Login

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Responce**:
```json
{
  "message": "Login successful!",
}
```

#### Profile

```http
  GET /api/profile
```

| Parameter | Type     | Required* | Authentication Required |
| :-------- | :------- | :---------- | :---------- |
| `Email` | `string` | **True**. | **True**. |
| `SessionID` | `string` | **True**. | **True**. |

#### Go To Thali Menu

```http
  GET /api/Thali_Menu
```

| Parameter |
| :-------- |
| `No Parameters required to access this api ` | 

#### Go To Course Menu

```http
  GET /api/Course_Menu
```

| Parameter |
| :-------- |
| `No Parameters required to access this api ` | 

#### Add to cart

```http
  GET /api/cart
```

| Parameter | Type     | Required* | Authentication Required |
| :-------- | :------- | :---------- | :---------- |
| `Email` | `string` | **True**. | **True**. |
| `Product code of the product that you want to add in cart` | `Number` | **True**. | **True**. |

#### Place order

```http
  GET /api/order
```

| Parameter | Type     | Required* | Authentication Required |
| :-------- | :------- | :---------- | :-------------------- |
| `Email` | `string` | **True**. | **True**. |
| `Product code of all the products in the cart` | `Number` | **True**. | **True**. |

#### Order History

```http
  GET /api/orderHistory
```

| Parameter | Type     | Required* | Authentication Required |
| :-------- | :------- | :---------- | :---------- |
| `Email` | `string` | **True**. | **False**. |



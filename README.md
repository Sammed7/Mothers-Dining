
# Mother's Dining API's

This is the restaurant app. 
This app can help users to Book table for them for hotel dining or to order food online for home delivery.

## API Endpoints


#### Register/ Sign-up

```http
  GET /api/register
```

| Parameter | Type     | Required*                |
| :-------- | :------- | :------------------------- |
| `Name` | `string` | **True**. |
| `Email` | `string` | **True**. |
| `Password` | `string` | **True**. |

#### Login

```http
  GET /api/Login
```

| Parameter | Type     | Required*                       |
| :-------- | :------- | :-------------------------------- |
| `Email` | `string` | **True**. |
| `Password` | `string` | **True**. |

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



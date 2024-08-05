# Back Repair Form

## Prerequisites
- Node.js (version 18 or higher)
- MongoDB

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `NODE_ENV`
- `MONGO_HOST`
- `MONGO_USERNAME`
- `MONGO_PASSWORD`
- `MONGO_PORT`
- `MONGO_DBNAME`
- `SECRET_KEY`

## Setup

```
npm install
```

## Test

```
npm run test
```

## Development

```
npm run dev
```
## API

#### Login

```http
  POST /api/v1/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**                 |
| `password` | `string` | **Required**              |

#### Register

```http
  POST /api/v1/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**                 |
| `password` | `string` | **Required**              |

#### Create a repair form

```http
  POST /api/v1/repairs
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstname` | `string` | **Required**                 |
| `lastname` | `string` | **Required**              |
| `email` | `string` | **Required**                 |
| `address` | `string` | **Required**              |
| `zip` | `string` | **Required**                 |
| `phone` | `string` | **Required**              |
| `paymentOption` | `string` | **Required**                 |
| `generalTerms` | `string` | **Required**              |
| `retractTerms` | `string` | **Required**                 |
| `commercialOffer` | `string` | Optional              |
| `type` | `string` | **Required**              |
| `location` | `string` | **Required**              |
| `reason` | `string` | Optional              |
| `detail` | `string` | Optional              |

#### Get repair forms

Need bearer token to perform the call

```http
  GET /api/v1/repairs/${id}
```

#### Get repair form by id

Need bearer token to perform the call

```http
  GET /api/items/${id}
```

#### Update repair form by id

Need bearer token to perform the call

```http
  PUT /api/items/${id}
```

#### Delete repair form by id

Need bearer token to perform the call

```http
  Delete /api/items/${id}
```


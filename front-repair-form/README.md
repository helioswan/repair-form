# Front Repair Form
This template should help get you started developing with Vue 3 in Vite.

## Prerequisites
- Node.js (version 18 or higher)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `VITE_API_URL`

## Project Setup
```sh
npm install
```
### Compile and Hot-Reload for Development
```sh
npm run dev
```
### Type-Check, Compile and Minify for Production
```sh
npm run build
```

## User Flow

When run locally, the user flow start at :
```http
http://localhost:5173
```

- Landing Page: Users land on the main page where they can start the qualification process.
- Qualification Form Filling: Users are guided through a series of steps to fill out the form.
- Personnal Form Filling: Once the qualification form is completed, users have to fill contact form and then can submit the form.
- Confirmation: Users receive a confirmation message indicating that their form has been successfully submitted and that they will be contacted shortly.

## Artisan User Flow

When run locally, the user flow start at :
```http
http://localhost:5173/register
```

- Sign-Up Page: Artisans land on the registration page where they can create a new account.
- Login Page: Artisans are redirected to the login page after successfully creating their account, where they can log in and then be redirected to the Dashboard Page.
- Dashboard Page: The dashboard displays a list of submitted repair forms.
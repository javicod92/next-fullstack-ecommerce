# Next Fullstack e-commerce

This project is a complete e-commerce platform with a focus on efficient administration and user experience. It has two main sections:
- **Administrator panel (Backend)**: Exclusively for administrators, it allows only administrators to add, modify and delete products and categories on the site
- **User section (Frontend)**: Designed for users to browse and consume the products published in the store

## 🛠️ Common technologies used in Backend and Frontend:
- **Next.js 15**: React framework, for creating faster server-side web applications
- **React 19**: JavaScript library for creating dynamic and reusable user interfaces
- **TypeScript**: JavaScript superset for adding static typing and error prevention
- **Tailwindcss, css and css modules**: To provide the user with modern interfaces
- **MongoDb Atlas**: Database used for storing Users, Products and Product Categories
- **Cloudinary**: Used to store product images
- **Mongoose**: Used to manage the non-relational database MongoDb
- **Axios**: JavaScript library used to easily handle HTTP requests and responses

**Backend**
- **NextAuth.js v5**: Used to validate credentials and allow only administrator users to modify page content

**Frontend**
- **Stripe**: Used to accept online customer payments
- **React-toastify**: Used to display notifications to the user
- **Motion**: Used to add animations to react components

## 🚀 Main Functions
### Backend

**Credential creation and validation:**
- User registration and data validation via NextAuth V5, using Google as login provider
- Administrator user based on the NextAuth user role settings
- Creation of user and role schemas stored in mogoDB Atlas database
- Only users with "Admin" role have access to the administration page

**Web application divided into simple pages or sections:** <br/>
*1) Dashboard Page:*
- Currently, the dashboard page displays the name and picture of the google account with which the user is logged in
- In the future, it is possible to add information about the trends of the most demanded products

*2) Products Page:*
- This page allows the user to create, edit and delete products stored in the database
- Each product added, has a title, description, price, category and images
- Product images can be reordered as required by the user

*3) Categories Page:*
- This page allow the user create, edit and delete product categories stored in the database
- Categories can have parent categories such as: Mobiles > iPhone
- Categories, they can also have properties such as color, storage and others

*4) Orders Page:*
- On this page, the orders realized by users are listed in a table
- The orders have a status that informs with YES or NO if the payment was successful
- Orders, have the shipping location, user name and products requested
- For payments, I used stripe webhook to listen for payment events

*5) Settings Page:*
- This page was created to add or remove administrator users in the future or to adjust aspects of the page

*6) Logout Function:*
- This function allows the user to exit the page when the user no longer needs to use it

*7) Page adapted to multiple screen resolutions (responsive):*
- The page adapts to multiple screen resolutions for a better user experience

### Frontend

*1) Home Page:*
- The home page shows the most recent products added to the database
- The Header component (carousel) shows the featured products. I have used 3 featured products for this example
- The body shows the 16 newest products added
- The navigation bar and footer are present on all pages through the use of the layout

*2) All Products Page:*
- Discount promotions are shown in the header
- Currently, this page show all products stored in database
- In the future, an API can be generated to return a paginated page

*3) Categories Page:*
- This page shows all categories and their products in different cards
- Each category card has a scrollbar to see more products
- In the future, an API can be created that returns all products of the same category

*4) Cart Page:*
- This page shows all products added to cart
- Each product contains an image, quantity and total price
- The page also has a section to proceed with the payment

*5) Stripe Payment Page*
- This page is displayed when the user wants to proceed with the payment
- In this case, I have used the page designed by Stripe
- When the payment is successful, the application displays a success page with an animation

*6) Responsive Design*
- All pages were designed to offer the best user experience

## 📸 Project Screenshots
### Backend App
**1) Login Page:**

In the example I have used the registration and login with Google, but you could also use credentials validation such as email and password or other providers such as GitHub or others
![Captura de pantalla 2024-12-29 102949](https://github.com/user-attachments/assets/54080ce7-de5f-4183-953c-015714dea98c)
![Captura de pantalla 2024-12-29 103127](https://github.com/user-attachments/assets/c7549622-619f-4711-8faf-4e5219fa2903)

**2) Products Page:**

The example below shows some of the products stored in the database
![image](https://github.com/user-attachments/assets/a25616c2-e632-4035-b70e-0a6f1fb5a335)

Adding New Product
![image](https://github.com/user-attachments/assets/da7c04b2-c04e-4249-a862-d05632647d70)

**3) Categories Page:**

The example below shows some of the categories stored in the database
![Captura de pantalla 2024-12-30 202445](https://github.com/user-attachments/assets/e111c115-c19a-4856-bd1d-2aad63eea172)

Adding a new category
![image](https://github.com/user-attachments/assets/dc5903e9-c916-4d08-9f0a-c8ec310bd1f1)

**4) Orders Page:**
![image](https://github.com/user-attachments/assets/6097c882-28eb-4a4b-85b8-406c88df098a)

**5) Responsive web design**
![image](https://github.com/user-attachments/assets/dbdb97c7-747e-42ad-b9ec-680bff4f87ed)

### Frontend App

**1) Home Page** 

This example shows the header(carousel) of the Home page
![image](https://github.com/user-attachments/assets/e9004dbb-1c72-4bfc-9439-e6139fcd28a7)

This example shows the second product of the carousel (2 of 3)
![image](https://github.com/user-attachments/assets/262ea975-baea-4e1a-b7a3-6aa8ba178ddb)

This picture shows the controls when the user hovers over the product
![image](https://github.com/user-attachments/assets/7e1290a6-a6d3-49d4-82d8-1d304617301e)

This image shows the most recent products in the body of the Home page
![image](https://github.com/user-attachments/assets/0df28ca9-9da1-4460-95dd-f178049b5914)

Image showing the Footer component present in the layout (all pages)
![image](https://github.com/user-attachments/assets/01bf54a4-9f4e-47e2-9ee4-67ab8f7b13c5)

**2) All Products Page** 

This image shows a header made in photoshop, where a product promotion is advertised
![image](https://github.com/user-attachments/assets/60d48bcf-865f-48d4-b06f-5f8debfa0e6b)

Image showing different products in the All products page
![image](https://github.com/user-attachments/assets/8fdb79d8-dd71-4d38-b82f-fd6d10c015a3)

**3) Product Description Page** 

This example shows all product photos and product description when the user clicks on any product
![image](https://github.com/user-attachments/assets/4ca107b1-db1b-4e3e-91ac-6b4c2e9da4ea)

**4) Product Categories Page** 

This image show some product categories
![image](https://github.com/user-attachments/assets/79060ea1-6a78-48e4-9986-b6f8cec39cf9)

More product categories
![image](https://github.com/user-attachments/assets/9f19207e-4779-4bb6-8db3-40b086c34cdf)

This image shows a scroll bar when the user hovers the mouse over the category card
![image](https://github.com/user-attachments/assets/7d73d6b7-1c33-46c0-8671-dec01dbdb9e3)

This example shows the notification card when users add products to the cart
![image](https://github.com/user-attachments/assets/9218435c-79e0-4351-9efe-900d1d808685)

**5) Product Cart Page** 

This example shows all the products added to the cart and also shows a form to proceed with the payment
![image](https://github.com/user-attachments/assets/1fc99b76-b771-46d7-b47b-5204ffb6e002)

Stripe platform that allows the user to pay for all products ordered and accept online payments
![image](https://github.com/user-attachments/assets/a0f9f6d5-5f20-46e7-9d38-92745ea16ee2)

This image shows a success screen when the payment has been successfully completed
![image](https://github.com/user-attachments/assets/3633f397-682f-4cac-9201-c5d89145a68c)

**6) Responsive Design** 
![Responsive1](https://github.com/user-attachments/assets/10e098e0-d52c-4cc5-8c10-03dedf8b7cbb)

![Responsive2](https://github.com/user-attachments/assets/4bca94bc-ea51-4e00-9bec-1a384549bb8c)

## 🥁 What makes this project interesting?
This e-commerce project built in next.js 15 is a solid demonstration of my ability to improve and put my new knowledge in practice. This example covers both client-side and server-side rendering. Next, I will describe the most important aspects of the application.

**1) APIs and data management:** The project makes use of custom APIs to manage key operations such as creating, updating and deleting products and categories from the database. This action includes real-time interactions with my database through MongoDB Atlas and Mongoose, which ensure robust and efficient inventory management.

**2) Autentication using NextAuth v5:** I have implemented user authentication through NextAuth v5 to allow a flexible and secure authentication system. This library allows to use different providers to manage the session like Google, GitHub, user credentials and more, it also allows a custom system with JWT (JSON Web Token) to manage sessions and ensure secure paths.

**3) Implementation of online payments:** Another important feature of this project is the implementation of Stripe to accept online payments easily and securely.

**4) Responsivity and visual design:** I use Tailwind, and css modules to build a modern and responsive user interface using the latest libraries, ensuring a smooth user experience on any device, be it a mobile phone or a desktop PC.

**5) Optimized user experience:** The design of the site and its functionality were thought to offer an attractive design using an infinite carousel of products and animations with Framer Motion, and also focusing on accessibility and usability.

**6) Scalability and maintenance:** Using Next.js 15 and its modular structure, this project is designed to be easily scalable, separating reusable react components, pages, apis and other functions in their respective folders within the project.

**7) Best practices in web development:** The project has been built following best practices, separating server and client logic, using reusable react components and state management through Hooks. I have also done different practices in local mode to ensure that the functions under development run smoothly.

## 💻 Installation and Configuration
1) **Clone this repository**: https://github.com/javicod92/next-fullstack-ecommerce.git
2) **Installs the dependencies**: npm install
3) **Run the development server**: npm run dev

**IMPORTANT:** To execute this project, it is necessary to set a variable .env.local to the root of next.js with the following structure:
- MONGODB_URI="YOUR-MONGODB-URI" / You must create an account in Mongodb Atlas for this purpose.
- AUTH_SECRET="AUTOMATICALLY-GENERATED-CODE" / This key is automatically generated by running: npx nextauth secret
- AUTH_GOOGLE_ID="YOUR-GOOGLE-ID" / You must create an account in Google dashboard to obtain the Google ID
- AUTH_GOOGLE_SECRET="YOUR-GOOGLE-SECRET" / You must create an account in Google dashboard to obtain the Google Secret
- CLOUDINARY_URL="YOUR-CLOUDINARY-URL" / You must create an account in Cloudinari API to obtain the Cloudinary URL
- STRIPE_PK="YOUR-STRIPE-PUBLIC-KEY" / You need to have a Stripe account to obtain the Key
- STRIPE_SK="YOUR-STRIPE-SECRET-KEY" / You need to have a Stripe account to obtain the Key
- PUBLIC_URL="http://localhost:3000" / This variable is used to redirect users to the home page when payment is successful
- STRIPE_ESK="YOUR-STRIPE-WEBHOOK-SIGNING_SECRET" / You need to download the Stripe client for local use, or set in production the address to which the different events will be sent in order to obtain the access key

The project was deployed in Vercel: https://next-fullstack-ecommerce-1rpa.vercel.app/

# Next Fullstack e-commerce

This project is a complete e-commerce platform with a focus on efficient administration and user experience. It has two main sections:
- **Administrator panel (Backend)**: Exclusively for administrators, it allows only administrators to add, modify and delete products and categories on the site
- **User section (Frontend)**: Designed for users to browse and consume the products published in the store

## 🛠️ Common technologies used in Backend and Frontend:
- **Next.js 15**: React framework, for creating faster server-side web applications
- **React 19**: JavaScript library for creating dynamic and reusable user interfaces
- **TypeScript**: JavaScript superset for adding static typing and error prevention
- **Tailwindcss css and css modules**: To provide the user with modern interfaces
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

**Web application divided into simple pages or sections:**

In the example I have used the registration and login with Google, but you could also use credentials validation such as email and password or other providers such as GitHub or others
![Captura de pantalla 2024-12-29 102949](https://github.com/user-attachments/assets/54080ce7-de5f-4183-953c-015714dea98c)
![Captura de pantalla 2024-12-29 103127](https://github.com/user-attachments/assets/c7549622-619f-4711-8faf-4e5219fa2903)
*The images show the user's login via google*

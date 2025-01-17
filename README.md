# Next.js Photo Album

## Overview

This project is a simple example of a public photo album application. The app allows users to access photo albums by using a unique key. Once a user has the key, they can:

- View the pictures in the album.
- Upload new pictures to the album.
- Delete existing pictures from the album.

The application demonstrates essential features like authentication by key, file handling, and CRUD operations in a straightforward and user-friendly way.

**Live URL:** [View the App](https://nextjs-photo-album-iny85y62q-zangrandis-projects.vercel.app/)

---

## Technologies Used

### **Frontend**
- **Next.js 15**
- **React 19**

### **Backend**
- **Node.js 22**

### **Database**
- **Neon**
- **Prisma**

### **Cloud Services**
- **Amazon S3**
- **Vercel**

---

## Live
## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zangrandi/nextjs-photo-album.git
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root of the project.
   - Add the following variables:
     ```env
     DATABASE_URL=your_neon_database_url
     AWS_S3_BUCKET_NAME=your_bucket_name
     AWS_ACCESS_KEY_ID=your_access_key_id
     AWS_SECRET_ACCESS_KEY=your_secret_access_key
     NEXT_PUBLIC_API_URL=your_api_url
     ```

4. **Run the development server:**
   ```bash
   yarn dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to see your application in action.

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.



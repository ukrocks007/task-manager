# Task Manager

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Follow these steps to set up and run the project on your local machine.

### 1. Clone the Project

Clone the project repository to your local machine using the following command:

```bash
git clone https://github.com/ukrocks007/task-manager.git
```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies using one of the package managers: npm, yarn, pnpm, or bun.

```bash
cd task-manager
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of your project and add any environment variables needed for your project. For example:

```dotenv
DATABASE_URL="postgresql://username:password@localhost:5432/db_name"
```

### 4. Run migration

Run following command to run the migrations.

```bash
npx prisma migrate deploy
```

### 5. Run the Development Server

Start the development server using one of the following commands based on your preferred package manager:

```bash
npm run dev
```

### 6. Use Postman Collection to run the apis

You can import the `TaskManager.postman_collection.json` file in your postman to execute the apis.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
# SerenityChat - Mental Health Chatbot

SerenityChat is a mental health chatbot built with **Next.js** and **Google's Dialogflow ES** to provide empathetic and meaningful conversations for users seeking support.

## 🚀 Features
- Next.js-based frontend
- Google Dialogflow ES for NLP processing
- Tailwind CSS for styling
- Light/Dark mode support
- API integration with Dialogflow ES
- Secure environment variables handling

## 🛠 Prerequisites
- **Node.js** (v16 or higher)
- **npm** (Node Package Manager)
- **Google Cloud account** with Dialogflow ES enabled
- **Dialogflow ES agent credentials** (JSON key file)

## 📌 Project Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ShubhamGupta-prog/serenitychatv4.git
cd serenitychatv4
```

### 2️⃣ Install Dependencies
```bash
npm install next@latest react@latest react-dom@latest
npm install @google-cloud/dialogflow
npm install next-themes lucide-react uuid
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot encoding
npm install -D tailwindcss postcss autoprefixer
npm install -D typescript @types/node @types/react @types/react-dom
```

### 3️⃣ Credentials Setup
1. Get the Dialogflow credentials file `advanced-serenitychat-bxtb-1dfe8941398c.json` from the project owner.
2. Place the file in the project root directory.

### 4️⃣ Set Up Environment Variables
Create a `.env.local` file in the root directory and add the following:
```env
DIALOGFLOW_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=./advanced-serenitychat-bxtb-1dfe8941398c.json
```

### 5️⃣ Run the Development Server
```bash
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) in your browser

## 📂 Project Structure
```
serenitychatv4/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts # Dialogflow API endpoint
│   ├── layout.tsx # Root layout with theme provider
│   └── page.tsx # Main chat interface
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── textarea.tsx
│   │   └── theme-toggle.tsx
│   └── theme-provider.tsx
├── lib/
│   └── utils.ts
├── .env.local
├── .gitignore
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 📜 License
This project is licensed under the MIT License.

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 💡 Acknowledgements
- [Next.js](https://nextjs.org/)
- [Google Dialogflow ES](https://cloud.google.com/dialogflow)
- [Tailwind CSS](https://tailwindcss.com/)

## 📬 Contact
For any inquiries or feedback, feel free to reach out via GitHub issues.

---
**Happy Coding! 🚀**

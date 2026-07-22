# AI Text Editor

A modern AI-powered text editor built with **Next.js**, **Tiptap**, **Supabase**, and **Groq**. Create rich-text documents, chat with AI alongside your writing, and manage your documents in one clean workspace.

![AI Text Editor Preview](./public/hero-image.png)

## ✨ Features

- 📝 Rich text editing powered by Tiptap
- 🤖 AI chat assistant for writing and brainstorming
- 💬 Conversation history for every document
- 📂 Document management
- 🔐 Secure authentication with Google and Email
- 📱 Responsive design for desktop, tablet, and mobile
- ⚡ Fast and modern UI built with shadcn/ui
- 🌙 Dark mode support

---

## 🛠 Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Motion
- Tiptap Editor
- shadcn/ui

### Backend

- Supabase
- PostgreSQL
- Row Level Security (RLS)

### AI

- Groq API

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/SyedJunaidAli1/AI-text-editor
cd AI-text-editor
```

### Install dependencies

```bash
bun install
```

### Configure environment variables

Create a `.env.local` file.

```env
# NEXTJS
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# SUPABASE
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=

# GOOGLE
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET=

# GROQ
GROQ_API_KEY=
```

### Run the development server

```bash
bun run dev
```

Visit

```
http://localhost:3000
```

---

## Project Structure

```
app/
components/
lib/
actions/
hooks/
public/
```

---

## Authentication

- Google OAuth
- Email & Password
- Secure sessions using Supabase Auth

---

## AI Features

The built-in AI assistant can help you:

- Brainstorm ideas
- Improve your writing
- Answer questions about your document
- Continue unfinished text

Each conversation is automatically saved with its document.

---

## License

This project is licensed under the MIT License.

---

## Author

**Syed Junaid Ali**

GitHub: https://github.com/SyedJunaidAli1

# 🔗 URL Shortener App

A simple and fast **URL Shortener** built with **Next.js**.  
It allows users to paste long URLs and generate short, shareable links instantly.  

---

## 🚀 Features
- 🔗 Shorten long URLs into simple links  
- 📋 Copy shortened URL to clipboard  
- 📜 Redirect to original URL when visiting short link  
- 💾 Store data in memory / database (MongoDB, PostgreSQL, etc.)  
- 📱 Responsive UI built with Next.js App Router  

---

## 🛠 Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd url-shortener
````

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
```

4. Open 👉 [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
app/
 ├── page.js          # Homepage with input form
 ├── layout.js        # Root layout
 ├── globals.css      # Global styles
 └── [shortId]/page.js # Dynamic route for redirects
lib/
 └── db.js            # Database logic (if using MongoDB/Postgres)
components/
 ├── UrlForm.js       # Form to shorten URL
 └── UrlCard.js       # Display short link
```

---

## 🎯 Future Upgrades

* 👤 User authentication with history of shortened URLs
* 📊 Click tracking & analytics
* 🌙 Dark/Light mode
* ☁️ Deployment with Vercel + DB integration

---

## 📸 Screenshots

*(Screenshots or demo GIF here soon)*

---

## 🚀 Deployment

Easiest way to deploy:
👉 [Deploy on Vercel](https://vercel.com/new)

For details: [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)

---

Made with 🔗 and ❤️ using [Next.js](https://nextjs.org) | Licensed under **MIT**
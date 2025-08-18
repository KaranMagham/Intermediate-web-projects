
# 🐾 PawPedia – Animal Encyclopedia App

PawPedia is an **Animal Encyclopedia Web App** built with **Next.js**.  
It allows users to **search and explore information about all animals** using the **[API Ninjas Animals API](https://api-ninjas.com/api/animals)**.  


## 🚀 Features
- 🔍 Search for **any animal** by name  
- 📖 Get details like habitat, diet, taxonomy, lifespan, and more  
- ⚡ Built with **Next.js 14 (App Router)** for modern features  
- 📱 Responsive UI that works across devices  
- 🔤 Optimized fonts with [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) and [Geist](https://vercel.com/font)  

---

## 🛠 Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd pawpedia
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

3. Add your **API Ninjas key** in an `.env.local` file:

```
NEXT_PUBLIC_API_NINJAS_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser 🚀


## 📁 Project Structure

app/
 ├── page.js          # Homepage
 ├── layout.js        # Root layout
 ├── globals.css      # Global styles
 └── components/      # SearchBar, AnimalCard, Results
lib/
 └── api.js           # API Ninjas fetch logic
public/               # Static assets (images, icons)


## 🎯 Future Upgrades

* 📸 Add animal images from Unsplash/Pexels API
* 📂 Category-based browsing (Mammals, Birds, Reptiles, etc.)
* ❤️ User favorites with localStorage/DB
* 🌙 Dark/Light mode toggle
* 🌍 Multi-language support

---

## 📸 Screenshots

(will be added soon)


## 🚀 Deployment

The easiest way to deploy PawPedia is with **Vercel**:
👉 [Deploy on Vercel](https://vercel.com/new)


Made with 🐾 and ❤️ using [Next.js](https://nextjs.org) + [API Ninjas](https://api-ninjas.com/api/animals) | Licensed under **MIT**
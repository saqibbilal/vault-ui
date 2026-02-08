# Keepr | Intelligent AI Document Vault

**Keepr** is a high-performance, responsive web application designed for semantic document management. It leverages Gemini 1.5 Flash to transform static documents into a searchable, interactive neural map.

![Keepr Dashboard Preview](https://via.placeholder.com/800x400?text=Keepr+Dashboard+UI)

## 🚀 Key Features
* **Semantic Search:** Search by meaning and concept rather than just keywords.
* **AI OCR Pipeline:** Automatic text extraction from images and PDFs using Google Gemini.
* **Intelligent Dashboard:** A glassmorphism-based UI with collapsible AI injection forms.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewports.
* **Secure Auth:** Protected routes and session management via Laravel Sanctum.

## 🛠️ Tech Stack
* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **State Management:** [Zustand](https://docs.pmnd.rs/zustand/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **CI/CD:** GitHub Actions

## 🔧 Installation & Setup
1. **Clone the repo:**
   ```bash
   git clone [https://github.com/your-username/vault-ui.git](https://github.com/your-username/vault-ui.git)```

2. **Install dependencies:**
```npm install```

3. **Configure Environment: Create a .env.local file:**
```NEXT_PUBLIC_API_URL=http://localhost:8000```

4. **Run Development Server:**
```npm run dev```

🏗️ Architecture
The frontend is architected as a Single Page Application (SPA) within Next.js to ensure lightning-fast transitions. It utilizes a custom Zustand store to manage global search states and hydration guards to prevent SSR mismatches in animated components.


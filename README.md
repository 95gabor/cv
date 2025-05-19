# Gábor Pichner CV – Nuxt 3

This is a modern, maintainable CV site built with Nuxt 3, Vue 3, TypeScript, and SCSS.

## Setup

Install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Project Structure & Conventions

This project follows modern Nuxt 3 and Vue 3 best practices for scalability and maintainability.

### Folder Structure

```
/components/
  /Header/
    Header.vue
    Header.scss
  /Experience/
    Experience.vue
    Experience.scss
  /Education/
    Education.vue
    Education.scss
  /Skills/
    Skills.vue
    Skills.scss
  /Hobbies/
    Hobbies.vue
    Hobbies.scss
/assets/
  /styles/
    _variables.scss   // SCSS variables for colors, spacing, etc.
    main.scss         // Global base styles and font family
/app.vue             // Main app entry
/app.scss            // App-level styles (skeletons, layout)
/content/
  cv.yaml            // CV data (Nuxt Content)
/public/
  github.png, linkedin.png, me.jpg, grid.svg, favicon.ico, robots.txt
/types/
  cv.ts              // TypeScript types for CV data
/nuxt.config.ts      // Nuxt configuration
```

### Conventions
- **Component Colocation:** Each component has its own folder with `.vue` and `.scss` files.
- **TypeScript:** All props are typed using `defineProps` and types from `/types/cv.ts`.
- **Styling:**
  - All styles are in external `.scss` files, imported at the top of each component.
  - Use variables from `assets/styles/_variables.scss` for all colors, spacing, etc.
  - No inline styles or deep selectors.
- **Global Styles:**
  - `main.scss` is imported globally via `nuxt.config.ts`.
  - `app.scss` is imported in `app.vue` for app-level and skeleton styles.
- **Content:**
  - All data is in `content/cv.yaml` and validated with a schema in `content.config.ts`.
- **Static Assets:**
  - All images and static files are in `/public` and referenced with root-relative paths.
- **No unused or legacy files.**

### Extensibility
- Use `/layouts/default.vue` for shared layouts if you add more pages.
- Use `/composables/` for shared logic if needed in the future.

---

For more, see the [Nuxt 3 documentation](https://nuxt.com/docs) and [Vue 3 style guide](https://vuejs.org/style-guide/).

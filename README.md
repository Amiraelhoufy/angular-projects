# Angular Project Summary:
## 🔹 TypeScript = JavaScript + Strong Typing
- **JavaScript**: Loosely typed — variables can change types at `runtime`
Example: var x = 5; x = "hello"; // no error

- **TypeScript**: Strongly typed — type errors are caught at `compile time`
## 🔹 Why Angular?
Angular is ideal for building **scalable frontends** and **reusing backend logic** across: Web (Angular apps), Mobile apps, IoT systems.

## 🔹 Key Concepts:
- **DOM**: Document Object Model — the structure of the webpage that Angular manipulates.

- **ES (ECMAScript)**: JavaScript's `standard specification` (Interface).

- **ES6+**: Modern JavaScript version introducing: Modules, Classes, Arrow functions `params => { ... }`, Destructuring.
- **^ (Caret)**: Allows installing the latest minor/patch versions.

## 📁 Angular Project Structure:
| File/Folder         | Description                                                      |
| ------------------- | ---------------------------------------------------------------- |
| `package.json`      | Lists **project dependencies**, **scripts**, and **metadata**.               |
| `package-lock.json` | Tracks **exact installed package versions** + **nested dependencies**. |
| `node_modules/`     | Directory where all **packages are downloaded**.                     |
| `angular.json`      | Configuration file for Angular CLI – defines build/test/lint scripts, file paths, etc. |
| `.eslintrc.json`    | ESLint configuration – used for linting and enforcing code quality rules.   |
| `src/app/`          | Contains all Angular **components**, **modules**, **services**, and app logic. |
| `src/assets/`       | Static assets like images, icons, fonts, etc.                              |
| `src/environments/` | Contains environment-specific config files (e.g., `dev`, `prod`).          |
| `tsconfig.json`     | TypeScript configuration file – used to compile TypeScript into JavaScript. |
| `package.json`      | Lists Angular dependencies, scripts, and project metadata.                 |
| `node_modules/`      | Automatically generated folder containing all installed npm packages.                        |
| `main.ts`               | The entry point of the Angular app; bootstraps the root module.                             |
| `index.html`            | The main HTML file; loads your app and links to compiled JavaScript.                        |
| `polyfills.ts`          | Adds compatibility for browsers that don’t support modern JavaScript features.              |
| `styles.css`            | Global CSS styles for the entire application.                                                |
| `test.ts`               | Entry point for running unit tests in Angular.                                               |

## 🛠 Tooling:
- `NPM`: Node Package Manager (like Maven for Java). Comes with Node.js.

- `Angular CLI (ng)`: Command line tool for creating, building, testing Angular apps.

## 🚀 Useful Commands:
| Command                   | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| `npm init`                | Initialize a Node project                                 |
| `ng new my-first-project` | Create a new Angular project                              |
| `ng serve`                | Run the project locally                                   |
| `ng serve --open`         | Run and open in browser automatically                     |
| `ng lint`                 | Check code style & violations                             |
| `ng build`                | Build the project for production (creates `dist/` folder) |
| `ng test`                 | Run **unit tests** using Jasmine & Karma                      |
| `ng e2e`    | Runs end-to-end (E2E) tests using **Protractor**, a framework built on top of **Selenium**, which launches a full Angular app in a **Chrome browser** and simulates real user interactions. These tests go beyond unit tests by verifying the app as a whole. <br/> ✅ Note: Angular has deprecated Protractor in newer versions (Angular 12+). Consider using **Cypress** or **Playwright** for modern E2E testing.|


### 🧪 Testing
- **Test Files**: End with .spec.ts
- **Jasmine**: Testing framework (assertions & test structure)
- **Karma**: Test runner (executes tests in browser)


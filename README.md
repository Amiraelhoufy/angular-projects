# Angular Summary:
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

## ⚙️ What Happens When an Angular Page Loads?

1. **Bootstrapping starts with the Root Module** (`AppModule`).
2. The **Root Component** (`AppComponent`) is rendered inside `index.html`.
3. Component tree loads recursively based on what’s included in `AppComponent` template.

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

## 1️⃣ Angular Components:

- A project consists of **multiple components**.
- **Decorator**:
  - `@Component` → defines a component (similar to `@ComponentScan` annotation in Spring Boot).
  
- 🧠 **ngOnInit()** vs **constructor()**
    - **constructor()** → used for **dependency injection** only.
    - **ngOnInit()** → used for **initialization logic** (fetching data, subscribing, etc.).
- **`@Component` properties**:
  - `selector`: HTML tag used to render the component (to call component).
  - `template` or `templateUrl`: inline HTML or path to `.html` file.
  - `styleUrls`: array of paths to CSS files.

- **Standalone Components (No NgModule):**
    - Modules are now optional.
    - Components can be bootstrapped directly in `main.ts` so `app.module.ts` is no longer required.
    - `ng generate component`:  creates components (no rollback).
    - `declarations[]` (used in `NgModule` that contains all available components) is no longer needed.
    - `export class` = `public class` (to use in other components).
    - Implement `OnInit` to run code in `ngOnInit()`: this method is called when the component is initialized.
    - Each module = 1 file = 1 class.
- **Angular Modules (@NgModule)**
    - Angular Modules are used to organize code into cohesive blocks.
    - Every Angular app has a root module **(AppModule)**, which uses the `@NgModule` decorator.
    - Explanation of Properties: 
        - **imports**: Import external Angular modules needed in your application.
        - **Common examples**:
        - `BrowserModule`: Required for any web application that runs in a browser.
        - `FormsModule`: Needed for template-driven forms ([(ngModel)]).
        - `RouterModule`: Enables routing between views/components
        - **declarations**: List of all your components, directives, and pipes that belong to this module.
        - **providers**: Register your **services** here for **dependency injection** across the app.
        - **bootstrap**: Specifies the **root component** that Angular should load first (typically AppComponent).
        
    ```typescript
        @NgModule({
        imports: [...],        // Import other Angular modules (e.g. BrowserModule, FormsModule)
        declarations: [...],   // Declare all components, directives, and pipes
        providers: [...],      // Register services for dependency injection
        bootstrap: [...]       // Root component to bootstrap (usually AppComponent)
        })
        export class AppModule {}
    ```

## 2️⃣ Data Binding Types:

### 🔹 Interpolation: `{{ value }}`
- One-way: component → view (template)

### 🔹 Two-Way Binding (Banana in a Box): `[(ngModel)]="username"`
- Component ⇄ View

### 🔹 Event Binding: `(click)="methodName()"`
- View → Component

### 🔹 Directives:
- Example: ***ngIf**, ***ngFor**
- To use them import `CommonModule` in standalone components.

### 🔹 Pipes (|):
- Transform data from one format to another in templates:

- `{{ dateValue | date }}`
- `{{ text | uppercase }}`
- `{{ text | lowercase }}`

## 3️⃣ Routing:

- Use `app.routes.ts` instead of `app-routing.module.ts`.
- Use `<router-outlet></router-outlet>` in your `main.html` to load routed views.
- `[()]` :  Array of objects
- Define route with parameter `'todos/:id'` Used to **pass data between components/pages** via URL.
```typescript
export const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },
  { path: 'welcome/:name', component: Welcome, canActivate: [RouteGuard] },
  { path: 'todos/:id', component: TodoItem, canActivate: [RouteGuard] },
  { path: 'todos', component: TodoList, canActivate: [RouteGuard] },
  { path: '**', component: Error }
];
```
### Routing Best Practices:

- **`href`**: Reloads the entire page → **Not recommended** for Angular apps.
- **`routerLink`**: Angular’s SPA routing → **Preferred**. No full page reload. Better performance.

### ActivatedRoute vs Route:
| Concept          | Description                                                                  |
| ---------------- | ---------------------------------------------------------------------------- |
| `ActivatedRoute` | Provides access to **route parameters**, query params, etc. (in a component) |
| `Route`          | Defines the route **configuration** in the `RouterModule.forRoot([...])`     |

---

### 🔐 Route Guards
→ **Prevent access** to **routes without authentication**.<br/>
→ Class implements **CanActivate**.<br/>
→ using `canActivate: [RouteGuard]` in `route.ts`.
```typescript
export class RouteGuard implements CanActivate {
  constructor(private auth: HardcodedAuthentication, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
```
## Dependency Injection (DI):
- Angular supports **built-in dependency injection** – no need to import manually.
- No need to create separate member variables – DI handles it.
- To inject a service or class, pass it directly to the component’s constructor:
```ts
  constructor(private serviceName: MyService) {}
```

## Service:

Services are used to share business logic or data between components.

- Decorated with `@Injectable()` to allow **dependency injection**.
- Easily reusable across components.

```bash
ng generate service your-service-name
```
## Model:

- Create a separate Todo class or interface as a model to define structure:
```typescript
export class Todo {
  constructor(
    public id: number,
    public description: string,
    public targetDate: Date,
    public done: boolean
  ) {}
}
```
### 📁 Folder Structure Best Practices (Optional)
```
src/
├── app/
│   ├── components/       # Reusable components
│   ├── services/         # Angular services (@Injectable)
│   ├── models/           # Interfaces and types
│   ├── constants/        # Static values/constants
│   └── app.module.ts     # Root Angular module

```

## 💾 Web Storage: Session vs Local
| Feature  | Session Storage                 | Local Storage                         |
| -------- | ------------------------------- | ------------------------------------- |
| Lifespan | Until the browser/tab is closed | Persistent (even after restart)       |
| Scope    | Per-tab or window               | Shared across tabs of the same domain |
| Security | Slightly more secure            | Less secure (more persistent)         |

Access in browser: `Inspect → Application → Storage`

---

## 🔗 Angular Module vs JavaScript Module

| Feature            | Angular Module                             | JavaScript/TypeScript Module                   |
|--------------------|---------------------------------------------|------------------------------------------------|
| Definition         | Uses `@NgModule` to group components, services, and pipes | Any `.js` or `.ts` file containing reusable code |
| Purpose            | Organizes Angular-specific building blocks | Organizes general logic, functions, or constants |
| Usage              | Required for Angular app structure         | Used throughout any JS/TS project               |


---

## 🎨 Bootstrap Integration in Angular

**What is Bootstrap?**  
A popular CSS framework for building responsive and modern UI layouts.

### CDN vs NPM (Short Comparison)

| Method   | Pros                                       | Cons                                |
|----------|---------------------------------------------|-------------------------------------|
| CDN      | Fast to implement, no install needed        | No version control, depends on internet |
| NPM      | Better for production, version control, CLI integration | Needs installation setup           |

---
## 🌐 Web Services & REST API Overview

A **Web Service** is a software system designed to support **1) interoperable**, **2)machine-to-machine** interaction over a **3)network** using platform-independent formats like XML or JSON.

## 🔁 What is a Web Service?

- A **service delivered over the web**
- Reuses functionality from another application via HTTP
- Enables cross-platform communication (e.g., Java ↔ .NET)

## 1) Interoperability

> Can a .NET app call a service written in Java?

✅ **Yes**, if the communication uses **standard protocols** (HTTP) and **platform-independent formats** (XML, JSON).  
❌ **No**, if relying on language-specific binaries (e.g., `.jar` files or `.dll`), because those are platform/language dependent.

## Data Exchange Between Apps

Data flow pattern:
```
App A <----Request/Response----> Web Service
```
- Uses standard **HTTP methods** to interact
- Data format: **JSON** or **XML**
- Enables apps to work together regardless of their tech stack


## 2) Platform Independence

To achieve platform independence:
- Use **HTTP** as a transport
- Use **JSON or XML** as message format
  - **JSON**: Lightweight, JavaScript-based
  - **XML**: Markup language with opening/closing tags (`<id></id>`)

  
## 3) Does the Client Know Request/Response Format?

Yes — via the **Service Definition / API Documentation**, often using:
- OpenAPI/Swagger for REST
- WSDL for SOAP

---

## 🔑 Key Terminology

| Term                    | Description                                           |
|-------------------------|-------------------------------------------------------|
| Request / Response      | Input & Output of the service                        |
| Message Format          | JSON or XML                                           |
| Endpoint / Resource     | URL of the API                                      |
| Service Provider/Server | App exposing the API                                  |
| Service Client/Consumer | App consuming the API                                 |
| Service Definition      | Contract or documentation of the service              |
| Transport Protocol      | HTTP (or MQ for message queues)                       |

---

## 🧭 RESTful Web Services

**REST**: (Representational State Transfer)  
Uses HTTP effectively by mapping resources to URIs and actions to HTTP methods.

### 📄 HTTP Request Components

- **Method**: `GET`, `POST`, `PUT`, `DELETE`, etc.
- **Headers**: Metadata (e.g., content type, auth)
- **Body**: Request data (JSON, XML)
- **Response**: Status code + body (JSON, etc.)

## 🛠️ REST API Design Example:

### 1. Retrieve all Todos for a user: 
```Get /users/{user_name}/todos```

### 2- Delete a Todo of a user:
```Delete /users/{user_name}/todos/{todo_id}```

### 3- Edit/Update a Todo:
```Put /users/{user_name}/todos/{todo_id}```

### 4- Create a new Todo:
```Post /users/{username}/todos/```


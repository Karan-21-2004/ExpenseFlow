# ExpenseFlow — React Edition

Your original ExpenseFlow project has been upgraded to a React + Vite frontend. The Java Servlet, JDBC, MySQL schema, PWA manifest/service worker, and original assets are retained.

## Stack
- HTML5, CSS3, JavaScript (ES modules)
- React 18 + Vite
- Chart.js + react-chartjs-2
- Java Servlet + JDBC + MySQL (existing backend)
- localStorage fallback when the backend is unavailable

## Run the React frontend
1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. Open the terminal in this folder and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite (usually http://localhost:5173).

The app works in local browser-storage mode without Tomcat/MySQL. When the existing Java backend is running at `http://localhost:8080/ExpenseFlow`, Vite proxies `/ExpenseFlow` API requests to it.

## Run with the existing Java/MySQL backend
- Keep the existing database and servlet configuration.
- Start MySQL and Apache Tomcat, and deploy the Java web app at context path `/ExpenseFlow`.
- Run the React app with `npm run dev`; it will call the existing `/ExpenseFlow/api/expenses` endpoint.
- For a production deployment, run `npm run build` and deploy the generated `dist` frontend alongside/through your Tomcat setup. Ensure the app and servlet API paths share the `/ExpenseFlow` context path.

## Important backend note
The existing servlet contains database credentials directly in source. Do not publish real credentials in a public repository; move them to environment/configuration settings before production use.

## React concepts demonstrated
- Components: `ExpenseForm`, `SummaryCard`, `ExpenseChart`, `ExpenseList`
- Props: data and callbacks passed from `App`
- State: `useState` for expenses, form fields, loading and search
- Effects: `useEffect` for initial fetch and localStorage persistence
- Derived data: `useMemo` for totals, chart data and filtered/grouped expenses
- Events: controlled form inputs, submit, search and delete

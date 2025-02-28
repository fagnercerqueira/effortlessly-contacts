import { StrictMode, createRef, ReactNode, RefObject} from 'react'
import { createRoot } from 'react-dom/client'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useOutlet,
} from 'react-router-dom'
import ThemeProvider from '../theme'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import './index.css'

interface Route {
  path: string;
  name: string;
  element: ReactNode;
  nodeRef: RefObject<HTMLDivElement | null>;
}

const routes: Route[] = [
  { path: '/', name: 'Login', element: <Login />, nodeRef: createRef() },
  { path: '/login', name: 'Login', element: <Login />, nodeRef: createRef() },
  { path: '/register', name: 'Register', element: <Register />, nodeRef: createRef() },
  { path: '/dashboard', name: 'Dashboard', element: <Dashboard />, nodeRef: createRef() },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
])

function App() {
  const location = useLocation()
  const currentOutlet = useOutlet()
  const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {};

  return (
    <ThemeProvider>
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={300}
          classNames="page"
          unmountOnExit
        >
          {() => (
            <div ref={nodeRef} className="page">
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

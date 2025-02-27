import { StrictMode, createRef, ReactNode, RefObject} from 'react'
import { createRoot } from 'react-dom/client'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import {
  createBrowserRouter,
  RouterProvider,
  NavLink,
  useLocation,
  useOutlet,
} from 'react-router-dom'
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import './index.css'

interface Route {
  path: string;
  name: string;
  element: ReactNode;
  nodeRef: RefObject<HTMLDivElement | null>;
}

const routes: Route[] = [
  { path: '/', name: 'Home', element: <Home />, nodeRef: createRef() },
  { path: '/auth', name: 'Auth', element: <Auth />, nodeRef: createRef() },
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
    <>
      <NavLink key="home" to="/" className={({ isActive }) => (isActive ? 'active' : undefined)} end>
        home
      </NavLink>
      <NavLink key="auth" to="/auth" className={({ isActive }) => (isActive ? 'active' : undefined)} end>
        auth
      </NavLink>

      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={300}
          classNames="page"
          unmountOnExit
        >
          {(state) => (
            <div ref={nodeRef} className="page">
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

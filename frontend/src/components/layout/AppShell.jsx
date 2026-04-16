import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Avatar } from "../ui/Avatar";
import { BrandLogo } from "../ui/BrandLogo";
import { Button } from "../ui/UI";
import { Footer } from "./Footer";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Assessment", to: "/assessment" },
  { label: "Courses", to: "/courses" },
  { label: "Projects", to: "/projects" },
  { label: "Earn", to: "/earn" },
  { label: "Competitions", to: "/competitions" },
  { label: "Leaderboard", to: "/leaderboard" },
  { label: "Community", to: "/community" },
  { label: "Mentorship", to: "/mentorship" },
  { label: "Career", to: "/career" },
  { label: "Startup Ideas", to: "/startups" },
  { label: "Profile", to: "/profile" },
  { label: "Settings", to: "/settings" },
];

export function AppShell() {
  const [open, setOpen] = useState(false);
  const { auth, logout } = useAuth();
  const location = useLocation();
  const contentRef = useRef(null);

  const title = useMemo(() => {
    const item = navItems.find((entry) => entry.to === location.pathname);
    return item?.label || "Best Version";
  }, [location.pathname]);

  useEffect(() => {
    setOpen(false);
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <Link to="/dashboard">
            <BrandLogo compact theme="dark" />
          </Link>
          <button className="icon-btn mobile-only" onClick={() => setOpen(false)} type="button">
            <X size={18} />
          </button>
        </div>
        <div className="sidebar-profile">
          <Avatar src={auth.user?.avatar} name={auth.user?.name} size={48} />
          <div>
            <strong>{auth.user?.name}</strong>
            <span>{auth.user?.headline || auth.user?.role}</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          {["admin", "recruiter"].includes(auth.user?.role) ? <NavLink to="/admin">Admin</NavLink> : null}
        </nav>
        <Button variant="ghost" className="sidebar-logout" onClick={logout}>
          Logout
        </Button>
      </aside>

      <div className="app-content" ref={contentRef}>
        <header className="topbar">
          <div>
            <button className="icon-btn mobile-only" onClick={() => setOpen(true)} type="button">
              <Menu size={18} />
            </button>
            <span className="eyebrow">Build your momentum</span>
            <h1>{title}</h1>
          </div>
          <div className="topbar-actions">
            <div className="xp-pill">{auth.user?.stats?.xp || 0} XP</div>
            <Link className="avatar-link" to="/profile">
              <Avatar src={auth.user?.avatar} name={auth.user?.name} size={44} />
            </Link>
          </div>
        </header>
        <main className="page">
          <Outlet />
        </main>
        <Footer variant="app" />
      </div>
      {open ? <button className="sidebar-backdrop" onClick={() => setOpen(false)} type="button" /> : null}
    </div>
  );
}

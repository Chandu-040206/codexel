
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaLaptopCode,
  FaHome,
  FaInfoCircle,
} from "react-icons/fa";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem("token"));
  });

  // Store user details to retrieve avatar
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  // Update header when login/logout/profile update happens
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));

      try {
        setUser(JSON.parse(localStorage.getItem("user") || "null"));
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("authChange", checkAuth);
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("authChange", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu using Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
    setIsOpen(false);

    window.dispatchEvent(new Event("authChange"));
    navigate("/", { replace: true });
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto h-16 sm:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Left Section: Mobile Menu + Logo */}

          <div className="flex items-center gap-3 sm:gap-4">

            {/* Mobile Menu Button */}

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-colors -ml-1.5 cursor-pointer"
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
            >
              <FaBars className="text-base" />
            </button>

            {/* Logo */}

            <Link
              to="/"
              className="flex items-center gap-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
              aria-label="CodeXel Home"
            >
              <img
                src="/codexel.jpeg"
                alt="CodeXel Logo"
                className="h-8 w-8 object-contain sm:h-9 sm:w-9"
              />

              <span className="text-2xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
                odeXel
              </span>
            </Link>
          </div>

          {/* Right Section */}

          <div className="flex items-center gap-4 sm:gap-6">

            {/* Desktop Navigation */}

            <nav
              className="hidden md:flex items-center gap-1.5 font-medium"
              aria-label="Main Navigation"
            >
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold shadow-2xs"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold shadow-2xs"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  }`
                }
              >
                About
              </NavLink>

              <NavLink
                to="/build"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold shadow-2xs"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  }`
                }
              >
                Build
              </NavLink>
            </nav>

            {/* Profile / Join Us */}

            {isLoggedIn ? (
              <Link
                to="/profile"
                className="flex items-center transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full cursor-pointer"
                title="Profile"
                aria-label="Profile"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile Avatar"
                    className="h-8 w-8 rounded-full object-cover border border-slate-200 shadow-2xs"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-blue-600" />
                )}
              </Link>
            ) : (
              <NavLink
                to="/auth"
                className={({ isActive }) =>
                  `inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-150 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    isActive
                      ? "bg-blue-700 text-white ring-2 ring-blue-600 ring-offset-2"
                      : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"
                  }`
                }
              >
                Join Us
              </NavLink>
            )}
          </div>
        </div>
      </header>

      {/* ================= MOBILE BACKDROP ================= */}

      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* ================= MOBILE SIDE DRAWER ================= */}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-[70] w-72 max-w-[85vw] bg-white border-r border-slate-200 shadow-2xl p-5 flex flex-col justify-between overflow-y-auto overscroll-contain transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile Navigation"
        aria-hidden={!isOpen}
      >
        {/* Drawer Top Section */}

        <div>

          {/* Drawer Header */}

          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-0"
              aria-label="CodeXel Home"
            >
              <img
                src="/codexel.jpeg"
                alt="CodeXel Logo"
                className="h-8 w-8 object-contain"
              />

              <span className="text-2xl font-extrabold text-blue-600 tracking-tight">
                odeXel
              </span>
            </Link>

            {/* Close Button */}

            <button
              type="button"
              onClick={closeMenu}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <FaTimes className="text-base" />
            </button>
          </div>

          {/* Mobile Navigation Links */}

          <nav aria-label="Mobile Navigation Links">
            <ul className="flex flex-col gap-2 text-sm font-medium">

              <li>
                <NavLink
                  to="/"
                  end
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  <FaHome className="text-base text-slate-400" />
                  <span>Home</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  <FaInfoCircle className="text-base text-slate-400" />
                  <span>About</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/build"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  <FaLaptopCode className="text-base text-slate-400" />
                  <span>Build Studio</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Drawer Bottom Section */}

        <div className="pt-5 mt-5 border-t border-slate-100">

          {!isLoggedIn ? (
            <NavLink
              to="/auth"
              onClick={closeMenu}
              className="flex items-center justify-center w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              Join Us
            </NavLink>
          ) : (
            <div className="space-y-3">

              {/* User Profile */}

              <Link
                to="/profile"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-50 transition-colors"
                title="Profile"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile Avatar"
                    className="h-10 w-10 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-blue-600" />
                )}

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {user?.name || "User"}
                  </p>

                  <p className="text-xs text-slate-500">
                    View Profile
                  </p>
                </div>
              </Link>

              {/* Logout */}

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-red-50 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
              >
                <FaSignOutAlt className="text-sm" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Header;

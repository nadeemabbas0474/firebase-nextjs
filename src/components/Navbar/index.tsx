import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showNavbar, setShowNavbar] = React.useState(false);
  return (
    <div
      className={`flex justify-between flex-row-reverse h-16 p-4 bg-gray-300 `}
    >
      {!showNavbar ? (
        <div className="flex justify-between w-full">
          <h3>NextJs-Authintication</h3>
          <button
            onClick={() => setShowNavbar(true)}
            style={{
              height: "25px",
            }}
          >
            <HiOutlineMenu />
          </button>
        </div>
      ) : (
        <button onClick={() => setShowNavbar(false)}>
          <RiCloseFill />{" "}
        </button>
      )}
      {user ? (
        <div
          onClick={() => {
            setTimeout(() => {
              router.push("/login");
              logout();
            }, 1000);
            toast("🦄 successful to logout!", {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }}
        >
          logout
        </div>
      ) : (
        <div>
          {showNavbar && (
            <nav>
              <ul className="flex space-x-12">
                <Link href="/login">
                  <h3 className="text-black">Login</h3>
                </Link>
                <Link href="/signUp">
                  <h3 className="text-red-500">signUp</h3>
                </Link>
              </ul>
            </nav>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;

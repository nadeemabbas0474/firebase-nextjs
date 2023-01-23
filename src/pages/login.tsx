import React from "react";
import { Button, TextField } from "@mui/material";
import { GoSignIn } from "react-icons/go";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await login(data.email, data.password);
      toast("🦄 successful to login!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push("/dashboard");
        setData({
          email: "",
          password: "",
        });
      }, 2000);
    } catch (err) {
      toast("🦄 Faild to login!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <ToastContainer />
      <h1 className="text-blue-500">Login Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-12 w-96">
        <TextField
          required
          id="email"
          label="Email"
          defaultValue="Email"
          variant="standard"
          type="email"
          name="email"
          value={data.email}
          onChange={(e: any) =>
            setData({
              ...data,
              email: e.target.value,
            })
          }
        />
        <TextField
          required
          id="password"
          label="Password"
          defaultValue="password"
          variant="standard"
          type="password"
          name="password"
          value={data.password}
          onChange={(e: any) =>
            setData({
              ...data,
              password: e.target.value,
            })
          }
        />
        <Button
          variant="contained"
          size="small"
          type="submit"
          className="rounded-full"
          endIcon={<GoSignIn />}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;

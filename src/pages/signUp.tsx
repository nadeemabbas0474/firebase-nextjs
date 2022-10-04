import React from "react";
import Button from "@mui/material/Button";
import { useAuth } from "../context/AuthContext";
import { TextField } from "@mui/material";
import { useRouter } from "next/router";

function SignUp() {
  const router = useRouter()
  const { user, singup } = useAuth();
  console.log(user, "user");
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const handleSignUp = async (e: any) => {
    e.preventDefault();

    try {
      await singup(data.email, data.password);
      alert("SignUp Successfull")
      router.push("/login")
    } catch (err) {
    }
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-blue-500">SignUp</h1>
      <form onSubmit={handleSignUp} className="flex flex-col space-y-6 w-96">
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
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
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          type="password"
          name="password"
          value={data.password}
          onChange={(e: any) => setData({ ...data, password: e.target.value })}
        />
        <Button type="submit" variant="contained">
          SignUp
        </Button>
      </form>
    </div>
  );
}
export default SignUp;
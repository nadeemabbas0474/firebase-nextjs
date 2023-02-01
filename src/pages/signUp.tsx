import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useAuth } from "../context/AuthContext";
import { TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function SignUp() {
  const [validations, setValidations] = useState("")
  const text = "setValidations";
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
      if(data.password.length < 6) {
        setValidations(text)
      } else {
        toast("🦄 SignUp Successfull ", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push("/login")
      }
     
    } catch (err) {
    }
    console.log(data, "data data")
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-blue-500">SignUp</h1>
      <form onSubmit={handleSignUp} className="flex flex-col space-y-6 w-96">
        <TextField
          id="outlined-basic"
          label="Email"
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
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={data.password}
          onChange={(e: any) => setData({ ...data, password: e.target.value })}
        />
        <Typography>{validations ? validations : "null"}</Typography>
        <Button type="submit" variant="contained">
          SignUp
        </Button>
      </form>
    </div>
  );
}
export default SignUp;
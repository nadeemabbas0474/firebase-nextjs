import React, { useState, useRef, useEffect } from "react";
const imageMimeType = /image\/(png|jpg|jpeg)/i;
import { VStack, Input, Button } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../config/firebase";

interface Props {
  handleFetchingData: () => void;
}
const AddProductForm = (props: Props) => {
  const { handleFetchingData } = props;
  const [error, setError] = useState("");
  const [formInput, setFormInput] = useState({
    name: "",
    price: "",
    total: "",
  });

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const changeHandler = (e: any) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };
  useEffect(() => {
    let fileReader: any,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const databaseRef: any = collection(database, "products");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(file, "file of the image");
    if (
      e.target.name.value === "" ||
      e.target.price.value === "" ||
      e.target.total.value === ""
    ) {
      setError("are required");
    } else {
      console.log(formInput, "formInput");
      addDoc(databaseRef, formInput)
        .then((Response) => console.log(Response, "success"))
        .catch((err) => console.log(err, "errr"));
      handleFetchingData();
      setFormInput({
        name: "",
        price: "",
        total: "",
      });
    }
  };

  const handleChange = (evt: any) => {
    const value = evt.target.value;
    setFormInput({
      ...formInput,
      [evt.target.name]: value,
    });
  };

  return (
    <>
      <VStack
        as="form"
        spacing={5}
        alignItems="center"
        onSubmit={handleSubmit}
        className="space-y-12 w-96 m-auto"
      >
        <Input
          variant="filled"
          value={formInput.name}
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          className="border-2 border-black rounded-md bg-red-100 p-2"
        />
        <Input
          placeholder="Price"
          _placeholder={{ opacity: 0.4, color: "inherit" }}
          name="price"
          type="number"
          onChange={handleChange}
          value={formInput.price}
          className="border-2 border-black rounded-md bg-red-100 p-2"
        />
        <Input
          name="total"
          placeholder="Total"
          type="number"
          onChange={handleChange}
          value={formInput.total}
          className="border-2 border-black rounded-md bg-red-100 p-2"
        />
        <Input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e: any) => setFile(e.target.file)}
        />
        <Button type="submit">Add Product</Button>
      </VStack>

      <>
        <form>
          <p>
            <label htmlFor="image"> Browse images </label>
            <input
              type="file"
              id="image"
              accept=".png, .jpg, .jpeg"
              onChange={changeHandler}
            />
          </p>
          <p>
            <Button type="submit" aria-label="Upload">
              UpLoad
            </Button>
          </p>
        </form>
        {fileDataURL ? (
          <p className="img-preview-wrapper">
            {<img src={fileDataURL} alt="preview" />}
          </p>
        ) : null}
      </>
    </>
  );
};

export default AddProductForm;

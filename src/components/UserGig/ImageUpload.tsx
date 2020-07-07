import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Input, Form, Button } from "semantic-ui-react";
import { GigContext } from "../../context/GigProvider";
import dotenv from "dotenv";
import { H1Style } from "../commons/style";

dotenv.config();

// const upload_preset: any = process.env.REACT_APP_UPLOAD_PRESET;
// const cloud_base_name: any = process.env.REACT_APP_CLOUDINARY_BASE_URL;

const ImageUpload = ({ gig }: any) => {
  const { updateImage } = useContext(GigContext);
  const [file, setFile] = useState();

  const handleFile = ({ target: { files } }: any) => {
    setFile(files[0]);
    const data: any = new FormData();
    data.append("file", files[0]);
    setFile(data);
    // data.append("upload_preset", upload_preset);
    // axios
    //   .post(cloud_base_name, data, {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   })
    //   .then((res) => {
    //     setFile(res.data.secure_url);
    //   })
    //   .catch((err) => console.log(err.response));
  };
  const onsubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateImage(gig.id, file);
  };
  return (
    <ImageWrapper>
      <H1Style>Image Upload</H1Style>
      <Form onSubmit={onsubmit} style={{ width: "100% !important" }}>
        <Input
          className='input'
          type='file'
          placeholder='Upload image'
          onChange={handleFile}
          accept='imgae/*'
        />
        <Button
          type='submit'
          style={{ marginTop: "1em", background: "#00B5AD", color: "white" }}
        >
          Upload
        </Button>
      </Form>
      <ShowImage>{/* <img src={file && file} alt='upload' /> */}</ShowImage>
    </ImageWrapper>
  );
};

export default ImageUpload;

const ImageWrapper = styled.div`
  width: 100% !important;
  .input {
    width: 100% !important;
  }
`;
const ShowImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 1em;

  img {
    width: 100%;
  }
`;

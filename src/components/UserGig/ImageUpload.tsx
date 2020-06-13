import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Input, Form, Button } from "semantic-ui-react";
import { GigContext } from "../../context/GigProvider";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const upload_preset: any = process.env.REACT_APP_UPLOAD_PRESET;
const cloud_base_name: any = process.env.REACT_APP_CLOUDINARY_BASE_URL;

const ImageUpload = ({ gig }: any) => {
  const { updateGig } = useContext(GigContext);
  const [file, setFile] = useState();

  const handleFile = ({ target: { files } }: any) => {
    setFile(files[0]);
    console.log(files[0]);
    const data: any = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", upload_preset);
    axios
      .post(cloud_base_name, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setFile(res.data.secure_url);
      })
      .catch((err) => console.log(err.response));
  };
  const onsubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateGig(gig.id, { ...gig, profile_image: file });
  };
  return (
    <ImageWrapper>
      <H1>Image Upload</H1>
      <Form onSubmit={onsubmit} style={{ width: "100% !important" }}>
        <Input
          className='input'
          type='file'
          placeholder='Upload image'
          onChange={handleFile}
        />
        <Button type='submit'>Upload</Button>
      </Form>
      <ShowImage>
        <img src={file && file} />
      </ShowImage>
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

  img {
    width: 100%;
  }
`;
const H1 = styled.h1`
  padding: 1em;
`;

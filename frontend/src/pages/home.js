import React, { useState } from "react";
import logo from './images/logo.svg'; // Tell webpack this JS file uses this image
import TextField from '@mui/material/TextField';
import { BASE_BACKEND_URL } from "./constants";

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState()
  const [reqError, setReqError] = useState()
  const handleTextChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async () => {
    let submitUrl = url
    if (!url.startsWith("https://") && !url.startsWith("http://")){
      submitUrl = `https://${url}`
    }
    const request = new Request(`http://${BASE_BACKEND_URL}/url`, {
    method: "put",
    body: JSON.stringify({"url": submitUrl}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
});
  const resp = await fetch(request)
  const obj = await resp.json()
  if(!obj.slug){
    setReqError("Error: Invalid URL")
  }
  setShortUrl(`http://${BASE_BACKEND_URL}/${obj.slug}`)
  }

  const textFieldStyle = {
    width: '100%',
  };

 return (
    <div className="max-h-screen items-center">
      <header className="w-full py-2 flex items-center justify-between spacex-3 px-6 border-b-[1px] border-gray-600">
      <img
      src={logo}
      alt="Logo"
      className="h-24 w-32 rounded-xl"
    /> 
    

      </header>
    <center>
      <div className = "mt-10 w-1/2">
        <p className = "text-[60px]">Generate a shortened url</p>
        <div className = "mt-6">
      <TextField
        style={textFieldStyle}
        label="Enter url"
        value={url}
        onChange={handleTextChange}
      />
    <button
          disabled = {url === ""}
          className={url === "" ?"mt-4 w-full bg-[#ff914d26] py-2 rounded-sm text-white": "mt-4 w-full bg-[#ff914d] py-2 rounded-sm text-white"}
          onClick={handleSubmit}
        >
      Submit
    
        </button>
        { reqError ? <p className = "mt-2 "> {reqError} </p> :
        shortUrl  && <p className = "mt-2 "> Access your shortened URL here: <a href = {shortUrl}>{shortUrl}</a></p>}
      </div>
    </div>
    </center>
</div>
 )

 }
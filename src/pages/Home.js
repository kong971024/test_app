

import React, { Component } from "react";
import { useState, useRef, useEffect } from 'react';
import ST from "../Music/St.mp3"

import 'semantic-ui-css/semantic.min.css';

function Canvas  () {
  const [image, setImage] = useState(null)
  const [Text, setText] = useState('')
  const [Xpos1, setXpos1] = useState(0)
  const [Ypos1, setYpos1] = useState(0)
  const [Xpos2, setXpos2] = useState(0)
  const [Ypos2, setYpos2] = useState(0)
  const [hasInput, sethasInput] = useState(false)
  const [time, settime] = useState(0)
  const [timeron, settimeron] = useState(false)
  const [video, setVideo] = useState(null)
  const [subtitle1, setsubtitle1] = useState('')
  const [subtitle2, setsubtitle2] = useState('')
  const [I1, setI1] = useState(1)
  const [I2, setI2] = useState(1)
  const [music, setmusic] = useState(null)

  const canvas = useRef(null)

  useEffect(() => {
    const selectedImage = new Image();
    selectedImage.src = "https://miro.medium.com/max/1024/1*OK8xc3Ic6EGYg2k6BeGabg.jpeg";
    selectedImage.onload = () => setImage(selectedImage)
  }, [])
  useEffect(() => {
    const selectedvideo = document.getElementById("video");
    setVideo(selectedvideo);
  }, [])
  useEffect(() => {
    const selectedmusic = document.getElementById("ST");
    setmusic(selectedmusic);
  }, [])
  useEffect(() => {
    if (image && canvas) {
      const ctx = canvas.current.getContext("2d");
      if (time < 2950) {
        ctx.drawImage(image, 0, 0, 1280, 720)
        if (subtitle1 != null) {
          ctx.fillText(subtitle1.substr(0, I1), Xpos1, Ypos1)
          setI1(time / (2500 / subtitle1.length))
        }
      }
      else if (time === 2950) {
        fadeinout();
      } else if (time === 3000) {
        video.currentTime = 5;
      }
      else if (time >= 3000 && time < 8000) {

        ctx.drawImage(video, 0, 0, 1280, 720)
        if (subtitle2 != null) {
          ctx.fillText(subtitle2.substr(0, I2), Xpos2, Ypos2)
          setI2((time - 3000) / ((8000 - 4000) / subtitle2.length))
        }
      } else if(time>=8000){
        video.pause();
        music.pause();
        return
      }
      ctx.font = "60px Times New Roman"
      //ctx.fillText(Text, Xpos, Ypos)
    }

  }, [image, video, canvas, Text, Xpos1, Ypos1, Xpos2, Ypos2, time, I1, I2, subtitle1, subtitle2])

  const handleonClick = (event) => {
    console.log('Click!')
    if (timeron) {
      if (hasInput) return
      addInput(event.clientX, event.clientY)
      settimeron(false)
      video.pause();
      music.pause();
    } else {
      settimeron(true)
      video.play();
      music.play();
    }
  }

  function addInput(x, y) {

    var input = document.createElement('input');

    input.type = 'text';
    input.style.position = 'fixed';
    input.style.left = (x - 4) + 'px';
    input.style.top = (y - 4) + 'px';

    input.onkeydown = handleEnter;

    document.body.appendChild(input);

    input.focus();

    sethasInput(true);
  }
  function handleEnter(e) {
    var keyCode = e.keyCode;
    if (keyCode === 13) {
      setText(this.value)
      if (time < 3000) {
        setsubtitle1(this.value);
      } else {
        setsubtitle2(this.value);
      }
      if (time < 3000) {
        setXpos1(parseInt(this.style.left, 10))
        setYpos1(parseInt(this.style.top, 10))
      } else {
        setXpos2(parseInt(this.style.left, 10))
        setYpos2(parseInt(this.style.top, 10))
      }
      document.body.removeChild(this);
      sethasInput(false);
    }
  }

  function playbuttonClick() {
    settimeron(true);
    video.play();
    music.play();
  }
  function pausebuttonClick() {
    settimeron(false);
    video.pause();
    music.pause();
  }
  function stopbuttonClick() {
    settime(0);
    settimeron(false);
    video.currentTime = 0;
    music.currentTime =0;
    video.pause();
    music.pause();
  }

  function fadeinout() {
    var toggle = true, isBusy = false
    var img, opacity = 0

    if (isBusy) return;
    isBusy = true;

    img = toggle ? video : image;

    (function fadeIn() {
      const ctx = canvas.current.getContext("2d");
      ctx.globalAlpha = opacity;
      ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
      opacity += 0.02;
      if (opacity < 1)
        requestAnimationFrame(fadeIn);
      else
        isBusy = false;
    })();

    toggle = !toggle;
  }

  useEffect(() => {
    let interval = null;
    let timerun = time;
    if (timeron && time < 8000) {
      interval = setInterval(() => {
        settime(prevTime => prevTime + 10)
        timerun += 10
        if (timerun > 7990) {
          clearInterval(interval)
          return
        }
      }, 10)
    }
    else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [timeron, time, video])



  return (
  
    <div>       
      <div class="canvas">
        <canvas
          id="canvas"
          ref={canvas}
          width={1280}
          height={720}
          onClick={handleonClick}
        />
      </div>
      <input type="text" value={Text} onChange={e => setText(e.target.value)} />
      <div>{subtitle1}, {subtitle2}</div>
      <div> Video time =
       <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 1000)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 10) % 100)).slice(-2)}</span>
      </div>
      <button onClick={() => playbuttonClick()}>Play</button>
      <button onClick={() => pausebuttonClick()}>Pause</button>
      <button onClick={() => stopbuttonClick()}>Stop</button>
      <div hidden>
        <video id="video" src="https://media.gettyimages.com/videos/goodlooking-young-woman-in-casual-clothing-is-painting-in-workroom-video-id1069900546" controls="true" autoplay="true" preload="true" />
      </div>
      <audio id="ST" src={ST} />      
    </div>
 

  )
}
export default Canvas





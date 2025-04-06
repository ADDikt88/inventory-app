import { useState, useRef } from "react";

const CameraCapture = ({ onCapture }) => {
  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    setCameraOpen(true);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: isMobile ? "environment" : "user",
      },
    });
    videoRef.current.srcObject = stream;
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    // Original video dimensions
    const originalWidth = video.videoWidth;
    const originalHeight = video.videoHeight;

    // Scale down while maintaining aspect ratio
    const maxSize = 150;
    let newWidth, newHeight;

    if (originalWidth > originalHeight) {
      newWidth = maxSize;
      newHeight = Math.floor((originalHeight / originalWidth) * maxSize);
    } else {
      newHeight = maxSize;
      newWidth = Math.floor((originalWidth / originalHeight) * maxSize);
    }

    // Resize the canvas
    canvas.width = newWidth;
    canvas.height = newHeight;

    //draw videoframe onto canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    //convert canvas to file
    canvas.toBlob(
      (blob) => {
        const file = new File([blob], "captured-image.jpg", {
          type: "image/jpeg",
        });
        onCapture(file);
        //50% quality
      },
      "image/jpeg",
      0.5
    );

    // Stop the camera
    const stream = video.srcObject;
    stream.getTracks().forEach((track) => track.stop());
    setCameraOpen(false);
  };

  return (
    <div>
      {!cameraOpen ? (
        <button onClick={startCamera}>Open Camera</button>
      ) : (
        <div>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ border: "1px solid black" }}
          ></video>
          <br></br>
          <button onClick={captureImage}>Capture</button>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};

export default CameraCapture;

import React from "react";

function TextTruncate({ text, maxLength }) {
  if (text.length <= maxLength) {
    return <span>{text}</span>;
  } else {
    const truncatedText = text.slice(0, maxLength) + "...";
    return <span>{truncatedText}</span>;
  }
}

export default TextTruncate;

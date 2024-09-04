import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import $ from "jquery";

const AutoComplateInput = ({ suggestions, className, inputClassName, inputTitle, onChangeInput }) => {
  const [input, setInput] = useState("");
  const [showSug, setShowSug] = useState(false);


  useEffect(() => {
    if (input === "") return;

    const timer = setTimeout(() => {
      
      onChangeInput(input)
    }, 1000);

    return () => clearTimeout(timer);
  }, [input]);
  $("#auto-complate-input").on("focus", function () {
    setShowSug(true)
    //$("#suggestions").fadeIn(200)
  });
  $("#auto-complate-input").on("blur", function () {
    //$("#suggestions").fadeOut(200)
    setShowSug(false)
  });

  return (
    <div className={`relative ${className}`}>
      <CustomInput
        id={"auto-complate-input"}
        className={`w-full ${inputClassName}`}
        value={input}
        setValue={setInput}
        title={inputTitle}
        type={"text"}></CustomInput>
      <ul id="suggestions" className="absolute w-full bg-white">
        {suggestions && showSug===true &&
          (suggestions.length>0
            ? suggestions.map((sug, index) => {
                return (
                  <li className="hover:bg-slate-500 cursor-pointer">
                    {sug.text} {sug.id}
                  </li>
                );
              })
            : <strong>موردی پیدا نشد</strong>)}
      </ul>
    </div>
  );
};

export default AutoComplateInput;

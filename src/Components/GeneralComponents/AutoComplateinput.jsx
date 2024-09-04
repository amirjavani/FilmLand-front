import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import $ from "jquery";

const AutoComplateInput = ({ id , suggestions, className, inputClassName, inputTitle, onChangeInput }) => {
  const [input, setInput] = useState("");
  const [showSug, setShowSug] = useState(false);


  useEffect(() => {
    if (input === "") return;

    const timer = setTimeout(() => { 
      onChangeInput(input)
    }, 1000);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);
  $(`#auto-complate-input-${id}`).on("focus", function () {
    setShowSug(true)
    //$(`#suggestions-${id}`).fadeIn(200)
  });
  $(`#auto-complate-input-${id}`).on("blur", function () {
    //$(`#suggestions-${id}`).fadeOut(200)
    setShowSug(false)
  });

  return (
    <div className={`relative ${className}`}>
      <CustomInput
        id={`auto-complate-input-${id}`}
        className={`w-full ${inputClassName}`}
        value={input}
        setValue={setInput}
        title={inputTitle}
        type={"text"}></CustomInput>
      <ul id={`suggestions-${id}`} className="absolute w-full bg-white">
        {suggestions && showSug===true &&
          (suggestions.length>0
            ? suggestions.map((sug, index) => {
                return (
                  <li className="hover:bg-slate-500 cursor-pointer">
                    {sug.text}
                  </li>
                );
              })
            : <strong>موردی پیدا نشد</strong>)}
      </ul>
    </div>
  );
};

export default AutoComplateInput;

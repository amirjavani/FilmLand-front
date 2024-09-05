import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import $ from "jquery";

const AutoComplateInput = ({
  id,
  suggestions,
  className,
  inputClassName,
  inputTitle,
  onChangeInput,
  onSelectValue,
}) => {
  const [input, setInput] = useState("");
  const [showSug, setShowSug] = useState(false);

  useEffect(() => {
    if (input === "") return;

    const timer = setTimeout(() => {
      onChangeInput(input);
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  //   $(`#suggestions-${id}`).hide();
  $(`#auto-complate-input-${id}`).on("focus", function () {
    setShowSug(true);
    // $(`#suggestions-${id}`).fadeIn(200)
  });
  $(`#auto-complate-input-${id}`).on("blur", function () {
    setTimeout(() => {
      setShowSug(false);
      // $(`#suggestions-${id}`).fadeOut(200)
    }, 100);
  });

  return (
    <div dir="ltr" className={`relative ${className}`}>
      <CustomInput
        required={false}
        id={`auto-complate-input-${id}`}
        className={`w-full ${inputClassName}`}
        value={input}
        setValue={setInput}
        title={inputTitle}
        type={"text"}></CustomInput>
      <ul
        id={`suggestions-${id}`}
        className="absolute w-full rounded  gap-2 bg-white text-center">
        {suggestions &&
          showSug === true &&
          (suggestions.length > 0 ? (
            suggestions.map((sug, index) => {
              return (
                <li
                  className="hover:bg-slate-700 transition-colors hover:text-white rounded cursor-pointer p-1 "
                  onClick={() => {
                    setInput('')
                    onSelectValue({ id: sug.id, text: sug.text })}}>
                  {sug.text}
                  <hr></hr>
                </li>
              );
            })
          ) : (
            <strong>موردی پیدا نشد</strong>
          ))}
      </ul>
    </div>
  );
};

export default AutoComplateInput;

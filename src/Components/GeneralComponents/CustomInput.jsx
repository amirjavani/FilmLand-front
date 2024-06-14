import React, { useState } from "react";
import style from "./CustomInputStyle.module.css";

function CustomInput({value,setValue,title,type}) {
  const inputType = type;
  return (
    <div className={style.input_group}>
      <input
        required
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        type={inputType}
        className={style.input}
      />
      <label className={style.user_label}>{title}</label>
    </div>
  );
}

export default CustomInput;

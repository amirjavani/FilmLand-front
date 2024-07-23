import style from "./CustomInputStyle.module.css";

function CustomInput({ className, value, setValue, title, type }) {
  const inputType = type;
  return (
    <div className={` ${className} p-1 z-0 `}>
      <div className={`${style.input_group}  w-100`}>
        <input
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={inputType}
          className={`${style.input} w-100`}
        />
        <label className={style.user_label}>{title}</label>
      </div>
    </div>
  );
}

export default CustomInput;

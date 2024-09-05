import style from "./CustomInputStyle.module.css";
import $ from 'jquery'
function CustomInput({ className, value, setValue, title, type,id ,required }) {
  const inputType = type;
  
  if(!required){
    $(`#${id}`).removeAttr('required');
  }
  

  return (
    <div className={` ${className} p-1 z-0 text-nowrap `}>
      <div className={`${style.input_group}  w-100`}>
        <input
          id={id}
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={inputType}
          className={`${style.input} w-100`}
        />
        <label className={style.user_label+' text-[14px] md:text-[16px]'}>{title}</label>
      </div>
    </div>
  );
}

export default CustomInput;

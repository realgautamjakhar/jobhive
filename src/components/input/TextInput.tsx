export const TextInput = ({
  field, // { name, value, onChange, onBlur },
  type = "text",
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: any) => {
  return (
    <div className=" grid gap-2">
      <div className=" grid">
        <label
          htmlFor={props.id}
          className="pb-1 pl-2 text-sm capitalize text-gray-900 dark:text-gray-100"
        >
          {props.title}
        </label>
        <input
          type={type}
          {...field}
          {...props}
          className={`w-full  rounded-md bg-transparent p-2 text-base font-normal text-gray-900  ring-1 ring-accent-100  placeholder:text-gray-400 focus:outline-none focus:outline-1 focus:ring-opacity-50 dark:text-gray-50 dark:ring-opacity-50`}
        />
      </div>
      {touched[field.name] && errors[field.name] && (
        <div className=" text-xs text-red-500">{errors[field.name]}</div>
      )}
    </div>
  );
};

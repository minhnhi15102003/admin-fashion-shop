// 2 cách định nghĩa type trong typescript

// cách 1
interface InputProps {
    // type: string, 
    type: "text" | "number" | "email" | "password" | string,
    placeholder?: string,
    value?: string | number,
    id?: string,
    name?: string,
    className?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    hint?: string,
    success?: boolean,
    error?: boolean,
    disabled?: boolean
}


const InputField = (
    { type, placeholder, name, id, value, className, hint, success, error, disabled, onChange }:
        // cách 2 
        InputProps
    // { type: string, placeholder: string }
) => {
    let inputClass = `h-11 w-full rounded-lg border appwarance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder: text-gray-400 ${className}`
    return (
        <div className="">
            <input
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                value={value}
                className={inputClass}
                disabled={disabled}
                name={name}
                id={id}
            />
            {hint && (
                <p className={`mt-1.5 text-xs
                    ${error
                        ? "text-error-500"
                        : success ? "text-success-500"
                            : "text-gray-500"}`}>
                    {hint}
                </p>
            )}
        </div>

    )
}

export default InputField
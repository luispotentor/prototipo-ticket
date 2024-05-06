import { ChangeEvent } from "react";

interface CheckboxProps {
    name?: string;
    label?: string;
    checked?: boolean;
    handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    classCss?: string;
    errorMessage?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    name = 'checkbox',
    label = 'Checkbox',
    checked = false,
    handleChange,
    classCss = "",
    errorMessage,
}) => {
    return (
        <div className={classCss}>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-primary-600 border-gray-300 rounded-md focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-900 dark:text-white">{label}</span>
            </label>
            <div className="text-sm text-red-500 h-4 pl-1">{errorMessage}</div>
        </div>
    );
};

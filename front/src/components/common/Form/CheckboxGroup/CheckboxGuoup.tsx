import { ValueSelect } from "@/interfaces/ValueSelect";

interface CheckboxGroupProps {
  name?: string;
  label?: string;
  options?: ValueSelect[];
  selectedValues: string[];
  onChange?: (selectedValues: string[]) => void;
  classCss?: string;
  errorMessage?: string;
  disabled?: boolean;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  name = "checkbox-group",
  label = "Label",
  options,
  selectedValues,
  onChange,
  classCss = "",
  errorMessage,
  disabled
}) => {
  const handleCheckboxChange = (value: string) => {
    if (selectedValues){
        const updatedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
        if (onChange) {
            onChange(updatedValues);
        }
    }
    
  };

  return (
    <div className={classCss}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      
        {
          options && options.length > 0 ?
          options.map((option,key) => (
            <div key={key} className=" inline-block">
                <div className="flex items-center mr-2  h-10">
                <input
                    type="checkbox"
                    id={`${name}-${option.value}`}
                    name={name}
                    value={option.value}
                    checked={ (selectedValues && selectedValues.includes(option.value))  }
                    onChange={() => handleCheckboxChange(option.value)}
                    disabled={disabled}
                    className="text-primary-500 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
                <label
                    htmlFor={`${name}-${option.value}`}
                    className="ml-2 text-gray-900 dark:text-white"
                >
                    {option.name}
                </label>
                </div>
            </div>
          ))
          :
          <div>Cargando...</div>
        }
      <div className="text-sm text-red-500 h-4 pl-1">{errorMessage}</div>
    </div>
  );
};

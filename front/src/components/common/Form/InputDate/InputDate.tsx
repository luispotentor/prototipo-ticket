import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  name?: string;
  label?: string;
  value?: string;
  selectedDate?: Date;
  onChange: (date: Date) => void;
  classCss?: string;
  errorMessage?: string;
  disabled?: boolean;
  focusEvent?: ( event: React.FocusEvent<HTMLInputElement>) => void;
}

export const InputDate: React.FC<DatePickerProps> = ({
  name = "datepicker",
  label = "Fecha",
  value = '',
  selectedDate,
  onChange,
  classCss = "",
  errorMessage,
  disabled,
  focusEvent
}) => {
  const handlerFocusEvent = ( event: any ) => {
    if ( focusEvent) {
      focusEvent(event);
    }
  }

  return (
    <div className={classCss}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <DatePicker
        id={name}
        name={name}
        selected={selectedDate}
        onChange={(date:Date) => onChange(date)}
        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        dateFormat="dd/MM/yyyy" // Customize date format if needed
        disabled={disabled}
        onFocus={ (event) => handlerFocusEvent(event) }
      />
      <div className="text-sm text-red-500 h-4 pl-1">{errorMessage}</div>
    </div>
  );
};


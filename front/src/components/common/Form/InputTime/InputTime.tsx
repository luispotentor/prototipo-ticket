import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import 'react-clock/dist/Clock.css';

interface TimePickerProps {
  label: string;
  selectedTime: string;
  onChange: (time: string) => void;
  classCss?: string;
  disabled?: boolean;
}

export const InputTime: React.FC<TimePickerProps> = ({
  label,
  selectedTime,
  onChange,
  classCss = "",
  disabled
}) => {
  return (
    <div className={classCss}>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <TimePicker
        value={selectedTime}
        onChange={(time) => onChange(time as string) }
        format="HH:mm:ss" // Customize time format if needed
        disabled={disabled}
        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        //disableClock // Opcional: Desactiva el reloj para seleccionar minutos
      />
    </div>
  );
};


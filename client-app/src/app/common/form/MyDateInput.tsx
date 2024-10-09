import DatePicker, { DatePickerProps } from 'react-datepicker';
import { useField } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';

//mix and match to make it work 
type Props = {
    label: string;
} & Partial<DatePickerProps>;

export default function MyDateInput(props: Props) {
    const [field, meta, helpers] = useField(props.name!); // useField hook for Formik
    const { setValue } = helpers;

    return (
        <div className='mb-3'>
            <DatePicker
                selected={field.value ? new Date(field.value) : null}  // Convert value to a Date object
                placeholderText={props.label}
                onChange={(date) => setValue(date)}  // Use Formik's setValue to update field
                showTimeSelect={props.showTimeSelect}
                timeCaption={props.timeCaption}
                dateFormat={props.dateFormat}
            />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
}

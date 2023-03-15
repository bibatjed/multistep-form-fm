import {
    FieldValues,
    useController,
    UseControllerProps,
} from 'react-hook-form';

type InputProps = {
    placeholder?: string;
};
export default function Input<T extends FieldValues>(
    props: InputProps & UseControllerProps<T>
) {
    const { placeholder = '' } = props;
    const {
        field,
        fieldState: { error },
    } = useController(props);
    return (
        <div
            className={`${
                error
                    ? 'border-strawberry-red focus-within:border-strawberry-red'
                    : 'border-light-gray focus-within:border-purplish-blue'
            } w-full border-[1px] rounded-md`}
        >
            <input
                {...field}
                className="w-full text-marine-blue p-2 pl-4 outline-none rounded-md text-[15px]  font-ubuntu font-medium placeholder:text-cool-gray"
                placeholder={placeholder}
            />
        </div>
    );
}

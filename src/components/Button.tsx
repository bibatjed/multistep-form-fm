import { ButtonHTMLAttributes } from 'react';
type Button = {
    variant: 'primary' | 'secondary' | 'tertiary';
};
type ButtonProps = Button & ButtonHTMLAttributes<HTMLButtonElement>;
const ButtonOptions: Record<string, string> = {
    primary: 'bg-marine-blue hover:opacity-80 text-white',
    secondary: 'bg-white text-cool-gray hover:text-marine-blue',
};
export default function Button(props: ButtonProps) {
    const { type, form, onClick, children, variant = 'primary' } = props;
    return (
        <button
            className={`${ButtonOptions[variant]} flex items-center justify-center text-sm h-full font-ubuntu p-3 w-full font-bold rounded-sm`}
            type={type}
            form={form}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

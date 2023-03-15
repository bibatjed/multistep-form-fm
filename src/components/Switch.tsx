import { Switch as HSwitch } from '@headlessui/react';
type SwitchProps = {
    enabled: boolean;
};

interface ISwitch extends SwitchProps {
    onChange: () => void;
}
export default function Switch(props: ISwitch) {
    const { enabled, onChange } = props;
    return (
        <HSwitch
            checked={enabled}
            onChange={onChange}
            className={`bg-marine-blue relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span
                aria-hidden="true"
                className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-3 w-3 absolute top-0.5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </HSwitch>
    );
}

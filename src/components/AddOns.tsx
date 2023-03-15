import { ButtonHTMLAttributes } from 'react';
import IconCheck from '../assets/images/icon-checkmark.svg';
type AddOnsProps = {
    price: string;
    planType: 'monthly' | 'yearly';
    description: string;
    selected: boolean;
};
type TypeAddOns = AddOnsProps & ButtonHTMLAttributes<HTMLButtonElement>;
export default function AddOns(props: TypeAddOns) {
    const { price, description, onClick, type, selected, planType, children } =
        props;
    const shorterPlanType = planType === 'yearly' ? 'yr' : 'mo';
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${
                selected
                    ? 'border-purplish-blue bg-magnolia'
                    : 'border-light-gray'
            } flex w-full border-[1px] gap-3  rounded-md p-3 pl-4`}
        >
            <div
                className={`${
                    selected ? 'bg-purplish-blue' : 'bg-white '
                } p-[1px] w-5 h-5 border-[1px] border-light-gray  flex justify-center items-center transition-all ease-in duration-100 self-center`}
            >
                <div className="flex w-5 h-5 items-center justify-center">
                    <img
                        className={`${
                            selected ? 'scale-1' : 'scale-0'
                        } w-full h-full transition-all ease-in duration-100`}
                        src={IconCheck}
                    />
                </div>
            </div>
            <div className="flex w-full ml-2 gap-0.5 items-start font-ubuntu flex-col">
                <span className="text-[0.9rem] font-bold text-marine-blue">
                    {children}
                </span>
                <span className="text-xs text-cool-gray">{description}</span>
            </div>
            {selected && (
                <span className="font-ubuntu text-purplish-blue text-xs self-center font-normal">{`+${price}/${shorterPlanType}`}</span>
            )}
        </button>
    );
}

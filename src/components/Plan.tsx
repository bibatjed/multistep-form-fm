import { ButtonHTMLAttributes } from 'react';
type PlanProps = {
    price: string;
    planType: 'monthly' | 'yearly';
    src: string;
    selected: boolean;
};
type TypePlan = PlanProps & ButtonHTMLAttributes<HTMLButtonElement>;
export default function Plan(props: TypePlan) {
    const { price, src, onClick, selected, type, planType, children } = props;
    const shorterPlanType = planType === 'yearly' ? 'yr' : 'mo';
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
            ${
                selected
                    ? 'border-purplish-blue bg-magnolia'
                    : 'border-light-gray'
            }
            flex w-full border-[1px] gap-3 rounded-md p-3 pl-4`}
        >
            <img className="self-start h-10 w-10" src={src} alt="icon" />
            <div className="flex w-full gap-0.5 items-start font-ubuntu flex-col">
                <span className="text-[0.9rem] font-bold text-marine-blue">
                    {children}
                </span>
                <span className="text-sm text-cool-gray">{`${price}/${shorterPlanType}`}</span>
                {planType === 'yearly' && (
                    <span className="text-xs text-marine-blue">
                        2 months free
                    </span>
                )}
            </div>
        </button>
    );
}

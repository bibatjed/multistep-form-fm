import { SetStateAction } from 'react';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';

type FourthForm = {
    plan: string;
    planType: string;
    planPrice: number;
    addOns: {
        name: string;
        price: number;
    }[];
};

interface IFourthForm extends FourthForm {
    setStepForm: (value: SetStateAction<number>) => void;
}
export default function FourthForm(props: IFourthForm) {
    const onSubmit = () => {
        props.setStepForm((prev) => prev + 1);
    };

    const shorterPlanType = props.planType === 'yearly' ? 'yr' : 'mo';
    const totalPrice =
        props.planPrice +
        props.addOns.reduce((acc, value) => acc + value.price, 0);
    return (
        <form
            id="hook-form-4"
            className="bg-white overflow-y-scroll p-5 py-5 w-full shadow-lg border-2 border-white rounded-md"
            onSubmit={onSubmit}
        >
            <div className="flex flex-col gap-4">
                <div className="w-full flex flex-col gap-2">
                    <h2 className="font-ubuntu text-marine-blue font-bold text-2xl tracking-normal">
                        Finishing up
                    </h2>
                    <p className="font-ubuntu font-normal text-base text-cool-gray">
                        Double-check everything looks OK before confirming.
                    </p>
                </div>
            </div>

            <div className="bg-magnolia p-3 px-5 flex flex-col items-center mt-6 rounded-sm">
                <div className="flex w-full items-center">
                    <div className="flex flex-col items-start justify-center flex-1 gap-0.5">
                        <span className="text-[14px] font-ubuntu text-marine-blue font-bold">
                            {' '}
                            <span>{capitalizeFirstLetter(props.plan)}</span>
                            &#40;
                            <span>{capitalizeFirstLetter(props.planType)}</span>
                            &#41;
                        </span>

                        <button
                            className="underline font-ubuntu text-cool-gray text-[14px]"
                            type="button"
                            onClick={() => props.setStepForm(2)}
                        >
                            Change
                        </button>
                    </div>

                    <span className="font-ubuntu text-marine-blue text-[14px] font-bold">{`+$${props.planPrice}/${shorterPlanType}`}</span>
                </div>

                <span className="h-[0.5px] w-full mt-3 bg-light-gray"></span>

                <div className="flex flex-col justify-start w-full gap-1 mt-3">
                    {props.addOns.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="flex w-full items-center justify-between font-ubuntu"
                            >
                                <span className="text-[15px] text-cool-gray">
                                    {item.name}
                                </span>
                                <span className="font-ubuntu text-[14px] text-marine-blue font-medium">
                                    {`+$${item.price}/${shorterPlanType}`}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="w-full mt-6 px-5 flex font-ubuntu text-[15px]">
                <span className="text-cool-gray flex-1">{`Total (per ${
                    props.planType === 'yearly' ? 'year' : 'month'
                })`}</span>
                <span className="font-ubuntu text-purplish-blue font-bold">{`+$${totalPrice}/${shorterPlanType}`}</span>
            </div>
        </form>
    );
}

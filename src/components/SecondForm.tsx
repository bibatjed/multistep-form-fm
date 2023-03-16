import Switch from './Switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PartialForm } from '../types/formState';
import ArcadeLogo from '../assets/images/icon-arcade.svg';
import AdvancedLogo from '../assets/images/icon-advanced.svg';
import ProLogo from '../assets/images/icon-pro.svg';
import Plan from './Plan';

const input = z.object({
    name: z.string().trim().min(1, { message: 'This field is required.' }),
    type: z.enum(['monthly', 'yearly']),
    price: z.number(),
});

type Input = z.infer<typeof input>;

type SecondFormProps = Input & PartialForm;

type planListType = {
    monthlyPrice: number;
    name: string;
    yearlyPrice: number;
    src: string;
    key: string;
};

const planList: planListType[] = [
    {
        monthlyPrice: 9,
        name: 'Arcade',
        yearlyPrice: 90,
        src: ArcadeLogo,
        key: 'arcade',
    },
    {
        monthlyPrice: 12,
        name: 'Advanced',
        yearlyPrice: 120,
        src: AdvancedLogo,
        key: 'advanced',
    },
    {
        monthlyPrice: 15,
        name: 'Pro',
        yearlyPrice: 150,
        src: ProLogo,
        key: 'pro',
    },
];
export default function SecondForm(props: SecondFormProps) {
    const { setValue, handleSubmit, watch } = useForm<Input>({
        resolver: zodResolver(input),
        values: {
            name: props.name,
            type: props.type,
            price: props.price,
        },
    });

    const planType = watch('type');
    const plan = watch('name');

    const enabled = planType === 'yearly';

    const changePlan = (name: string, price: number) => {
        setValue('name', name);
        setValue('price', price);
    };
    const onSubmit = (data: Input) => {
        props.setState((prev) => {
            return {
                ...prev,
                plan: {
                    ...prev.plan,
                    ...data,
                },
            };
        });
        props.setStepForm((prev) => prev + 1);
    };
    const onChange = () => {
        const planResult = planList.find((item) => item.key === plan);
        const newPrice =
            (planType === 'monthly'
                ? planResult?.yearlyPrice
                : planResult?.monthlyPrice) || 0;
        setValue('type', planType === 'monthly' ? 'yearly' : 'monthly');
        setValue('price', newPrice);
    };
    return (
        <form
            id="hook-form-2"
            className="bg-white overflow-y-scroll p-5 py-5 w-full shadow-lg border-2 border-white rounded-md"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-4">
                <div className="w-full flex flex-col gap-2">
                    <h2 className="font-ubuntu text-marine-blue font-bold text-2xl tracking-normal">
                        Select your plan
                    </h2>
                    <p className="font-ubuntu font-normal text-base text-cool-gray">
                        You have the option of monthly or yearly billing
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-3">
                {planList.map((item, index) => {
                    const price =
                        planType === 'yearly'
                            ? item.yearlyPrice
                            : item.monthlyPrice;
                    const selected = item.name.toLowerCase() === plan;
                    return (
                        <Plan
                            selected={selected}
                            key={index}
                            src={item.src}
                            price={price}
                            planType={planType}
                            type="button"
                            onClick={() =>
                                changePlan(item.name.toLowerCase(), price)
                            }
                        >
                            {item.name}
                        </Plan>
                    );
                })}
            </div>

            <div className="flex flex-row font-ubuntu items-center gap-3 p-3 justify-center mt-4 bg-magnolia">
                <span className="font-bold text-[0.9rem] text-marine-blue">
                    Monthly
                </span>
                <Switch onChange={onChange} enabled={enabled} />

                <span className="font-bold text-[0.9rem] text-cool-gray">
                    Yearly
                </span>
            </div>
        </form>
    );
}

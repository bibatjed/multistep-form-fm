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
    plan: z.string().trim().min(1, { message: 'This field is required.' }),
    planType: z.enum(['monthly', 'yearly']),
});

type Input = z.infer<typeof input>;

type SecondFormProps = Input & PartialForm;

type planListType = {
    monthlyPrice: string;
    name: string;
    yearlyPrice: string;
    src: string;
};

const planList: planListType[] = [
    {
        monthlyPrice: '$9',
        name: 'Arcade',
        yearlyPrice: '$90',
        src: ArcadeLogo,
    },
    {
        monthlyPrice: '$9',
        name: 'Advanced',
        yearlyPrice: '$120',
        src: AdvancedLogo,
    },
    {
        monthlyPrice: '$9',
        name: 'Pro',
        yearlyPrice: '$150',
        src: ProLogo,
    },
];
export default function SecondForm(props: SecondFormProps) {
    const { setValue, handleSubmit, watch } = useForm<Input>({
        resolver: zodResolver(input),
        values: {
            plan: props.plan,
            planType: props.planType,
        },
    });

    const planType = watch('planType');
    const plan = watch('plan');

    const enabled = planType === 'yearly';

    const changePlan = (value: string) => setValue('plan', value);
    const onSubmit = (data: Input) => {
        props.setState((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
        props.setStepForm((prev) => prev + 1);
    };
    const onChange = () => {
        setValue(
            'planType',
            watch('planType') === 'monthly' ? 'yearly' : 'monthly'
        );
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
                            onClick={() => changePlan(item.name.toLowerCase())}
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

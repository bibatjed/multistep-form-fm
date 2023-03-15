import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PartialForm } from '../types/formState';
import AddOns from './AddOns';
const input = z.object({
    onlineService: z.boolean(),
    largerStorage: z.boolean(),
    customizableProfile: z.boolean(),
});
type Input = z.infer<typeof input>;

type AddOnsType = {
    name: string;
    monthlyPrice: string;
    yearlyPrice: string;
    description: string;
    key: 'onlineService' | 'largerStorage' | 'customizableProfile';
};
const addOns: AddOnsType[] = [
    {
        monthlyPrice: '$1',
        name: 'Online service',
        yearlyPrice: '$10',
        description: 'Access to multiplayer games',
        key: 'onlineService',
    },
    {
        monthlyPrice: '$2',
        name: 'Larger storage',
        yearlyPrice: '$20',
        description: 'Extra 1TB of cloud save',
        key: 'largerStorage',
    },
    {
        monthlyPrice: '$2',
        name: 'Customizable profile',
        yearlyPrice: '$20',
        description: 'Custom theme on your profile',
        key: 'customizableProfile',
    },
];
type ThirdFormProps = Input & PartialForm & { planType: 'monthly' | 'yearly' };
export default function ThirdForm(props: ThirdFormProps) {
    const { setValue, handleSubmit, watch } = useForm<Input>({
        resolver: zodResolver(input),
        values: {
            onlineService: props.onlineService,
            largerStorage: props.largerStorage,
            customizableProfile: props.customizableProfile,
        },
    });

    const formValue = watch();

    console.log(formValue);

    const onSubmit = (data: Input) => {
        props.setState((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
        props.setStepForm((prev) => prev + 1);
    };

    return (
        <form
            id="hook-form-3"
            className="bg-white overflow-y-scroll p-5 py-5 w-full shadow-lg border-2 border-white rounded-md"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-4">
                <div className="w-full flex flex-col gap-2">
                    <h2 className="font-ubuntu text-marine-blue font-bold text-2xl tracking-normal">
                        Pick add-ons
                    </h2>
                    <p className="font-ubuntu font-normal text-base text-cool-gray">
                        Add-ons help enhance your gaming experience.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {addOns.map((item) => {
                    const price =
                        props.planType === 'yearly'
                            ? item.yearlyPrice
                            : item.monthlyPrice;
                    return (
                        <AddOns
                            price={price}
                            description={item.description}
                            type="button"
                            selected={formValue[item.key]}
                            onClick={() =>
                                setValue(item.key, !formValue[item.key])
                            }
                            planType={props.planType}
                        >
                            {item.name}
                        </AddOns>
                    );
                })}
            </div>
            {/* <AddOns
                price="$10"
                description="
                type="button"
                selected={onlineService}
                onClick={() => setValue('onlineService', !onlineService)}
                planType={props.planType}
            >
            </AddOns>

            <button
                type="button"
                onClick={() => setValue('onlineService', !onlineService)}
            >
                Online Service
            </button>

            <button
                type="button"
                onClick={() => setValue('largerStorage', !largerStorage)}
            >
                Large Storage
            </button>
            <button
                type="button"
                onClick={() =>
                    setValue('customizableProfile', !customizableProfile)
                }
            >
                Customizable Profile
            </button> */}
        </form>
    );
}

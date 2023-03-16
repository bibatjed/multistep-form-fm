import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PartialForm } from '../types/formState';
import AddOns from './AddOns';
const input = z.object({
    addOns: z.array(
        z.object({
            price: z.number(),
            name: z.string(),
        })
    ),
});
type Input = z.infer<typeof input>;

type AddOnsType = {
    name: string;
    monthlyPrice: number;
    yearlyPrice: number;
    description: string;
    key: 'onlineService' | 'largerStorage' | 'customizableProfile';
    order: number;
};
const addOnItems: AddOnsType[] = [
    {
        monthlyPrice: 1,
        name: 'Online service',
        yearlyPrice: 10,
        description: 'Access to multiplayer games',
        key: 'onlineService',
        order: 0,
    },
    {
        monthlyPrice: 2,
        name: 'Larger storage',
        yearlyPrice: 20,
        description: 'Extra 1TB of cloud save',
        key: 'largerStorage',
        order: 1,
    },
    {
        monthlyPrice: 2,
        name: 'Customizable profile',
        yearlyPrice: 20,
        description: 'Custom theme on your profile',
        key: 'customizableProfile',
        order: 2,
    },
];
type ThirdFormProps = Input & PartialForm & { planType: 'monthly' | 'yearly' };
export default function ThirdForm(props: ThirdFormProps) {
    const { setValue, handleSubmit, watch } = useForm<Input>({
        resolver: zodResolver(input),
        values: {
            addOns: props.addOns,
        },
    });

    const addOns = watch('addOns');

    const onClick = (name: string, price: number, order: number) => {
        const addOnsResult = addOns.findIndex(
            (item) => item.name.toLowerCase() === name.toLowerCase()
        );
        const newAddOns = [...addOns];
        if (addOnsResult >= 0) {
            newAddOns.splice(addOnsResult, 1);
        } else {
            newAddOns.splice(order, 0, { name, price });
        }

        setValue('addOns', [...newAddOns]);
    };

    const onSubmit = (data: Input) => {
        props.setState((prev) => {
            return {
                ...prev,
                addOns: [...data.addOns],
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
                {addOnItems.map((item) => {
                    const price =
                        props.planType === 'yearly'
                            ? item.yearlyPrice
                            : item.monthlyPrice;

                    const selected = addOns.find(
                        (addOnItem) =>
                            addOnItem.name.toLowerCase() ===
                            item.name.toLowerCase()
                    )
                        ? true
                        : false;

                    return (
                        <AddOns
                            price={price}
                            description={item.description}
                            type="button"
                            selected={selected}
                            onClick={() =>
                                onClick(item.name, price, item.order)
                            }
                            planType={props.planType}
                        >
                            {item.name}
                        </AddOns>
                    );
                })}
            </div>
        </form>
    );
}

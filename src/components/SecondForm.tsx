import { Switch } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PartialForm } from '../types/formState';

const input = z.object({
    plan: z.string().trim().min(1, { message: 'This field is required.' }),
    planType: z.enum(['monthly', 'yearly']),
});

type Input = z.infer<typeof input>;

type SecondFormProps = Input & PartialForm;

export default function SecondForm(props: SecondFormProps) {
    const { register, setValue, handleSubmit, watch } = useForm<Input>({
        resolver: zodResolver(input),
        values: {
            plan: props.plan,
            planType: props.planType,
        },
    });

    const enabled = watch('planType') === 'yearly';

    const changePlan = (value: string) => setValue('plan', value);
    const onSubmit = (data: Input) => {
        console.log('clicked');
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Select your plan</h2>
            <p>You have the option of monthly or yearly billing</p>

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() =>
                        setValue('plan', 'arcade', { shouldDirty: true })
                    }
                >
                    Arcade
                </button>
                <button type="button" onClick={() => changePlan('advanced')}>
                    Advanced
                </button>

                <button type="button" onClick={() => changePlan('pro')}>
                    Pro
                </button>
            </div>

            <div className="py-16">
                <span>Monthly</span>
                <Switch
                    checked={enabled}
                    onChange={onChange}
                    className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                    <span
                        aria-hidden="true"
                        className={`${
                            enabled ? 'translate-x-9' : 'translate-x-0'
                        }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>

                <span>Yearly</span>
            </div>
            <button
                type="button"
                onClick={() => props.setStepForm((prev) => prev - 1)}
            >
                Back
            </button>
            <button type="submit">Next Step</button>
        </form>
    );
}

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { PartialForm } from '../types/formState';
import Input from './Input';
const input = z.object({
    name: z.string().trim().min(1, { message: 'This field is required.' }),
    emailAddress: z
        .string()
        .min(1, { message: 'This field is required.' })
        .email({
            message: 'Invalid email address.',
        }),
    phoneNumber: z
        .string()
        .min(1, { message: 'This field is required.' })
        .regex(/^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
            message: 'Invalid Phone Number.',
        }),
});

export type FirstFormInput = z.infer<typeof input>;

type FirstFormProps = FirstFormInput & PartialForm;

export default function FirstForm(props: FirstFormProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FirstFormInput>({
        resolver: zodResolver(input),
        values: {
            name: props.name,
            emailAddress: props.emailAddress,
            phoneNumber: props.phoneNumber,
        },
    });
    const onSubmit = (data: FirstFormInput) => {
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
            id="hook-form-1"
            className="bg-white p-5 py-7 w-full shadow-lg lg:shadow-none border-2 border-white rounded-md"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-4">
                <div className="w-full flex flex-col gap-2">
                    <h2 className="font-ubuntu text-marine-blue font-bold text-2xl tracking-normal">
                        Personal Info
                    </h2>
                    <p className="font-ubuntu font-normal text-base text-cool-gray">
                        Please provide your name, email address, and phone
                        number.
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    {/* Name */}
                    <div className="flex flex-col gap-x-0.5">
                        <div className="flex flex-row justify-between font-ubuntu">
                            <label className="text-[14px] text-marine-blue ">
                                Name
                            </label>
                            {errors.name && (
                                <span className="text-[13px] text-strawberry-red  font-bold ">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>
                        <Input
                            control={control}
                            name="name"
                            placeholder="e.g. Stephen King"
                        />
                        {/* <input {...register('name')} /> */}
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-0.5 ">
                        <div className="flex flex-row justify-between font-ubuntu">
                            <label className="text-[14px] text-marine-blue ">
                                Email Address
                            </label>
                            {errors.emailAddress && (
                                <span className="text-[13px] text-strawberry-red font-bold">
                                    {errors.emailAddress.message}
                                </span>
                            )}
                        </div>
                        <Input
                            control={control}
                            name="emailAddress"
                            placeholder="e.g. stephenking@lorem.com"
                        />
                        {/* <input {...register('emailAddress')} /> */}
                    </div>
                    {/* Phone Number  */}
                    <div className="flex flex-col gap-0.5">
                        <div className="flex flex-row justify-between font-ubuntu">
                            <label className="text-[14px] text-marine-blue">
                                Phone number
                            </label>
                            {errors.phoneNumber && (
                                <span className="text-[13px] text-strawberry-red font-bold">
                                    {errors.phoneNumber.message}
                                </span>
                            )}
                        </div>
                        <Input
                            control={control}
                            name="phoneNumber"
                            placeholder="e.g. +1 234 567"
                        />
                        {/* <input {...register('phoneNumber')} /> */}
                    </div>
                </div>
            </div>
        </form>
    );
}

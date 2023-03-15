import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { FormState, PartialForm } from '../types/formState'
const input = z.object({
    name: z.string().trim().min(1, { message: 'This field is required.' }),
    emailAddress: z
        .string()
        .min(1, { message: 'This field is required' })
        .email({
            message: 'Invalid email address',
        }),
    phoneNumber: z
        .string()
        .min(1, { message: 'This field is required.' })
        .regex(/^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
            message: 'Invalid Phone Number',
        }),
})

type Input = z.infer<typeof input>

type FirstFormProps = Input & PartialForm

export default function FirstForm(props: FirstFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Input>({
        resolver: zodResolver(input),
        values: {
            name: props.name,
            emailAddress: props.emailAddress,
            phoneNumber: props.phoneNumber,
        },
    })
    const onSubmit = (data: Input) => {
        props.setState((prev) => {
            return {
                ...prev,
                ...data,
            }
        })
        props.setStepForm((prev) => prev + 1)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2>Personal Info</h2>
                <p>Please provide your name, email address, and phone number</p>

                <div>
                    {/* Name */}
                    <div>
                        <label>Name</label>
                        {errors.name && <span>{errors.name.message}</span>}
                        <input {...register('name')} />
                    </div>

                    {/* Email Address */}
                    <div>
                        <label>Email Address</label>
                        {errors.emailAddress && (
                            <span>{errors.emailAddress.message}</span>
                        )}
                        <input {...register('emailAddress')} />
                    </div>
                    {/* Phone Number  */}
                    <div>
                        <label>Phone number</label>
                        {errors.phoneNumber && (
                            <span>{errors.phoneNumber.message}</span>
                        )}
                        <input {...register('phoneNumber')} />
                    </div>
                </div>
            </div>
            <button type="submit">Next Step</button>
        </form>
    )
}

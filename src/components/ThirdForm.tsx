import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PartialForm } from '../types/formState';
const input = z.object({
    onlineService: z.boolean(),
    largerStorage: z.boolean(),
    customizableProfile: z.boolean(),
});
type Input = z.infer<typeof input>;

type ThirdFormProps = Input & PartialForm;
export default function ThirdForm(props: ThirdFormProps) {
    const { register, setValue, handleSubmit, watch } = useForm<Input>({
        resolver: zodResolver(input),
        values: {
            onlineService: props.onlineService,
            largerStorage: props.largerStorage,
            customizableProfile: props.customizableProfile,
        },
    });

    const [onlineService, largerStorage, customizableProfile] = watch([
        'onlineService',
        'largerStorage',
        'customizableProfile',
    ]);

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Pick add-ons</h2>
            <p>Add-ons help enhance your gaming experience.</p>

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
            </button>
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

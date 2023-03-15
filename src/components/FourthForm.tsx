import { SetStateAction } from 'react';

type FourthForm = {
    plan: string;
    planType: string;
    onlineService: boolean;
    largerStorage: boolean;
    customizableProfile: boolean;
};

interface IFourthForm extends FourthForm {
    setStepForm: (value: SetStateAction<number>) => void;
}
export default function FourthForm(props: IFourthForm) {
    const onSubmit = () => {
        props.setStepForm((prev) => prev + 1);
    };
    return (
        <form onSubmit={onSubmit}>
            <h2>Finishing up</h2>
            <p>Double-check everything looks OK before confirming</p>

            {`${props.plan}(${props.planType})`}
            <button type="button" onClick={() => props.setStepForm(2)}>
                change
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

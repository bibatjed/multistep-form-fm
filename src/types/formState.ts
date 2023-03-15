import { SetStateAction } from "react";

export type FormState = {
    name: string;
    emailAddress: string;
    phoneNumber: string;
    plan: string;
    planType: 'monthly' | 'yearly'
    onlineService: boolean;
    largerStorage: boolean;
    customizableProfile: boolean;
}

export interface PartialForm {
    setStepForm: (e: SetStateAction<number>) => void
    setState: (e: SetStateAction<FormState>) => void
}
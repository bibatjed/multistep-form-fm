import { SetStateAction } from "react";
import AddOns from "../components/AddOns";

type Plan = {
    name: string;
    type: 'monthly' | 'yearly';
    price: number;
}

type AddOns = {
    price: number;
    name: string;
}

export type FormState = {
    name: string;
    emailAddress: string;
    phoneNumber: string;
    plan: Plan
    addOns: Array<AddOns>
}

export interface PartialForm {
    setStepForm: (e: SetStateAction<number>) => void
    setState: (e: SetStateAction<FormState>) => void
}
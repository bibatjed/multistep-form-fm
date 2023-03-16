import FirstForm from './components/FirstForm';
import SecondForm from './components/SecondForm';
import { useState } from 'react';
import type { FormState } from './types/formState';
import ThirdForm from './components/ThirdForm';
import FourthForm from './components/FourthForm';
import ThankYou from './components/ThankYou';
import SideBar from './components/Sidebar';
import Button from './components/Button';
const initialState: FormState = {
    name: '',
    emailAddress: '',
    phoneNumber: '',
    plan: {
        name: 'arcade',
        type: 'monthly',
        price: 9,
    },
    addOns: [],
};
function App() {
    const [stepForm, setStepForm] = useState(1);
    const [state, setState] = useState<FormState>(initialState);

    return (
        <div className="relative h-screen overflow-hidden lg:flex lg:justify-center lg:items-center  bg-magnolia">
            <div className="flex lg:flex-row lg:bg-white lg:w-full lg:max-w-4xl lg:border-2 lg:border-white lg:rounded-md lg:p-3 lg:min-h-[510px] lg:items-stretch lg:shadow-lg">
                <SideBar step={stepForm} />
                <div className="w-[90%] absolute flex flex-col left-1/2 -translate-x-1/2 justify-between h-[calc(100%_-_100px)] top-[6.2rem] lg:relative lg:h-auto lg:-translate-x-0 lg:left-0 lg:top-0 lg:w-full lg:px-10">
                    {stepForm === 1 && (
                        <FirstForm
                            setState={setState}
                            setStepForm={setStepForm}
                            {...state}
                        />
                    )}
                    {stepForm === 2 && (
                        <SecondForm
                            setState={setState}
                            setStepForm={setStepForm}
                            {...state.plan}
                        />
                    )}
                    {stepForm === 3 && (
                        <ThirdForm
                            setState={setState}
                            setStepForm={setStepForm}
                            planType={state.plan.type}
                            addOns={state.addOns}
                        />
                    )}
                    {stepForm === 4 && (
                        <FourthForm
                            planPrice={state.plan.price}
                            plan={state.plan.name}
                            planType={state.plan.type}
                            addOns={state.addOns}
                            setStepForm={setStepForm}
                        />
                    )}

                    {stepForm === 5 && <ThankYou />}

                    {stepForm !== 5 && (
                        <div className="w-screen lg:w-full lg:-translate-x-0 lg:self-end flex self-start items-center -translate-x-5 sm:-translate-x-10 bg-white h-16">
                            {stepForm > 1 && (
                                <div className="w-24 h-10 lg:w-28 lg:h-11 ml-3">
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        onClick={() =>
                                            setStepForm((prev) => prev - 1)
                                        }
                                    >
                                        Go back
                                    </Button>
                                </div>
                            )}
                            {stepForm !== 5 && (
                                <div className="w-24 h-10 lg:w-28 lg:h-11 mr-4 fixed right-0">
                                    <Button
                                        variant={
                                            stepForm !== 4
                                                ? 'primary'
                                                : 'tertiary'
                                        }
                                        type="submit"
                                        form={`hook-form-${stepForm}`}
                                    >
                                        {stepForm !== 4
                                            ? 'Next Step'
                                            : 'Confirm'}
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;

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
    plan: 'arcade',
    planType: 'monthly',
    onlineService: false,
    largerStorage: false,
    customizableProfile: false,
};
function App() {
    const [stepForm, setStepForm] = useState(1);
    const [state, setState] = useState<FormState>(initialState);
    console.log(state);

    return (
        <div className="relative h-screen overflow-hidden bg-magnolia">
            {/* Steps */}
            <SideBar step={stepForm} />
            <div className="w-[90%] absolute flex flex-col left-1/2 -translate-x-1/2 justify-between h-[calc(100%_-_100px)] top-[6.2rem]">
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
                        {...state}
                    />
                )}
                {stepForm === 3 && (
                    <ThirdForm
                        setState={setState}
                        setStepForm={setStepForm}
                        {...state}
                    />
                )}
                {stepForm === 4 && (
                    <FourthForm setStepForm={setStepForm} {...state} />
                )}

                {stepForm === 5 && <ThankYou />}
                <div className="w-screen flex self-start -translate-x-5 items-center bg-white h-16">
                    {stepForm > 1 && (
                        <div className="w-24 h-10 ml-3">
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => setStepForm((prev) => prev - 1)}
                                form={`hook-form-${stepForm}`}
                            >
                                Go back
                            </Button>
                        </div>
                    )}
                    <div className="w-24 h-10 mr-4 fixed right-0">
                        <Button
                            variant="primary"
                            type="submit"
                            form={`hook-form-${stepForm}`}
                        >
                            Next Step
                        </Button>
                    </div>
                </div>
            </div>

            {/* <div className="w-screen lg:hidden fixed bottom-0 flex justify-end items-center  bg-white h-16">
                <div className="w-24 h-10 mr-4">
                    <Button
                        variant="primary"
                        type="submit"
                        form={`hook-form-${stepForm}`}
                    >
                        Next Step
                    </Button>
                </div>
            </div> */}
        </div>
    );
}

export default App;

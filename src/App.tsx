import FirstForm from './components/FirstForm';
import SecondForm from './components/SecondForm';
import { useState } from 'react';
import type { FormState } from './types/formState';
import ThirdForm from './components/ThirdForm';
import FourthForm from './components/FourthForm';
import ThankYou from './components/ThankYou';
import SideBar from './components/Sidebar';
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

    return (
        <div className="h-screen">
            {/* Steps */}
            <SideBar />
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
        </div>
    );
}

export default App;

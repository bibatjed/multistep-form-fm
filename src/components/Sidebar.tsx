function Item(props: { step: string; active?: boolean }) {
    const { step, active = false } = props;
    return (
        <div className="w-auto h-auto">
            <div
                className={`${
                    active
                        ? 'bg-light-blue text-marine-blue border-light-blue'
                        : 'border-white'
                } w-9 h-9  border-2 flex justify-center text-sm font-bold items-center  rounded-full font-ubuntu text-white`}
            >
                {step}{' '}
            </div>
        </div>
    );
}
const Step: { step: number; name: string }[] = [
    {
        name: 'Your Info',
        step: 1,
    },
    {
        name: 'Select Plan',
        step: 2,
    },
    {
        name: 'Add-Ons',
        step: 3,
    },
    {
        name: 'Summary',
        step: 4,
    },
];

export default function SideBar(props: { step: number }) {
    const { step = 1 } = props;
    return (
        <div className="w-full lg:w-[319px] bg-mobile-sidebar bg-cover bg-no-repeat h-[172px] flex lg:h-auto lg:bg-desktop-sidebar lg:bg-cover lg:justify-start lg:items-start lg:rounded-lg ">
            <div className="flex gap-4 lg:mx-0 mx-auto mt-8 lg:flex-col lg:px-5 lg:gap-6">
                {Step.map((item) => {
                    return (
                        <div
                            key={item.name}
                            className="lg:flex lg:flex-row lg:items-center lg:gap-4"
                        >
                            <Item
                                step={item.step.toString()}
                                active={
                                    item.step === step ||
                                    (step === Step.length + 1 &&
                                        item.step === Step.at(-1)?.step)
                                }
                            />

                            <div className="flex flex-col">
                                <span className="hidden lg:inline text-[12px] font-ubuntu font-medium text-cool-gray">{`STEP ${item.step}`}</span>
                                <span className="hidden lg:inline text-sm font-ubuntu font-bold text-white uppercase">
                                    {item.name}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

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
const Step = [1, 2, 3, 4];
export default function SideBar(props: { step: number }) {
    const { step = 1 } = props;
    return (
        <div className="w-full bg-mobile-sidebar bg-cover bg-no-repeat h-[172px] flex">
            <div className="flex gap-4 mx-auto mt-8">
                {Step.map((value) => {
                    return (
                        <Item
                            key={value}
                            step={value.toString()}
                            active={value === step}
                        />
                    );
                })}
            </div>
        </div>
    );
}

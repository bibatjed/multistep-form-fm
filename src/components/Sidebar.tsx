function Item(props: { step: string }) {
    return (
        <div className="w-auto h-auto">
            <div className="w-10 h-10 border-2 flex justify-center items-center">
                {props.step}{' '}
            </div>
        </div>
    );
}
export default function SideBar() {
    return (
        <div className="w-full bg-mobile-sidebar bg-contain bg-no-repeat h-[172px]">
            <Item step="1" />
        </div>
    );
}

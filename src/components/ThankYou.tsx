import ThankYouLogo from '../assets/images/icon-thank-you.svg';
export default function ThankYou() {
    return (
        <div className="flex flex-col items-center bg-white overflow-y-scroll px-7 py-5 w-full shadow-lg border-2 border-white rounded-md gap-3">
            <img className="h-12 w-12 mt-9" src={ThankYouLogo} alt="icon" />
            <span className="text-2xl font-ubuntu font-bold text-marine-blue">
                Thank You!
            </span>
            <p className="font-ubuntu text-cool-gray text-center text-[15px] mb-11">
                Thank you! Thanks for confirming your subscription! We hope you
                have fun using our platform. If you ever need support, please
                feel free to email us at support@loremgaming.com
            </p>
        </div>
    );
}

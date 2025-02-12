import { useState } from "react";
import Modal from "./Modal";

const Banner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <section className="banner min-h-screen">
            <div>
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white p-4">
                    <div className="bg-black/30 backdrop-blur-md p-6 rounded-lg max-w-4xl space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            Earn Rewards by Referring Friends!
                        </h1>
                        <p className="text-base md:text-xl md:w-full mx-auto">
                            Share the benefits and get rewarded! Invite your friends to join, and for every successful referral, you’ll earn exciting rewards. The more you refer, the more you earn!
                        </p>
                        <button onClick={() => setIsModalOpen(true)}
                            className="bg-blue-700 px-4 py-2 rounded-md text-white  font-medium cursor-pointer"
                        >
                            Refer Now
                        </button>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    )
}
export default Banner
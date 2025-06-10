import locationIcon from "assets/dashboard/location-icon.svg";

function ActivityBox() {
    return (
        <div className="min-w-[340px] max-w-[500px] grow bg-[#F9F9FA] p-6 rounded-[20px] m-auto xl:m-0">
            <h3 className="text-xl font-semibold mb-3">New Activity</h3>
            <div className="flex flex-col gap-4">
                <div className="text-primary-gray px-4 pt-3 pb-2 bg-[#b0b3bd] bg-opacity-10 rounded-[10px]">
                    <p className="text-lg font-semibold text-black flex items-center gap-1">
                        <span className="inline-block w-3 h-3 rounded-full bg-primary-red"></span>{" "}
                        Bonding Noel
                    </p>
                    <p className="px-[18px] text-sm">Offline</p>
                    <p className="px-[18px] text-sm">06:00 pm</p>
                    <div className="flex justify-between mt-1">
                        <p className="text-sm flex gap-1">
                            <img src={locationIcon} alt="" />
                            2nd floor Alumni
                        </p>
                        <p className="text-sm">26 December 2023</p>
                    </div>
                </div>
                <div className="text-primary-gray px-4 pt-3 pb-2 bg-[#b0b3bd] bg-opacity-10 rounded-[10px]">
                    <p className="text-lg font-semibold text-black flex items-center gap-1">
                        <span className="inline-block w-3 h-3 rounded-full bg-primary-red"></span>{" "}
                        Bonding Noel
                    </p>
                    <p className="px-[18px] text-sm">Offline</p>
                    <p className="px-[18px] text-sm">06:00 pm</p>
                    <div className="flex justify-between mt-1">
                        <p className="text-sm flex gap-1">
                            <img src={locationIcon} alt="" />
                            2nd floor Alumni
                        </p>
                        <p className="text-sm">26 December 2023</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActivityBox;

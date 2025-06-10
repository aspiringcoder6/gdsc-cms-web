export default function Header() {
    return (
        <div className="header grid grid-cols-12 font-semibold text-primary-gray bg-white mb-4 text-sm sm:text-md md:text-lg">
            <div className="col-span-1 py-4 pl-4 text-left hidden sm:block">
                <p>#</p>
            </div>
            <div className="col-span-5 sm:col-span-4 border-r border-[#F7F9FD] py-4 text-left pl-4 sm:pl-0">
                <p>Task Name</p>
            </div>
            <div className="col-span-2 py-4 border-r border-[#F7F9FD] flex justify-center">
                <p>Status</p>
            </div>
            <div className="col-span-3 py-4 border-r border-[#F7F9FD]">
                <p>Task Assigner</p>
            </div>
            <div className="col-span-2 py-4 sm:pr-4">
                <p>Due Date</p>
            </div>
        </div>
    );
}

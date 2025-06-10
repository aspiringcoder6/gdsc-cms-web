import projectIcon from "assets/dashboard/project-icon.svg";

function ProjectItem({ name, progressPct, deadline }) {
    return (
        <div className="max-w-[250px]">
            <div className="flex items-center gap-2">
                <img src={projectIcon} alt="project" />
                <div>
                    <h3 className="font-semibold text-lg leading-5 w-[160px]">
                        {name}
                    </h3>
                    <p className="text-primary-gray">Developer/ web</p>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                        className="h-1 rounded-full"
                        style={{
                            width: `${progressPct}%`,
                            backgroundColor:
                                progressPct > 50 ? "#00A050" : "#FE2B25",
                        }}
                    ></div>
                </div>
                <p
                    className="text-xs"
                    style={{
                        color: progressPct > 50 ? "#00A050" : "#FE2B25",
                    }}
                >
                    {progressPct}%
                </p>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="flex">
                    <div className="w-5 h-5 rounded-full bg-primary-red border border-black"></div>
                    <div className="w-5 h-5 rounded-full bg-primary-green border border-black -ml-1"></div>
                    <div className="w-5 h-5 rounded-full bg-primary-yellow border border-black -ml-1"></div>
                </div>
                <span className="text-primary-red bg-primary-red bg-opacity-10 rounded-md px-2 py-1 text-xs">
                    {deadline} days left
                </span>
            </div>
        </div>
    );
}

export default ProjectItem;

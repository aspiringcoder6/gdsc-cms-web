import ProjectItem from "./subcomponents/ProjectItem";

const Project = () => {
    return (
        <div className="text-left w-full mt-10">
            <h2 className="text-2xl font-semibold">Project</h2>
            <div className="flex gap-10 lg:gap-20 mt-10 overflow-x-auto scrollbar-x justify-start xl:justify-center">
                <ProjectItem name={"Web CLB"} progressPct={82} deadline={3} />
                <ProjectItem
                    name={"gdsc-url-shortener"}
                    progressPct={42}
                    deadline={5}
                />
                <ProjectItem
                    name={"gdsc-mail-tool"}
                    progressPct={82}
                    deadline={3}
                />
            </div>
        </div>
    );
};

export default Project;

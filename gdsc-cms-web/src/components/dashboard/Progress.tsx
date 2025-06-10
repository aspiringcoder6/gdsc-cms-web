import ActivityBox from "./subcomponents/ActivityBox";
import CircularProgress from "./subcomponents/CircularProgress";
import { Carousel } from "flowbite-react";
import MyCalendar from "layouts/panel-content/right/Calendar";

const Progress = () => {
    return (
        <div className="text-left w-full">
            <h2 className="text-2xl font-semibold text-center lg:text-left">
                Overall Progress
            </h2>
            <div className="hidden xl:flex items-center gap-4 pr-4 xl:pr-20 xl:gap-20 pl-4 justify-center">
                <CircularProgress percentage={65} color="#1F87FC" />
                <ActivityBox />
            </div>
            <Carousel
                leftControl={<></>}
                rightControl={<></>}
                slide={false}
                indicators={false}
                className="xl:hidden pt-4 "
            >
                <div className="flex justify-center items-center">
                    <CircularProgress percentage={65} color="#1F87FC" />
                </div>
                <div className="xl:hidden">
                    <MyCalendar />
                </div>
                <ActivityBox />
            </Carousel>
        </div>
    );
};

export default Progress;

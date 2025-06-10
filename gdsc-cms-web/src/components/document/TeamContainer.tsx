import devBg from "assets/documentation/dev-bg.svg";
// import innoBg from "assets/documentation/inno-bg.svg";
import mediaBg from "assets/documentation/media-bg.svg";
import eventBg from "assets/documentation/event-bg.svg";
// import prBg from "assets/documentation/pr-bg.svg";
// import hrBg from "assets/documentation/hr-bg.svg";

import TeamItem from "./TeamItem";

function TeamContainer() {
    return (
        <div className="text-left w-full grid grid-rows-1 grid-flow-col gap-x-8 gap-y-10 max-w-4xl m-auto py-8">
            <TeamItem
                imgSrc={devBg}
                name="Developer"
                href="/documentation/team/developer"
            />
            {/* <TeamItem imgSrc={innoBg} name="Innovation" /> */}
            <TeamItem
                imgSrc={mediaBg}
                name="Media"
                href="/documentation/team/media"
            />
            <TeamItem
                imgSrc={eventBg}
                name="Event-PR-HR"
                href="/documentation/team/event"
            />
            {/* <TeamItem imgSrc={prBg} name="PR" />
            <TeamItem imgSrc={hrBg} name="HR" /> */}
        </div>
    );
}

export default TeamContainer;

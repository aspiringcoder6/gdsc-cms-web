import { formatFirebaseDate, formatDateString } from "utils/date";

export default function Comment({ data }) {
    const default_img =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfrX_kQ0Yux9U3yydEcsUDKdn2qJeoRia2FfeLkzoHMA&s";

    const userInfo = data.user;
    let date = formatFirebaseDate(
        data.createdDate.seconds,
        data.createdDate.nanoseconds
    );
    date = formatDateString(date);

    return (
        <div className="comment flex gap-2 items-start py-2">
            <img
                src={userInfo.photoURL ? userInfo.photoURL : default_img}
                alt="user avatar"
                className="w-10 h-10 object-cover rounded-full"
            />

            <div className="w-full">
                <div className="header flex gap-2 items-center py-2">
                    <p className="font-semibold text-[#172B4D]">
                        {userInfo.displayName}
                    </p>
                    <p className=" text-[#44546F] text-[12px]">{date}</p>
                </div>

                <p className="text-md text-[#44546F] font-semibold p-2.5 border border-gray-300 rounded-lg bg-gray-50 w-full">
                    {data.content}
                </p>
            </div>
        </div>
    );
}

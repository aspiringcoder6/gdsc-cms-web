import { Link } from "react-router-dom";

function TeamItem({ imgSrc, name, href }) {
    return (
        <Link
            to={href}
            className="bg-[#f7f7f8] py-5 px-4 rounded-3xl hover:bg-secondary-gray"
        >
            <img src={imgSrc} alt={name} className="w-full" />
            <p className="font-semibold text-center mt-2">{name}</p>
        </Link>
    );
}

export default TeamItem;

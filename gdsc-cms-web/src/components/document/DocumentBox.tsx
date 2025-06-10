import IDocument from "model/document";
import { Link } from "react-router-dom";

function DocumentBox({
    color,
    name,
    data,
}: {
    color: string;
    name: string;
    data: IDocument[];
}) {
    return (
        <div className="w-full">
            <h2
                className="text-center font-semibold text-lg py-1 rounded-md"
                style={{
                    color: `rgba(${color})`,
                    backgroundColor: `rgba(${color}, 0.1)`,
                }}
            >
                {name}
            </h2>
            <div className="mt-4 flex flex-col gap-2">
                {data.map((doc) => {
                    return (
                        <Link
                            to={"/documentation/" + doc.slug}
                            className="text-center hover:text-primary-blue hover:bg-primary-blue hover:bg-opacity-10"
                            key={doc.id}
                        >
                            {doc.title}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default DocumentBox;

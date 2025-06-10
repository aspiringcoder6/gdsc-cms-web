import { useParams } from "react-router-dom";
import DocumentBox from "./DocumentBox";
import ConstantText from "utils/ConstantText";
import { useAppSelector } from "redux/hooks";
import IDocument from "model/document";

function DocumentContainer() {
    const { teamId } = useParams();
    const teamItem = useAppSelector((state) => state.documentation[teamId]);
    const color = [
        ConstantText.BLUE_RGB,
        ConstantText.RED_RGB,
        ConstantText.GREEN_RGB,
        ConstantText.YELLOW_RGB,
    ];
    return (
        <div className="text-left w-full grid grid-cols-2 grid-flow-row gap-x-8 gap-y-10 max-w-4xl m-auto py-8">
            {Object.entries(teamItem)?.map((item, index) => {
                return (
                    <DocumentBox
                        color={color[index]}
                        name={ConstantText[item[0]]}
                        data={item[1] as IDocument[]} // Fix: Update the type of the 'data' prop
                        key={index}
                    />
                );
            })}
        </div>
    );
}

export default DocumentContainer;

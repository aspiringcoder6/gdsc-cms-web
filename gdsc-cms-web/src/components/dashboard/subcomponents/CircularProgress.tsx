const cleanPercentage = (percentage) => {
    const tooLow = !Number.isFinite(+percentage) || percentage < 0;
    const tooHigh = percentage > 100;
    return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ color, pct }: { color: string; pct?: number }) => {
    const r = 120;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - pct) * circ) / 100;
    return (
        <circle
            r={r}
            cx={150}
            cy={150}
            fill="transparent"
            stroke={strokePct !== circ ? color : ""} // remove colour as 0% sets full circumference
            strokeWidth={"1rem"}
            strokeDasharray={circ}
            strokeDashoffset={strokePct}
            strokeLinecap="round"
        ></circle>
    );
};

const Text = ({ content, textProperty }) => {
    return (
        <text
            x={textProperty.x}
            y={textProperty.y}
            dominantBaseline="central"
            textAnchor="middle"
            fontSize={textProperty.fontSize}
            fontWeight={textProperty.fontWeight}
            fill={textProperty.fill}
        >
            {content}
        </text>
    );
};

const CircularProgress = ({
    percentage,
    color,
}: {
    percentage: number;
    color: string;
}) => {
    const pct = cleanPercentage(percentage);
    const changePct = ((100 - pct) / 100) * 360 + 90 - 11;
    return (
        <svg width={300} height={300}>
            <g transform={`rotate(-90 ${"150 150"})`}>
                <Circle color={color} pct={pct} />
            </g>
            {percentage <= 94 && (
                <g transform={`rotate(-${changePct} ${"150 150"})`}>
                    <Circle color={"#E2E2F2"} pct={100 - pct - 6} />
                </g>
            )}

            <Text
                content={pct.toFixed(0) + "%"}
                textProperty={{
                    x: "50%",
                    y: "45%",
                    fontSize: "52px",
                    fontWeight: "bold",
                    fill: color,
                }}
            />
            <Text
                content={"Task Finished"}
                textProperty={{
                    x: "50%",
                    y: "58%",
                    fontSize: "22px",
                    fill: "#666C73",
                }}
            />
        </svg>
    );
};

export default CircularProgress;

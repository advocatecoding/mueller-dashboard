export type ChartType = "locations" | "sections"

export interface ChartTypeProp {
    setChartType: (chartType: ChartType) => void;
}

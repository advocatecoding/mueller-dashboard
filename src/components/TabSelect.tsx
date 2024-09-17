import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


import { ChartType, ChartTypeProp } from "@/types/chartTypes";


export default function TabSelect({setChartType}: ChartTypeProp) {

    function isValidChartType(value: string): value is ChartType {
        return value === "locations" || value === "sections";
    }

    // Typen-Sicherheit
    const triggerChartType = (chartType: string) => {
        if (isValidChartType(chartType)) {
            setChartType(chartType);
        }
    }   

    return (
        <Tabs defaultValue="locations" className="w-48" onValueChange={triggerChartType}>
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger className=" bg-transparent border-2 border-white" value="locations">Locations</TabsTrigger>
                <TabsTrigger className="bg-transparent border-2 border-white" value="sections">Sections</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

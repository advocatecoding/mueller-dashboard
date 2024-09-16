import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store';
import TabSelect from '@/components/TabSelect';

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"


import { ChartType } from '@/types/chartTypes';

interface StorelocationT {
    location: string,
    amount: number
}

interface SectionsT {
    section: string,
    amount: number
}


export default function Overview() {

    const stores = useSelector((state: RootState) => state.stores.stores);

    const [locationData, setLocationData] = useState<StorelocationT[]>([]); // State für locationData
    const [sectionsData, setSectionsData] = useState<SectionsT[]>([]); // State für sectionsData

    const [chartType, setChartType] = useState<ChartType>("locations");

    const setChart = (chartType: ChartType) => {
        setChartType(chartType);
    }



    const chartConfig = {
        amount: {
            label: "Amount",
            color: "hsl(var(--accent))",
        }
    } satisfies ChartConfig




    useEffect(() => {
        if (stores.length > 0) {
            const updatedLocationsData = getLocationData(stores);
            const updatedSectionsData = getSectionsData(stores);
            setLocationData(updatedLocationsData)
            setSectionsData(updatedSectionsData)
            console.log(updatedSectionsData)
        }

    }, [stores])

    const getSectionsData = (stores: { sections: string }[]) => {
        const sectionsCount: { [key: string]: number } = {};

        stores.forEach(store => {
            // Speicher den Sectionstring mit X Sections
            const sections = store.sections;
            if (sections) {
                const sectionsPerStore = sections.split(",");
                // Gehe durch die Sections durch die pro Store vorhanden sind und zähle sie
                sectionsPerStore.forEach(section => {
                    if (section !== "") {
                        sectionsCount[section] = (sectionsCount[section] || 0) + 1;
                    }
                })
            }
        })

        const sectionsData = Object.entries(sectionsCount)
            .map(([section, count]) => ({ section: section, amount: count }))
            .sort((a, b) => b.amount - a.amount)

        return sectionsData
    }

    const getLocationData = (stores: { city: string }[]) => {
        // Städte extrahieren
        const cityCount: { [key: string]: number } = {};

        stores.forEach(store => {
            const city = store.city;
            if (city) {
                cityCount[city] = (cityCount[city] || 0) + 1;
            }
        });

        // Nur Städte die 2 > vorkommen filtern
        const locationData = Object.entries(cityCount)
            .filter(([city, count]) => count > 2) // Nur wenn 2> ist
            .map(([city, count]) => ({ location: city, amount: count })) // benötigtes Format
            .sort((a, b) => b.amount - a.amount); // Absteigend sortiern

        return locationData;
    };


    return (
        <div className=' flex h-full w-full flex-col items-center gap-3'>
            <div className=' h-full flex rounded-xl '>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        className=''
                        accessibilityLayer
                        data={chartType === "locations" ? locationData : sectionsData}
                        layout="vertical"
                        width={550}
                        margin={{
                            right: 16,
                        }}
                    >
                        <YAxis
                            dataKey={chartType === "locations" ? "location" : "section"}
                            type="category"
                            tickLine={true}
                            tickMargin={10}
                            axisLine={true}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                            order="ascendent"
                        />
                        <XAxis dataKey="amount" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent className=' bg-secondary'  indicator="line" />}
                        />
                        <Bar
                            dataKey="amount"
                            layout="vertical"
                            fill="transparent"
                            stroke='white'
                            strokeWidth={"2px"}
                            radius={4}
                        >
                            <LabelList
                                dataKey={chartType === "locations" ? "location" : "section"}
                                position="insideBottomLeft"
                                offset={12}
                                fontSize={12}
                                fill='white'
                            />
                            <LabelList
                                dataKey="amount"
                                position="insideBottomRight"
                                offset={8}
                                className="text-white"
                                fontSize={"1em"}
                                fill='white'
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </div>

            <div className='mt-6'>
                <TabSelect setChartType={setChart}></TabSelect>
            </div>

        </div>

    )
}

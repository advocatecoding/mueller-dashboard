import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { PathProp } from '@/types/pathType';

import bewerbungsfoto from '@/assets/bewerbungsfoto.png'

export default function Header({currentPath}: PathProp) {

    const titleInfos = new Map <string, string>([
        ["overview",  "Have a look at the frequency of the basic store data."],
        ["analysis",  "Analyse the store data by filtering it."],
        ["map",  "Have a look at the distribution of the stores in Germany."],
    ]);


    return (
        <div className='flex justify-between fixed w-screen p-8'>

            <div className="w-96">
                <h1 className=' text-3xl text-white'>Dashboard</h1>
            </div>

            <div className="space-y-1 w-96">
                <h1 className="text-3xl font-medium text-center leading-none">
                    {currentPath.split("/")[1][0]?.toUpperCase() + currentPath.split("/")[1]?.substring(1)}
                </h1>
                <p className="text-sm text-muted-foreground text-center">
                    {titleInfos.get(currentPath.split("/")[1])}
                </p>
            </div>

            <div className="w-96 flex justify-end">
                <Avatar>
                    <AvatarImage src={bewerbungsfoto} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>


        </div>
    )
}

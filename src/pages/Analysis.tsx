import { useEffect } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useDispatch, useSelector } from 'react-redux';
import { setStores } from '@/redux/slices/storesSlice';
import { RootState } from '@/redux/store';
import { Store } from '@/redux/storeTypes';
import { Separator } from "@/components/ui/separator"

export default function Analysis() {

    const stores = useSelector((state: RootState) => state.stores.stores);
    const dispatch = useDispatch();

    useEffect(() => {
        // Hier könntest du einen API-Call machen und dann die Daten speichern
        const fetchStores = async () => {
            const response = await fetch('https://www.mueller.de/api/ccstore/allPickupStores/');
            const data: Store[] = await response.json();
            dispatch(setStores(data));
        };

        fetchStores();
    }, [dispatch]);
  return (
    <div>
        <ScrollArea className="h-full w-48 rounded-md border">
        
                <div className="p-4">
                    <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                    {stores.map((store) => (
                        <>
                            <div key={store.storeNumber} className="text-sm text-white">
                                {store.storeName}
                            </div>
                            <Separator className="my-2" />
                        </>
                    ))}
                </div>
            </ScrollArea>
    </div>
  )
}

import { TablaExpensas } from "@/components/tabla-expensas";
import useSWR from 'swr';


export default function Expensas( ){

    return (
        <>
        <h1>Expensas</h1>
        <TablaExpensas />
        </>
    )
}
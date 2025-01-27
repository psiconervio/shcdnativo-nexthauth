import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Bar, BarChart } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";


const data = [
    { name: "Jan", value: 2500 },
    { name: "Feb", value: 2400 },
    { name: "Mar", value: 1000 },
    { name: "Apr", value: 1500 },
    { name: "May", value: 900 },
    { name: "Jun", value: 3500 },
    { name: "Jul", value: 4800 },
    { name: "Aug", value: 2000 },
    { name: "Sep", value: 4700 },
    { name: "Oct", value: 3200 },
    { name: "Nov", value: 3300 },
    { name: "Dec", value: 4000 },
  ];
export function Grafico() {
    return (<>
            <Card className="col-span-full lg:col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={270}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
    )
}
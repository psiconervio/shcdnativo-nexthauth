'use client'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { CalendarIcon, DownloadIcon, SearchIcon, ChevronDownIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const data = [
  { name: 'Jan', value: 2500 },
  { name: 'Feb', value: 2400 },
  { name: 'Mar', value: 1000 },
  { name: 'Apr', value: 1500 },
  { name: 'May', value: 900 },
  { name: 'Jun', value: 3500 },
  { name: 'Jul', value: 4800 },
  { name: 'Aug', value: 2000 },
  { name: 'Sep', value: 4700 },
  { name: 'Oct', value: 3200 },
  { name: 'Nov', value: 3300 },
  { name: 'Dec', value: 4000 },
]

const recentSales = [
  { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00' },
  { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00' },
  { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00' },
  { name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
]

export default function Dashboard() {
  return (
    <div className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <main className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Jan 20, 2023 - Feb 09, 2023
            </Button>
            <Button>
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">+201 since last hour</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardContent>
                You made 265 sales this month.
              </CardContent>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentSales.map((sale, index) => (
                  <div key={index} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`/avatar-${index + 1}.png`} alt={sale.name} />
                      <AvatarFallback>{sale.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{sale.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {sale.email}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      {sale.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
// 'use client'
// // Dashboard.jsx
// import React, { useState } from 'react'
// import Sidebar from '@/components/Sidebar'
// import Header from '@/components/Header'
// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
// // import { CalendarIcon, DownloadIcon } from 'lucide-react'
// // import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { CalendarIcon, DownloadIcon } from 'lucide-react'
// import HeaderUno from '@/components/HeaderUno'
// // import { AvatarFallback } from '@/components/ui/avatar'

// const data = [
//   { name: 'Jan', value: 2500 },
//   { name: 'Feb', value: 2400 },
//   { name: 'Mar', value: 1000 },
//   { name: 'Apr', value: 1500 },
//   { name: 'May', value: 900 },
//   { name: 'Jun', value: 3500 },
//   { name: 'Jul', value: 4800 },
//   { name: 'Aug', value: 2000 },
//   { name: 'Sep', value: 4700 },
//   { name: 'Oct', value: 3200 },
//   { name: 'Nov', value: 3300 },
//   { name: 'Dec', value: 4000 },
// ]

// const recentSales = [
//   { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00' },
//   { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00' },
//   { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00' },
//   { name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
//   { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
// ]

// export default function Dashboard() {
//   // const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

//   // const toggleSidebar = () => {
//   //   setIsSidebarExpanded(!isSidebarExpanded)
//   // }

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//     {/* <HeaderUno/> */}

//       {/* <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} /> */}
//       <div className={`flex-1 transition-all duration-300 md:ml-64`}>

//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-3xl font-bold">Dashboard</h1>
//             <div className="flex items-center space-x-4">
//               <Button variant="outline" className="flex items-center">
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 <span className="hidden sm:inline">Jan 20, 2023 - Feb 09, 2023</span>
//               </Button>
//               <Button>
//                 <DownloadIcon className="mr-2 h-4 w-4" />
//                 <span className="hidden sm:inline">Download</span>
//               </Button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   className="h-4 w-4 text-muted-foreground"
//                 >
//                   <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//                 </svg>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">$45,231.89</div>
//                 <p className="text-xs text-muted-foreground">+20.1% from last month</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   className="h-4 w-4 text-muted-foreground"
//                 >
//                   <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//                   <circle cx="9" cy="7" r="4" />
//                   <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
//                 </svg>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">+2350</div>
//                 <p className="text-xs text-muted-foreground">+180.1% from last month</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Sales</CardTitle>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   className="h-4 w-4 text-muted-foreground"
//                 >
//                   <rect width="20" height="14" x="2" y="5" rx="2" />
//                   <path d="M2 10h20" />
//                 </svg>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">+12,234</div>
//                 <p className="text-xs text-muted-foreground">+19% from last month</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Active Now</CardTitle>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   className="h-4 w-4 text-muted-foreground"
//                 >
//                   <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
//                 </svg>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">+573</div>
//                 <p className="text-xs text-muted-foreground">+201 since last hour</p>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
//             <Card className="col-span-4">
//               <CardHeader>
//                 <CardTitle>Overview</CardTitle>
//               </CardHeader>
//               <CardContent className="pl-2">
//                 <ResponsiveContainer width="100%" height={350}>
//                   <BarChart data={data}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Bar dataKey="value" fill="#8884d8" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//             <Card className="col-span-3">
//               <CardHeader>
//                 <CardTitle>Recent Sales</CardTitle>
//                 <CardContent>
//                   You made 265 sales this month.
//                 </CardContent>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-8">
//                   {recentSales.map((sale, index) => (
//                     <div key={index} className="flex items-center">
//                       <Avatar className="h-9 w-9">
//                         <AvatarImage src={`/avatar-${index + 1}.png`} alt={sale.name} />
//                         <AvatarFallback>{sale.name[0]}</AvatarFallback>
//                       </Avatar>
//                       <div className="ml-4 space-y-1">
//                         <p className="text-sm font-medium leading-none">{sale.name}</p>
//                         <p className="text-sm text-muted-foreground">
//                           {sale.email}
//                         </p>
//                       </div>
//                       <div className="ml-auto font-medium">
//                         {sale.amount}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }
// // // Dashboard.jsx
// // 'use client'
// // import React, { useState } from 'react'
// // import Sidebar from '@/components/Sidebar'
// // import Header from '@/components/Header'
// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
// // // import { CalendarIcon, DownloadIcon, SearchIcon, MenuIcon, XIcon, HomeIcon, UsersIcon, PackageIcon, SettingsIcon } from 'lucide-react'

// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { CalendarIcon, DownloadIcon } from 'lucide-react'
// // // import { Input } from "@/components/ui/input"

// // const data = [
// //   { name: 'Jan', value: 2500 },
// //   { name: 'Feb', value: 2400 },
// //   { name: 'Mar', value: 1000 },
// //   { name: 'Apr', value: 1500 },
// //   { name: 'May', value: 900 },
// //   { name: 'Jun', value: 3500 },
// //   { name: 'Jul', value: 4800 },
// //   { name: 'Aug', value: 2000 },
// //   { name: 'Sep', value: 4700 },
// //   { name: 'Oct', value: 3200 },
// //   { name: 'Nov', value: 3300 },
// //   { name: 'Dec', value: 4000 },
// // ]

// // const recentSales = [
// //   { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00' },
// //   { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00' },
// //   { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00' },
// //   { name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
// //   { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
// // ]

// // export default function Dashboard() {
// //   const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

// //   const toggleSidebar = () => {
// //     setIsSidebarExpanded(!isSidebarExpanded)
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex">
// //       <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
// //       <div className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? 'ml-64' : 'ml-16'}`}>
// //         <Header />

// //         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
// //           <div className="flex justify-between items-center mb-8">
// //             <h1 className="text-3xl font-bold">Dashboard</h1>
// //             <div className="flex items-center space-x-4">
// //               <Button variant="outline" className="flex items-center">
// //                 <CalendarIcon className="mr-2 h-4 w-4" />
// //                 Jan 20, 2023 - Feb 09, 2023
// //               </Button>
// //               <Button>
// //                 <DownloadIcon className="mr-2 h-4 w-4" />
// //                 Download
// //               </Button>
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //             <Card>
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth="2"
// //                   className="h-4 w-4 text-muted-foreground"
// //                 >
// //                   <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
// //                 </svg>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold">$45,231.89</div>
// //                 <p className="text-xs text-muted-foreground">+20.1% from last month</p>
// //               </CardContent>
// //             </Card>
// //             <Card>
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth="2"
// //                   className="h-4 w-4 text-muted-foreground"
// //                 >
// //                   <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
// //                   <circle cx="9" cy="7" r="4" />
// //                   <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
// //                 </svg>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold">+2350</div>
// //                 <p className="text-xs text-muted-foreground">+180.1% from last month</p>
// //               </CardContent>
// //             </Card>
// //             <Card>
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">Sales</CardTitle>
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth="2"
// //                   className="h-4 w-4 text-muted-foreground"
// //                 >
// //                   <rect width="20" height="14" x="2" y="5" rx="2" />
// //                   <path d="M2 10h20" />
// //                 </svg>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold">+12,234</div>
// //                 <p className="text-xs text-muted-foreground">+19% from last month</p>
// //               </CardContent>
// //             </Card>
// //             <Card>
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">Active Now</CardTitle>
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth="2"
// //                   className="h-4 w-4 text-muted-foreground"
// //                 >
// //                   <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
// //                 </svg>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold">+573</div>
// //                 <p className="text-xs text-muted-foreground">+201 since last hour</p>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
// //             <Card className="col-span-4">
// //               <CardHeader>
// //                 <CardTitle>Overview</CardTitle>
// //               </CardHeader>
// //               <CardContent className="pl-2">
// //                 <ResponsiveContainer width="100%" height={350}>
// //                   <BarChart data={data}>
// //                     <CartesianGrid strokeDasharray="3 3" />
// //                     <XAxis dataKey="name" />
// //                     <YAxis />
// //                     <Bar dataKey="value" fill="#8884d8" />
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               </CardContent>
// //             </Card>
// //             <Card className="col-span-3">
// //               <CardHeader>
// //                 <CardTitle>Recent Sales</CardTitle>
// //                 <CardContent>
// //                   You made 265 sales this month.
// //                 </CardContent>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="space-y-8">
// //                   {recentSales.map((sale, index) => (
// //                     <div key={index} className="flex items-center">
// //                       <Avatar className="h-9 w-9">
// //                         <AvatarImage src={`/avatar-${index + 1}.png`} alt={sale.name} />
// //                         <AvatarFallback>{sale.name[0]}</AvatarFallback>
// //                       </Avatar>
// //                       <div className="ml-4 space-y-1">
// //                         <p className="text-sm font-medium leading-none">{sale.name}</p>
// //                         <p className="text-sm text-muted-foreground">
// //                           {sale.email}
// //                         </p>
// //                       </div>
// //                       <div className="ml-auto font-medium">
// //                         {sale.amount}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   )
// // }
// // 'use client'
// // import React, { useState } from 'react'
// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
// // import { CalendarIcon, DownloadIcon, SearchIcon, MenuIcon, XIcon, HomeIcon, UsersIcon, PackageIcon, SettingsIcon } from 'lucide-react'

// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Input } from "@/components/ui/input"

// // const data = [
// //   { name: 'Jan', value: 2500 },
// //   { name: 'Feb', value: 2400 },
// //   { name: 'Mar', value: 1000 },
// //   { name: 'Apr', value: 1500 },
// //   { name: 'May', value: 900 },
// //   { name: 'Jun', value: 3500 },
// //   { name: 'Jul', value: 4800 },
// //   { name: 'Aug', value: 2000 },
// //   { name: 'Sep', value: 4700 },
// //   { name: 'Oct', value: 3200 },
// //   { name: 'Nov', value: 3300 },
// //   { name: 'Dec', value: 4000 },
// // ]

// // const recentSales = [
// //   { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00' },
// //   { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00' },
// //   { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00' },
// //   { name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
// //   { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
// // ]

// // const Sidebar = ({ isExpanded, toggleSidebar }) => {
// //   return (
// //     <div className={`bg-gray-800 text-white h-screen fixed left-0 top-0 transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}>
// //       <div className="flex justify-between items-center p-4">
// //         {isExpanded && <span className="text-xl font-bold">Dashboard</span>}
// //         <Button variant="ghost" size="icon" onClick={toggleSidebar}>
// //           {isExpanded ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
// //         </Button>
// //       </div>
// //       <nav className="mt-8">
// //         <Button variant="ghost" className="w-full justify-start mb-2">
// //           <HomeIcon className="h-5 w-5 mr-2" />
// //           {isExpanded && 'Overview'}
// //         </Button>
// //         <Button variant="ghost" className="w-full justify-start mb-2">
// //           <UsersIcon className="h-5 w-5 mr-2" />
// //           {isExpanded && 'Customers'}
// //         </Button>
// //         <Button variant="ghost" className="w-full justify-start mb-2">
// //           <PackageIcon className="h-5 w-5 mr-2" />
// //           {isExpanded && 'Products'}
// //         </Button>
// //         <Button variant="ghost" className="w-full justify-start mb-2">
// //           <SettingsIcon className="h-5 w-5 mr-2" />
// //           {isExpanded && 'Settings'}
// //         </Button>
// //       </nav>
// //     </div>
// //   )
// // }

// // export default function Dashboard() {
// //   const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

// //   const toggleSidebar = () => {
// //     setIsSidebarExpanded(!isSidebarExpanded)
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex">
// //       <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
// //       <div className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? 'ml-64' : 'ml-16'}`}>
// //         <header className="bg-white shadow">
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
// //             <div className="flex items-center">
// //               <Avatar className="h-8 w-8">
// //                 <AvatarImage src="/placeholder-avatar.jpg" alt="Alicia Koch" />
// //                 <AvatarFallback>AK</AvatarFallback>
// //               </Avatar>
// //               <span className="ml-2 font-medium">Alicia Koch</span>
// //             </div>
// //             <div className="flex items-center">
// //               <Input
// //                 type="search"
// //                 placeholder="Search..."
// //                 className="mr-2"
// //               />
// //               <Avatar>
// //                 <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
// //                 <AvatarFallback>U</AvatarFallback>
// //               </Avatar>
// //             </div>
// //           </div>
// //         </header>

// //         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
// //           <div className="flex justify-between items-center mb-8">
// //             <h1 className="text-3xl font-bold">Dashboard</h1>
// //             <div className="flex items-center space-x-4">
// //               <Button variant="outline" className="flex items-center">
// //                 <CalendarIcon className="mr-2 h-4 w-4" />
// //                 Jan 20, 2023 - Feb 09, 2023
// //               </Button>
// //               <Button>
// //                 <DownloadIcon className="mr-2 h-4 w-4" />
// //                 Download
// //               </Button>
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //             <Card>
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth="2"
// //                   className="h-4 w-4 text-muted-foreground"
// //                 >
// //                   <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
// //                 </svg>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold">$45,231.89</div>
// //                 <p className="text-xs text-muted-foreground">+20.1% from last month</p>
// //               </CardContent>
// //             </Card>
// //             <Card>
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth="2"
// //                   className="h-4 w-4 text-muted-foreground"
// //                 >
// //                   <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
// //                   <circle cx="9" cy="7" r="4" />
// //                   <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
// //                 </svg>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold">+2350</div>
// //                 <p className="text-xs text-muted-foreground">+180.1% from last month</p>
// //               </CardContent>
// //             </Card>
// //             <Card>
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">Sales</CardTitle>
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth="2"
// //                   className="h-4 w-4 text-muted-foreground"
// //                 >
// //                   <rect width="20" height="14" x="2" y="5" rx="2" />
// //                   <path d="M2 10h20" />
// //                 </svg>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold">+12,234</div>
// //                 <p className="text-xs text-muted-foreground">+19% from last month</p>
// //               </CardContent>
// //             </Card>
// //             <Card>
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">Active Now</CardTitle>
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth="2"
// //                   className="h-4 w-4 text-muted-foreground"
// //                 >
// //                   <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
// //                 </svg>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold">+573</div>
// //                 <p className="text-xs text-muted-foreground">+201 since last hour</p>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
// //             <Card className="col-span-4">
// //               <CardHeader>
// //                 <CardTitle>Overview</CardTitle>
// //               </CardHeader>
// //               <CardContent className="pl-2">
// //                 <ResponsiveContainer width="100%" height={350}>
// //                   <BarChart data={data}>
// //                     <CartesianGrid strokeDasharray="3 3" />
// //                     <XAxis dataKey="name" />
// //                     <YAxis />
// //                     <Bar dataKey="value" fill="#8884d8" />
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               </CardContent>
// //             </Card>
// //             <Card className="col-span-3">
// //               <CardHeader>
// //                 <CardTitle>Recent Sales</CardTitle>
// //                 <CardContent>
// //                   You made 265 sales this month.
// //                 </CardContent>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="space-y-8">
// //                   {recentSales.map((sale, index) => (
// //                     <div key={index} className="flex items-center">
// //                       <Avatar className="h-9 w-9">
// //                         <AvatarImage src={`/avatar-${index + 1}.png`} alt={sale.name} />
// //                         <AvatarFallback>{sale.name[0]}</AvatarFallback>
// //                       </Avatar>
// //                       <div className="ml-4 space-y-1">
// //                         <p className="text-sm font-medium leading-none">{sale.name}</p>
// //                         <p className="text-sm text-muted-foreground">
// //                           {sale.email}
// //                         </p>
// //                       </div>
// //                       <div className="ml-auto font-medium">
// //                         {sale.amount}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   )
// // }
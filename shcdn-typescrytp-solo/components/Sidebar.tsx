// // Sidebar.jsx
// import React from 'react'
// import { Button } from "@/components/ui/button"
// import { HomeIcon, UsersIcon, PackageIcon, SettingsIcon, MenuIcon, XIcon, Package2, Home, ShoppingCart, Package, Users2, LineChart, Settings } from 'lucide-react'
// import Link from 'next/link'
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'

// const Sidebar = ({ isExpanded, toggleSidebar }) => {
    
//   return (
//     <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
//     <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
//       <Link
//         href="#"
//         className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
//       >
//         <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
//         <span className="sr-only">Acme Inc</span>
//       </Link>
//       <TooltipProvider> 
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Link
//             href="#"
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//           >
//             <Home className="h-5 w-5" />
//             <span className="sr-only">Dashboard</span>
//           </Link>
//         </TooltipTrigger>
//         <TooltipContent side="right">Dashboard</TooltipContent>
//       </Tooltip>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Link
//             href="#"
//             className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//           >
//             <ShoppingCart className="h-5 w-5" />
//             <span className="sr-only">Orders</span>
//           </Link>
//         </TooltipTrigger>
//         <TooltipContent side="right">Orders</TooltipContent>
//       </Tooltip>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Link
//             href="#"
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//           >
//             <Package className="h-5 w-5" />
//             <span className="sr-only">Products</span>
//           </Link>
//         </TooltipTrigger>
//         <TooltipContent side="right">Products</TooltipContent>
//       </Tooltip>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Link
//             href="#"
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//           >
//             <Users2 className="h-5 w-5" />
//             <span className="sr-only">Customers</span>
//           </Link>
//         </TooltipTrigger>
//         <TooltipContent side="right">Customers</TooltipContent>
//       </Tooltip>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Link
//             href="#"
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//           >
//             <LineChart className="h-5 w-5" />
//             <span className="sr-only">Analytics</span>
//           </Link>
//         </TooltipTrigger>
//         <TooltipContent side="right">Analytics</TooltipContent>
//       </Tooltip>
//       </TooltipProvider>

//     </nav>
//     <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Link
//             href="#"
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//           >
//             <Settings className="h-5 w-5" />
//             <span className="sr-only">Settings</span>
//           </Link>
//         </TooltipTrigger>
//         <TooltipContent side="right">Settings</TooltipContent>
//       </Tooltip>
//       </TooltipProvider>
      
//     </nav>
//   </aside>
//   )
// }

// export default Sidebar
// // // components/Sidebar.tsx
// // import React from "react";
// // import Link from "next/link";
// // import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"; // Asegúrate de que la ruta sea correcta
// // import { Home, ShoppingCart, Package, Users2, LineChart, Settings } from "lucide-react"; // Asegúrate de importar los iconos correctos

// // interface SidebarProps {
// //   isExpanded: boolean;
// //   toggleSidebar: () => void;
// // }

// // const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleSidebar }) => {
// //   return (
// //     <aside className={`fixed inset-y-0 left-0 z-10 flex-col border-r bg-background transition-all duration-300 ${isExpanded ? "w-60" : "w-14"} hidden sm:flex`}>
// //       <nav className="flex flex-col items-center gap-4 px-2 py-5">
// //         <Link
// //           href="#"
// //           className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
// //         >
// //           <Package className="h-4 w-4 transition-all group-hover:scale-110" />
// //           <span className="sr-only">Acme Inc</span>
// //         </Link>

// //         <TooltipProvider>
// //           <Tooltip>
// //             <TooltipTrigger asChild>
// //               <Link
// //                 href="#"
// //                 className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
// //               >
// //                 <Home className="h-5 w-5" />
// //                 <span className="sr-only">Dashboard</span>
// //               </Link>
// //             </TooltipTrigger>
// //             <TooltipContent side="right">Dashboard</TooltipContent>
// //           </Tooltip>
// //           <Tooltip>
// //             <TooltipTrigger asChild>
// //               <Link
// //                 href="#"
// //                 className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
// //               >
// //                 <ShoppingCart className="h-5 w-5" />
// //                 <span className="sr-only">Orders</span>
// //               </Link>
// //             </TooltipTrigger>
// //             <TooltipContent side="right">Orders</TooltipContent>
// //           </Tooltip>
// //           <Tooltip>
// //             <TooltipTrigger asChild>
// //               <Link
// //                 href="#"
// //                 className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
// //               >
// //                 <Package className="h-5 w-5" />
// //                 <span className="sr-only">Products</span>
// //               </Link>
// //             </TooltipTrigger>
// //             <TooltipContent side="right">Products</TooltipContent>
// //           </Tooltip>
// //           <Tooltip>
// //             <TooltipTrigger asChild>
// //               <Link
// //                 href="#"
// //                 className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
// //               >
// //                 <Users2 className="h-5 w-5" />
// //                 <span className="sr-only">Customers</span>
// //               </Link>
// //             </TooltipTrigger>
// //             <TooltipContent side="right">Customers</TooltipContent>
// //           </Tooltip>
// //           <Tooltip>
// //             <TooltipTrigger asChild>
// //               <Link
// //                 href="#"
// //                 className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
// //               >
// //                 <LineChart className="h-5 w-5" />
// //                 <span className="sr-only">Analytics</span>
// //               </Link>
// //             </TooltipTrigger>
// //             <TooltipContent side="right">Analytics</TooltipContent>
// //           </Tooltip>
// //         </TooltipProvider>
// //       </nav>
// //       <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
// //         <TooltipProvider>
// //           <Tooltip>
// //             <TooltipTrigger asChild>
// //               <Link
// //                 href="#"
// //                 className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
// //               >
// //                 <Settings className="h-5 w-5" />
// //                 <span className="sr-only">Settings</span>
// //               </Link>
// //             </TooltipTrigger>
// //             <TooltipContent side="right">Settings</TooltipContent>
// //           </Tooltip>
// //         </TooltipProvider>
// //       </nav>
// //     </aside>
// //   );
// // };

// // export default Sidebar;


// // // components/Sidebar.js
// // import React from 'react';
// // import { Button } from "@/components/ui/button";
// // import { HomeIcon, UsersIcon, PackageIcon, SettingsIcon, MenuIcon, XIcon } from 'lucide-react';

// // export const Sidebar = ({ isExpanded, toggleSidebar }) => {
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
// //   );
// // };

// // export default Sidebar;

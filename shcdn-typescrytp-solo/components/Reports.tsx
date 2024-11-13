// import { useEffect, useState } from "react";

// const Reports = () => {
//   const [report, setReport] = useState([]);

//   useEffect(() => {
//     fetch("/api/reports")
//       .then((res) => res.json())
//       .then(setReport);
//   }, []);

//   return (
//     <div>
//       <h2>Reporte de Productos</h2>
//       <ul>
//         {report.map((item, index) => (
//           <li key={index}>
//             {item.productName}: Costo Total: ${item.totalCost}, Precio de Venta: ${item.sellingPrice}, Ganancia: ${item.profit}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Reports;

// import React, { useState } from 'react';
//
// import deleteIcon from '../../../../../assets/images/deleteIcon.svg';
// import rowItemIcon from '../../../../../assets/images/rowItemIcon.svg';
// import { createRow, updateRow } from '../../../tableRowsSlice';
// import s from '../TableRow.module.scss';
// import { ParentsType } from '../TableRow.types';
// import { RowTable } from '../TableRows';
//
// import { CreateRowData } from 'api/types';
// import { EditInputWithFormat } from 'components';
// import { useAppDispatch, useAppSelector } from 'hooks';
//
// type EditableTableRowsType = RowTable &
//   ParentsType & {
//     buttonsStyle: string;
//     lineLevel: number;
//   };
// export default function EditableTableRows(props: EditableTableRowsType) {
//   const {
//     buttonsStyle,
//     rowName,
//     id,
//     salary,
//     overheads,
//     parentId,
//     estimatedProfit,
//     equipmentCosts,
//     // child,
//     // parents,
//     lineLevel,
//   } = props;
//
//   const [newRowName, setNewRowName] = useState(rowName);
//   const [newSalary, setNewSalary] = useState(salary);
//   const [newOverheads, setNewOverheads] = useState(overheads);
//   const [newEstimatedProfit, setNewEstimatedProfit] = useState(estimatedProfit);
//   const [newEquipmentCosts, setNewEquipmentCosts] = useState(equipmentCosts);
//   const editable = useAppSelector(state => state.rows.editable);
//   const dispatch = useAppDispatch();
//
//   const saveNewRow = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       const params: CreateRowData = {
//         id,
//         rowName: newRowName,
//         parentId,
//         salary: newSalary || 0,
//         overheads: newOverheads || 0,
//         equipmentCosts: newEquipmentCosts || 0,
//         estimatedProfit: newEstimatedProfit || 0,
//       };
//       // eslint-disable-next-line no-unused-expressions
//       editable === 0 ? dispatch(createRow(params)) : dispatch(updateRow(params));
//     }
//     return e.key;
//   };
//
//   return (
//     <>
//       <div className={s.tableRow}>
//         <div className={s.blockWithItemLine}>
//           <div
//             className={s.buttonsBlock}
//             style={{
//               marginLeft: `${20 * lineLevel}px`,
//             }}
//           >
//             <div
//               className={s.leftLine}
//               // style={{ height: `${60 * (deeplevel - lastdeeplevel)}px` }}
//             />
//             <div className={s.buttons_cont}>
//               <button type="button" className={buttonsStyle}>
//                 <img src={rowItemIcon} alt="rowItemIcon" />
//               </button>
//               <button type="button" className={s.delRow}>
//                 <img src={deleteIcon} alt="deleteIcon" />
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className={s.blockInfo}>
//           <div className={s.title}>
//             <input
//               className={s.input}
//               value={newRowName}
//               onChange={e => setNewRowName(e.target.value)}
//               onKeyDown={saveNewRow}
//             />
//           </div>
//           <div className={s.cell}>
//             <EditInputWithFormat
//               newValue={newSalary}
//               setNewValue={setNewSalary}
//               saveNewRow={saveNewRow}
//             />
//           </div>
//           <div className={s.cell}>
//             <EditInputWithFormat
//               newValue={newEquipmentCosts}
//               setNewValue={setNewEquipmentCosts}
//               saveNewRow={saveNewRow}
//             />
//           </div>
//           <div className={s.cell}>
//             <EditInputWithFormat
//               newValue={newOverheads}
//               setNewValue={setNewOverheads}
//               saveNewRow={saveNewRow}
//             />
//           </div>
//           <div className={s.cell}>
//             <EditInputWithFormat
//               newValue={newEstimatedProfit}
//               setNewValue={setNewEstimatedProfit}
//               saveNewRow={saveNewRow}
//             />
//           </div>
//         </div>
//       </div>
//       {/* {child && */}
//       {/*  child.map(rowChild => ( */}
//       {/*    <ChildrenRows */}
//       {/*      key={rowChild.id} */}
//       {/*      child={rowChild} */}
//       {/*      parents={parents} */}
//       {/*      lineLevel={lineLevel} */}
//       {/*    /> */}
//       {/*  ))} */}
//     </>
//   );
// }

export default function EditableTableRows() {}

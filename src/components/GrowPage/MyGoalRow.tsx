import { Input } from "../../ui/input";
import { TableCell, TableRow } from "../../ui/table";
import React from 'react'

const MyGoalRow: React.FC<{
  isEdit: boolean;
  category: string;
  goal: number;
  updatedAt: Date
  idx: number;
  achievement: number;
  isLastRow: boolean;
  setMyGoal:any;
}> = ({ isEdit, category, goal, updatedAt, idx, achievement, isLastRow, setMyGoal }) => {



  return (
    <TableRow className='text-2xl text-center whitespace-nowrap  text-white bg-[#92C7CF88] border-none hover:text-black'>
      <TableCell className={`font-bold text-center ${(isLastRow) && 'rounded-bl-2xl'} `}>{category}</TableCell>
      <TableCell className={`${isEdit && 'px-0 pb-0 pt-3 flex items-center h-full whitespace-nowrap'}`}>
        {isEdit ?
          <>
            <Input value={goal} className="border-none shadow-none text-2xl bg-white text-black h-full"
            
            // onChange={(e)=>{
            //   setMyGoal
            // }}
            />
            <div className="ml-3 h-full">분</div>
          </>
          : category === '기상' ? `${Math.floor(goal / 60).toString()}시 ${goal % 60}분` : `${goal}분`
        }
      </TableCell>
      <TableCell>{
        category === '기상' ? `${achievement}일째` : `${achievement}분`
      }</TableCell>
      <TableCell className={`${isLastRow && "rounded-br-2xl"}`}>{updatedAt.toLocaleDateString()}</TableCell>
    </TableRow>
  )
}

export default MyGoalRow
import { MouseEventHandler } from "react";

type SquareProps = {
    value : string,
    winner : boolean,
    onSquareClick : MouseEventHandler
}

export default function Square({ value, winner, onSquareClick } : SquareProps){
    return <button className={"font-semibold h-20 bg-gray-100 hover:bg-gray-200 rounded-md" + (winner ? ' border-2 border-green-500' : '')} onClick={onSquareClick}>{value}</button>
}
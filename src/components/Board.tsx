import { useState } from "react";
import Square from "./Square";

export default function Board(){
    const [squares, setSquares] = useState(Array(9).fill(''));
    const [squaresStatus, setSquaresStatus] = useState(Array(9).fill(false));
    const [player, setPlayer] = useState('X');
    const [status, setStatus] = useState('');

    function handleClick(i : number) {
        if (squares[i] !== '' || status !== '') {
            return;
        }

        const nextSquares = squares.slice();
        nextSquares[i] = player;
        setSquares(nextSquares);
        if (player === 'X') {
            setPlayer('O');
        } else {
            setPlayer('X');
        }
        calculateWinner(nextSquares);
    }

    function resetGame() {
        setSquares(Array(9).fill(''));
        setSquaresStatus(Array(9).fill(false));
        setPlayer('X');
        setStatus('');
    }

    function calculateWinner(squares : string[]) {
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        for (let i = 0; i < lines.length; i++){
            const [a,b,c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[c]) {
                setStatus(squares[a] + ' is the winner!');
                let newSquaresStatus = squaresStatus.slice();
                newSquaresStatus[a] = true;
                newSquaresStatus[b] = true;
                newSquaresStatus[c] = true;
                setSquaresStatus(newSquaresStatus);
                return;
            }
        }

        let scratch = true;
        for (let i = 0; i < squares.length; i++){
            scratch = scratch && squares[i] !== '';
        }
        if (scratch) {
            setStatus('Scratch! No winner.');
        }
    }

    return(
        <>
            <div className="text-2xl text-red-700">{status}</div>
            <div className="grid grid-cols-3 gap-2 w-64">
                <Square value={squares[0]} winner={squaresStatus[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} winner={squaresStatus[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} winner={squaresStatus[2]} onSquareClick={() => handleClick(2)} />
                <Square value={squares[3]} winner={squaresStatus[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} winner={squaresStatus[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} winner={squaresStatus[5]} onSquareClick={() => handleClick(5)} />
                <Square value={squares[6]} winner={squaresStatus[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} winner={squaresStatus[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} winner={squaresStatus[8]} onSquareClick={() => handleClick(8)} />
            </div>
            <button className="mt-6 bg-slate-400 px-4 py-2" onClick={resetGame}>Reset</button>
        </>
    )
}
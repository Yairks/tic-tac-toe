'use client';

import clsx from 'clsx';
import { useState } from 'react';

export default function Page() {
    return (
        <div className="flex flex-col items-center h-screen">
            <div className="flex text-[8lvh] font-bold text-blue-900 pt-[5lvh]">Tic-Tac-Toe</div>
            <Board />
        </div>
    );
}

function Square({ letter, setSquare }: { letter: "X" | "O" | "", setSquare: () => void }) {
    const className = clsx("border-2 border-solid border-black text-[7vh] font-medium w-[100%] h-[100%] flex items-center justify-center",
        {
            "text-red-500": letter === "X",
            "text-blue-500": letter === "O",
        }
    )

    function handleClick() {
        setSquare()
    }

    return (
        <button className={className} onClick={handleClick}> {letter}</button>
    )
}

function WinnerMessage({ winner, resetGame }: { winner: "X" | "O" | "" | "N", resetGame?: () => void }) {
    if (winner === "")
        return <div className="h-[20%]"></div>;

    if (winner === "N") {
        return (
            <div className="flex flex-col items-center h-[20%]">
                <div className="text-[6lvh] font-medium">It's a tie!</div>
                <button className="text-[4lvh] underline text-gray-400" onClick={resetGame}>play again</button>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center h-[20%]">
            <div className="text-[6lvh] font-medium">{winner} wins!</div>
            <button className="text-[4lvh] underline text-gray-400" onClick={resetGame}>play again</button>
        </div>
    )
}

function Board() {
    const [board, setBoard] = useState<("X" | "O" | "")[]>(new Array(9).fill(""));
    const [currentLetter, setCurrentLetter] = useState<"X" | "O">("X");
    const [winner, setWinner] = useState<"X" | "O" | "" | "N">("")

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ]

    const setSquare = (index: number) => {
        return () => {
            if (board[index] !== "" || winner !== "")
                return
            board[index] = currentLetter;
            setBoard([...board]);
            setCurrentLetter(currentLetter === "X" ? "O" : "X");

            checkForWinner();
        }
    }

    const checkForWinner = () => {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
                setWinner(board[a]);
                return
            }

            if (!board.includes("")) {
                setWinner("N");
            }
        }
    }

    const resetGame = () => {
        setBoard(new Array(9).fill(""));
        setWinner("");
        setCurrentLetter("X");
    }

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <div className="flex flex-col items-center justify-center w-[90lvh] p-[5lvh] ">
                <div className="flex flex-row items-center justify-center h-[15lvh] w-[45lvh] border-t-2 border-l-2 border-r-2 border-solid border-black">
                    <Square letter={board[0]} setSquare={setSquare(0)} />
                    <Square letter={board[1]} setSquare={setSquare(1)} />
                    <Square letter={board[2]} setSquare={setSquare(2)} />
                </div>
                <div className="flex flex-row items-center justify-center h-[15lvh] w-[45lvh] border-l-2 border-r-2 border-solid border-black">
                    <Square letter={board[3]} setSquare={setSquare(3)} />
                    <Square letter={board[4]} setSquare={setSquare(4)} />
                    <Square letter={board[5]} setSquare={setSquare(5)} />
                </div>
                <div className="flex flex-row items-center justify-center h-[15lvh] w-[45lvh] border-b-2 border-l-2 border-r-2 border-solid border-black">
                    <Square letter={board[6]} setSquare={setSquare(6)} />
                    <Square letter={board[7]} setSquare={setSquare(7)} />
                    <Square letter={board[8]} setSquare={setSquare(8)} />
                </div>
            </div>
            <WinnerMessage winner={winner} resetGame={resetGame} />
        </div>
    )
}
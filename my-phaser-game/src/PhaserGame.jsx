import { useLayoutEffect, useRef } from 'react';
import StartGame from './game/main';

export function PhaserGame ()
{
    const game = useRef();

    useLayoutEffect(() => {
        game.current = StartGame('game-container');

        return () => {
            game.current.destroy(true);
            game.current = undefined;
        };
    }, []);

    return <div id="game-container"></div>;
}

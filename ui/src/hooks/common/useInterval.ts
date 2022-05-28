import { useEffect, useRef, useState } from 'react';

export interface IUseInterval {
    intervalId?: NodeJS.Timer;
}

export default function useInterval(callback: () => void, delay?: number): IUseInterval {
    const savedCallback = useRef(callback);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!delay && delay !== 0) {
            return;
        }

        const id = setInterval(() => savedCallback.current(), delay);
        setIntervalId(id);

        return () => clearInterval(id);
    }, [delay]);

    return {
        intervalId,
    };
}

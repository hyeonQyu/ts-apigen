import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { SpeechBubbleProps } from '@components/common/speech-bubble/speechBubble';
import { SpeechBubbleTailPosition } from '@components/common/speech-bubble/defines/speechBubble';

export interface IUseSpeechBubbleParams extends SpeechBubbleProps {}

export interface IUseSpeechBubble {
    values: IUseSpeechBubbleValues;
    handlers: IUseSpeechBubbleHandlers;
}

export interface IUseSpeechBubbleValues {
    speechBubbleRef: MutableRefObject<HTMLDivElement | null>;
    isReverse: boolean;
    tailAbsolutePosition: string;
}

export interface IUseSpeechBubbleHandlers {
    getSpeechBubbleAbsolutePosition: (propertyName: string, value?: number | string) => string;
}

export default function useSpeechBubble(params: IUseSpeechBubbleParams): IUseSpeechBubble {
    const { isShow = false, tailPosition = 'left', tailMargin = 5, onPositionUp = () => {}, onPositionDown = () => {} } = params;
    const speechBubbleRef = useRef(null);
    const [isReverse, setIsReverse] = useState(false);
    const [tailAbsolutePosition, setTailAbsolutePosition] = useState('');

    const getTailAbsolutePosition = useCallback(
        (propertyName: SpeechBubbleTailPosition) => {
            return `${propertyName}: ${typeof tailMargin === 'string' ? tailMargin : `${tailMargin}px`};`;
        },
        [tailMargin],
    );

    const getSpeechBubbleAbsolutePosition = (propertyName: string, value?: number | string) => {
        if (value === undefined) {
            return '';
        }

        return `${propertyName}: ${typeof value === 'string' ? value : `${value}px`};`;
    };

    useEffect(() => {
        const element = speechBubbleRef?.current;
        if (!element) {
            return;
        }
        const clientRect = (element as HTMLDivElement).getBoundingClientRect();
        const top = clientRect.top;
        const bottom = window.innerHeight - clientRect.bottom;

        if (top < bottom) {
            // 아래에 표시
            setIsReverse(true);
            setTailAbsolutePosition(getTailAbsolutePosition(tailPosition === 'left' ? 'right' : 'left'));
            onPositionDown();
        } else {
            // 위에 표시
            setIsReverse(false);
            setTailAbsolutePosition(getTailAbsolutePosition(tailPosition === 'left' ? 'left' : 'right'));
            onPositionUp();
        }
    }, [isShow]);

    return {
        values: {
            speechBubbleRef,
            isReverse,
            tailAbsolutePosition,
        },
        handlers: {
            getSpeechBubbleAbsolutePosition,
        },
    };
}

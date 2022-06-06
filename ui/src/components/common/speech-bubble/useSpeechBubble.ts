import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { SpeechBubbleProps } from '@components/common/speech-bubble/speechBubble';
import useCssSize from '@hooks/common/useCssSize';
import { SizeCss } from '@defines/size';

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

export interface IUseSpeechBubbleHandlers {}

export default function useSpeechBubble(params: IUseSpeechBubbleParams): IUseSpeechBubble {
    const { isShow = false, tailPosition = 'left', tailMargin = 5, onPositionUp = () => {}, onPositionDown = () => {} } = params;

    const speechBubbleRef = useRef(null);

    const [isReverse, setIsReverse] = useState(false);
    const [tailAbsolutePosition, setTailAbsolutePosition] = useState<SizeCss>('');

    const {
        handlers: { getSizeCss },
    } = useCssSize({});

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
            setTailAbsolutePosition(getSizeCss(tailPosition === 'left' ? 'right' : 'left', tailMargin));
            onPositionDown();
        } else {
            // 위에 표시
            setIsReverse(false);
            setTailAbsolutePosition(getSizeCss(tailPosition === 'left' ? 'left' : 'right', tailMargin));
            onPositionUp();
        }
    }, [isShow]);

    return {
        values: {
            speechBubbleRef,
            isReverse,
            tailAbsolutePosition,
        },
        handlers: {},
    };
}

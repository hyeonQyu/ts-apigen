import { ReactNode } from 'react';
import { SpeechBubbleTailPosition } from '@components/common/speech-bubble/defines/speechBubble';
import classNames from 'classnames';
import useSpeechBubble from '@components/common/speech-bubble/useSpeechBubble';
import { zIndex } from '@defines/zIndex';
import useCssSize from '@hooks/common/useCssSize';
import { Size } from '@defines/size';

export interface SpeechBubbleProps {
    children?: ReactNode | ReactNode[];
    isShow?: boolean;
    onPositionUp?: () => void;
    onPositionDown?: () => void;
    autoReverse?: boolean;
    tailPosition?: SpeechBubbleTailPosition;
    tailMargin?: Size;

    top?: Size;
    bottom?: Size;
    left?: Size;
    right?: Size;
}

function SpeechBubble(props: SpeechBubbleProps) {
    const { isShow = false, children, top, bottom, left, right } = props;

    const {
        values: { speechBubbleRef, isReverse, tailAbsolutePosition },
    } = useSpeechBubble(props);

    const {
        handlers: { getSizeCss },
    } = useCssSize({});

    if (!isShow) {
        return <></>;
    }

    return (
        <>
            <div className={classNames('speech-bubble', isReverse && 'reverse')} ref={speechBubbleRef}>
                <div className={classNames('content', isReverse && 'reverse')}>{children}</div>
            </div>

            <style jsx>{`
                .reverse {
                    transform: rotate(180deg);
                }

                .speech-bubble {
                    position: absolute;
                    z-index: ${zIndex.speechBubble};
                    min-width: 60px;
                    padding: 0;
                    background: #ffffff;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                    border: #c1c2c6 solid 1px;
                    box-shadow: 0 2px 5px #515b6f33;
                    ${getSizeCss('top', top)}
                    ${getSizeCss('bottom', bottom)}
                    ${getSizeCss('left', left)}
                    ${getSizeCss('right', right)}
                }

                .speech-bubble:before,
                .speech-bubble:after {
                    content: '';
                    position: absolute;
                    border-style: solid;
                    border-width: 13px 6px 0;
                    display: block;
                    width: 0;
                    background: none;
                    ${tailAbsolutePosition}
                }
                .speech-bubble:before {
                    border-color: #ffffff transparent;
                    z-index: 1;
                    bottom: -11.5px;
                }
                .speech-bubble:after {
                    border-color: #c1c2c6 transparent;
                    z-index: 0;
                    bottom: -13px;
                }

                .content {
                    padding: 15px;
                }
            `}</style>
        </>
    );
}

export default SpeechBubble;

import classNames from 'classnames';
import { useSelectBoxContext } from '@components/select-box/context/selectBoxContext';
import Shortening from '@components/shortening/Shortening';
import ArrowIcon from '@icons/arrow/arrowIcon';

function SelectBoxHead<T extends number | string>() {
    const { props, useHook } = useSelectBoxContext();
    const {
        values: { message, isOpened },
        handlers: { toggleOpen },
    } = useHook;
    const { disabled } = props;

    return (
        <>
            <div className={classNames('head', isOpened && 'opened', disabled && 'disabled')} onClick={toggleOpen}>
                <Shortening className={'message'}>{message}</Shortening>
                <ArrowIcon />
            </div>

            <style global jsx>{`
                .head {
                    border-radius: 5px;
                    border: 1px solid #b6b6b6;
                    width: 100%;
                    height: 32px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 8px;
                }

                .head.opened {
                    border: 1px solid cornflowerblue;
                }

                .head.disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .message {
                    max-width: calc(100% - 24px);
                }
            `}</style>
        </>
    );
}

export default SelectBoxHead;

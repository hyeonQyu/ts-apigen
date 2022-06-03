import classNames from 'classnames';
import { useSelectBoxContext } from '@components/common/select-box/context/selectBoxContext';
import Shortening from '@components/common/shortening/Shortening';
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
                <div className={classNames('icon-wrapper', isOpened && 'reverse')}>
                    <ArrowIcon />
                </div>
            </div>

            <style global jsx>{`
                .head {
                    border-radius: 40px;
                    border: none;
                    background-color: #e5ecef;
                    width: 100%;
                    height: 40px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 20px;
                    transition: 0.3s;
                    color: #585858;
                }

                .head.opened {
                    background-color: #f3f7f8;
                    color: #444444;
                }

                .head.disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .message {
                    max-width: calc(100% - 24px);
                }

                .icon-wrapper {
                    transition: 0.3s;
                }
                .icon-wrapper.reverse {
                    transform: rotate(180deg);
                }
            `}</style>
        </>
    );
}

export default SelectBoxHead;

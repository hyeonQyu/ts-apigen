import classNames from 'classnames';

export interface LabelProps {
    children: string;
    onClickDelete?: () => void;
    backgroundColor?: string;
    fontColor?: string;
    className?: string;
}

function Label(props: LabelProps) {
    const { children, onClickDelete, backgroundColor = '#5192f1', fontColor = '#fff', className } = props;

    return (
        <>
            <div className={classNames(className, 'label')}>
                <span>{children}</span>
                {onClickDelete && <button type={'button'} className={'delete'} onClick={onClickDelete} />}
            </div>

            <style jsx>{`
                .label {
                    padding: 8px 12px;
                    background: ${backgroundColor};
                    border-radius: 5px;
                    color: ${fontColor};
                    display: flex;
                    width: fit-content;
                    align-items: center;
                }

                .delete {
                    background: none;
                    border: none;
                    margin-left: 4px;
                    position: relative;
                    width: 14px;
                    height: 14px;
                    cursor: pointer;
                }
                .delete:before,
                .delete:after {
                    position: absolute;
                    content: '';
                    height: 100%;
                    width: 3px;
                    background: ${fontColor};
                    top: 0;
                }
                .delete:before {
                    transform: rotate(45deg);
                }
                .delete:after {
                    transform: rotate(-45deg);
                }
            `}</style>
        </>
    );
}

export default Label;

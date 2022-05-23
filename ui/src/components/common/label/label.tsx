export interface LabelProps {
    children: string;
    onClickDelete?: () => void;
    backgroundColor?: string;
    fontColor?: string;
}

function Label(props: LabelProps) {
    const { children, onClickDelete, backgroundColor = '#5192f1', fontColor = '#fff' } = props;

    return (
        <>
            <label>
                <span>{children}</span>
                {onClickDelete && <button className={'close'} onClick={onClickDelete} />}
            </label>

            <style jsx>{`
                label {
                    padding: 4px 10px;
                    background: ${backgroundColor};
                    border-radius: 5px;
                    color: ${fontColor};
                    display: flex;
                    width: fit-content;
                    align-items: center;
                }

                .close {
                    background: none;
                    border: none;
                    margin-left: 4px;
                    position: relative;
                    width: 14px;
                    height: 14px;
                    cursor: pointer;
                }
                .close:before,
                .close:after {
                    position: absolute;
                    content: '';
                    height: 100%;
                    width: 3px;
                    background: ${fontColor};
                    top: 0;
                }
                .close:before {
                    transform: rotate(45deg);
                }
                .close:after {
                    transform: rotate(-45deg);
                }
            `}</style>
        </>
    );
}

export default Label;

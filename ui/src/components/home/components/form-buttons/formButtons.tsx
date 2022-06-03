import { useHomeContext } from '@components/home/context/homeContext';

function FormButtons() {
    const {
        values: { selectedControllerNames },
        handlers: { handleOpenControllerInitDialog },
    } = useHomeContext();

    return (
        <>
            <div className={'buttons-wrapper'}>
                <button type={'button'} onClick={handleOpenControllerInitDialog} disabled={selectedControllerNames.length === 0}>
                    Controller 선택 초기화
                </button>
                <button type={'submit'} className={'submit'}>
                    코드 생성
                </button>
            </div>

            <style jsx>{`
                .buttons-wrapper {
                    display: flex;
                    justify-content: right;
                }

                button {
                    height: 40px;
                    border-radius: 40px;
                    border: none;
                    font-size: 16px;
                    background-color: #e5ecef;
                    padding: 0 20px;
                    cursor: pointer;
                    transition: 0.3s;
                }

                button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                button:hover:not(:disabled) {
                    background-color: #cdcdcd;
                }

                button:not(:first-child) {
                    margin-left: 10px;
                }

                .submit {
                    background-color: #3595f2;
                    color: white;
                    font-weight: 600;
                }

                .submit:hover:not(:disabled) {
                    background-color: #2c78cd;
                }
            `}</style>
        </>
    );
}

export default FormButtons;

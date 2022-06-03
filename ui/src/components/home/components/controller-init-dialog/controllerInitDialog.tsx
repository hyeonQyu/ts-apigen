import Modal from '@components/common/modal/modal';
import { useHomeContext } from '@components/home/context/homeContext';

function ControllerInitDialog() {
    const {
        values: { isControllerInitDialogOpened },
        handlers: { handleInitController, handleCloseControllerInitDialog },
    } = useHomeContext();

    return (
        <>
            <Modal isOpened={isControllerInitDialogOpened}>
                <div className={'dialog'}>
                    <h1 className={'title'}>정말 초기화하시겠어요?</h1>
                    <div className={'detail'}>
                        <p>선택한 Controller가 모두 삭제됩니다.</p>
                        <p>선택한 Controller가 없는 경우</p>
                        <p>모든 Controller에 대한</p>
                        <p>API 요청 코드가 생성됩니다.</p>
                    </div>
                    <div className={'buttons'}>
                        <button className={'yes'} onClick={handleInitController}>
                            네, 초기화 할게요
                        </button>
                        <button className={'no'} onClick={handleCloseControllerInitDialog}>
                            아니요, 초기화 안할래요
                        </button>
                    </div>
                </div>
            </Modal>

            <style jsx>{`
                .dialog {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 50px 30px;
                }

                .title {
                    font-size: 25px;
                    color: #363636;
                }

                .detail {
                    color: #747474;
                    padding: 20px 0;
                    line-height: 1.5;
                    text-align: center;
                }

                .buttons {
                    width: 90%;
                    margin-top: 10px;
                }

                .buttons button {
                    display: block;
                    width: 100%;
                    font-size: 17px;
                    height: 50px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: 0.3s;
                }

                .buttons button:not(:first-child) {
                    margin-top: 10px;
                }

                .yes {
                    background-color: #3595f2;
                    color: white;
                }
                .yes:hover {
                    background-color: #2c78cd;
                }

                .no {
                    background-color: #dbdbdb;
                    color: #404040;
                    opacity: 0.5;
                }
                .no:hover {
                    background-color: #cdcdcd;
                }
            `}</style>
        </>
    );
}

export default ControllerInitDialog;

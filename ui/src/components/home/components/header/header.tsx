import { useHomeContext } from '@components/home/context/homeContext';

function Header() {
    const {
        handlers: { handleOpenControllerInitDialog, handleClickGenerateCode },
    } = useHomeContext();

    return (
        <>
            <nav>
                <ul>
                    <li onClick={handleOpenControllerInitDialog}>Controller 선택 초기화</li>
                    <li onClick={handleClickGenerateCode}>코드 생성</li>
                </ul>
            </nav>

            <style jsx>{`
                nav {
                    background: #2f87e8;
                    height: 60px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                ul {
                    display: flex;
                    justify-content: space-around;
                    width: 600px;
                }

                li {
                    cursor: pointer;
                    color: white;
                    font-size: 20px;
                    transition: 0.2s;
                }

                li:hover {
                    color: #e0eeff;
                }
            `}</style>
        </>
    );
}

export default Header;

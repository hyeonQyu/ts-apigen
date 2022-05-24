import { ReactNode } from 'react';

export interface FormRowProps {
    title: string;
    children: ReactNode;
    required?: boolean;
}

function FormRow(props: FormRowProps) {
    const { title, children, required } = props;

    return (
        <>
            <div className={'row'}>
                <span className={'title'}>{title}</span>
                <div className={'value'}>{children}</div>
            </div>

            <style jsx>{`
                .row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .row .value {
                    width: 70%;
                }

                .row .title {
                    width: 30%;
                    position: relative;
                }
                .row .title:before {
                    content: ${required ? "'*'" : 'none'};
                    position: absolute;
                    left: -15px;
                    color: #fd8e8e;
                    font-weight: bold;
                    font-size: 20px;
                }
            `}</style>
        </>
    );
}

export default FormRow;

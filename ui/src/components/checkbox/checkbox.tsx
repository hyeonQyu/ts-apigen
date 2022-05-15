import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { assetCheckbox } from '../../../public/assets/checkbox';

export interface CheckboxProps {
    checked?: boolean;
    size?: number;
    onChange?(checked: boolean): void;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
}

function Checkbox(props: CheckboxProps) {
    const { checked = false, size = 20, onChange = () => {}, children, className, disabled = false } = props;

    const handleChange = () => {
        !disabled && onChange(!checked);
    };

    return (
        <>
            <div className={classNames(className, 'wrapper')} onClick={handleChange}>
                <div className={classNames('checkbox', checked && 'checked', disabled && 'disabled')}>
                    {children && <div>{children}</div>}
                </div>
            </div>

            <style jsx>{`
                .wrapper {
                    display: flex;
                    cursor: pointer;
                }

                .checkbox {
                    border-radius: 5px;
                    border: 2px solid #615d6c;
                    transition: all 0.2s ease;
                    margin-right: 0.3rem;
                    background-color: white;
                    opacity: 0.7;
                    width: ${size}px;
                    height: ${size}px;
                }

                .checkbox.checked {
                    background: #66a2fa;
                    border: none;
                    position: relative;
                    opacity: 1;
                }

                .checkbox.checked:before {
                    content: '';
                    position: absolute;
                    width: 70%;
                    height: 70%;
                    left: 15%;
                    top: 15%;
                    background: url(${assetCheckbox.checkbox});
                    background-size: contain;
                }

                .checkbox.disabled {
                    background: #767676;
                    opacity: 0.5;
                }
            `}</style>
        </>
    );
}

export default Checkbox;

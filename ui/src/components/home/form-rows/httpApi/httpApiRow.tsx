import SelectBox from '@components/common/select-box/selectBox';

export interface HttpApiRowProps {}

function HttpApiRow(props: HttpApiRowProps) {
    const {} = props;

    return (
        <>
            <div className={'row'}>
                <span>HTTP 통신 방식</span>
                <div className={'value'}>
                    <SelectBox
                        value={''}
                        options={[
                            { value: 'axios', name: 'axios' },
                            { value: 'fetch', name: 'fetch' },
                        ]}
                    />
                </div>
            </div>

            <style jsx>{``}</style>
        </>
    );
}

export default HttpApiRow;

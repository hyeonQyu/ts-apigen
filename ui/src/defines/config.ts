import { PrettierConfig } from '@defines/prettierConfig';
import { SelectedControllerType } from '@defines/selectedControllerType';

export interface Config {
    /** Swagger Api Docs URI **/
    apiDocsUri: string;

    /** 요청 코드를 업데이트할 컨트롤러 목록, 없으면 모든 컨트롤러를 업데이트 **/
    controllerNames: string[];

    /** prettier 설정 파일 이름 */
    prettierConfigFileName: string;

    /** .prettier 설정, 없으면 기본 prettier 설정을 사용 */
    prettierConfig: PrettierConfig;

    /** 자동 생성되는 코드가 위치할 경로 */
    generatedCodePath: string;

    requestApi: 'axios' | 'fetch';

    /** root url 목록 */
    baseRootList: string[];

    /** 선택된 Controller 포함 / 제외 여부 */
    selectedControllerType: SelectedControllerType;
}

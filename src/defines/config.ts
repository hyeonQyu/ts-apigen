export interface Config {
    /** Swagger Api Docs URI **/
    apiDocsUri: string;

    /** 요청 코드를 업데이트할 컨트롤러 목록, 없으면 모든 컨트롤러를 업데이트 **/
    controllerList?: string[];

    /** .prettierrc 파일 경로, 없으면 기본 prettier 설정을 사용 */
    prettierrcPath?: string;

    /** 자동 생성되는 코드가 위치할 경로 */
    generatedCodePath: string;

    requestApi: 'axios' | 'fetch';
}

import { BaseModel } from './base-model';

export class ApiResponse extends BaseModel {
    public status: ApiResponseStatus;
    public data: any[];

    get isSuccess(): boolean {
        return this.status.error_code == 0;
    }

    getData(): Array<any> {
        return this.data;
    }

    getTotalCount(): number {
        return this.isSuccess ? this.data.length : 0;
    }
}

export class ApiResponseStatus extends BaseModel {
    public timestamp: string;
    public error_code: number; 
    public error_message: any;
    public elapsed: number;
    public credit_count: number;
}
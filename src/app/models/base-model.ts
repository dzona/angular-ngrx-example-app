export class BaseModel {

  protected _errors: Array<any>;
  protected _isEmpty: boolean = true;

  constructor(attributes?: any) {
    if (attributes) {
      this.setAttributes(attributes);
    }
  }

  public setAttributes(input: any): this {
    Object.assign(this, input);

    this._isEmpty = false;

    return this;
  }

  public addError(attribute: string, error: string) {
    this._errors[attribute] = error;
  }

  public getError(attribute: string) {
    return this._errors[attribute];
  }

  public getErrors() {
    return this._errors;
  }

  public getIsEmpty() {
    return this._isEmpty;
  }

}

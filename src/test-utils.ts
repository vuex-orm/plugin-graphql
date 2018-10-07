import { Arguments } from './support/interfaces';
import ORMModel from '@vuex-orm/core/lib/model/Model';
import Model from './orm/model';
import Context from './common/context';

export interface Options {
  [key: string]: any;
}

export type ReturnValue = () => (Object | Array<Object>) | Object | Array<Object>;

export class Mock {
  public readonly action: string;
  public readonly options?: Options;
  public modelClass?: ORMModel;
  public returnValue?: ReturnValue;

  constructor (action: string, options?: Options) {
    this.action = action;
    this.options = options;
  }

  public for (modelClass: ORMModel): Mock {
    this.modelClass = modelClass;
    return this;
  }

  public andReturn (returnValue: ReturnValue): Mock {
    this.returnValue = returnValue;
    this.installMock();
    return this;
  }

  private installMock (): void {
    const context: Context = Context.getInstance();
    const model: Model = context.getModel(this.modelClass!.entity);
    model.$addMock(this);
  }
}

export function clearORMStore (): void {
  // FIXME
  return;
}

export function mock (action: string, options?: Options): Mock {
  return new Mock(action, options);
}

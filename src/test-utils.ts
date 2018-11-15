import { Model as ORMModel } from "@vuex-orm/core";
import Context from "./common/context";
import Model from "./orm/model";
import VuexORMGraphQLPlugin from "./index";

let context: Context | null = null;

export function setupTestUtils(plugin: typeof VuexORMGraphQLPlugin): void {
  if (!plugin.instance) {
    throw new Error("Please call this function after setting up the store!");
  }

  context = plugin.instance.getContext();
}

export interface MockOptions {
  [key: string]: any;
}

type ReturnObject = { [key: string]: any };

export type ReturnValue =
  | (() => ReturnObject | Array<ReturnObject>)
  | ReturnObject
  | Array<ReturnObject>;

export class Mock {
  public readonly action: string;
  public readonly options?: MockOptions;
  public modelClass?: typeof ORMModel;
  public returnValue?: ReturnValue;

  constructor(action: string, options?: MockOptions) {
    this.action = action;
    this.options = options;
  }

  public for(modelClass: typeof ORMModel): Mock {
    this.modelClass = modelClass;
    return this;
  }

  public andReturn(returnValue: ReturnValue): Mock {
    this.returnValue = returnValue;
    this.installMock();
    return this;
  }

  private installMock(): void {
    if (this.action === "simpleQuery" || this.action === "simpleMutation") {
      context!.addGlobalMock(this);
    } else {
      const model: Model = context!.getModel(this.modelClass!.entity);
      model.$addMock(this);
    }
  }
}

export async function clearORMStore() {
  if (!context) {
    throw new Error("Please call setupTestUtils() before!");
  }

  await context.database.store.dispatch("entities/deleteAll");
}

export function mock(action: string, options?: MockOptions): Mock {
  if (!context) {
    throw new Error("Please call setupTestUtils() before!");
  }

  return new Mock(action, options);
}

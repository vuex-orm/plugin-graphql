import { setupMockData, User } from "../../support/mock-data";
import { Data } from "../../../src/support/interfaces";
import { recordGraphQLRequest } from "../../support/helpers";

let store: any;
let vuexOrmGraphQL;

describe("push", () => {
  beforeEach(async () => {
    [store, vuexOrmGraphQL] = await setupMockData();
  });

  test("sends the correct query to the API", async () => {
    // @ts-ignore
    await User.fetch(1);
    const user: Data = User.find(1)! as Data;
    user.name = "Snoopy";

    const request = await recordGraphQLRequest(async () => {
      await user.$push();
    });

    expect(request!.variables).toEqual({
      id: "1",
      user: { id: "1", name: "Snoopy", profileId: "1" }
    });
    expect(request!.query).toEqual(
      `
mutation UpdateUser($id: ID!, $user: UserInput!) {
  updateUser(id: $id, user: $user) {
    id
    name
    profile {
      id
      email
      age
      sex
    }
  }
}
      `.trim() + "\n"
    );
  });
});

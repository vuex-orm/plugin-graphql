import Apollo from "../../src/graphql/apollo";
import { setupMockData } from "../support/mock-data";

describe("Apollo", () => {
  describe(".getHeaders", () => {
    it("allows to set headers as object", async () => {
      await setupMockData({ "X-TEST": 42 });

      expect(Apollo["getHeaders"]()).toEqual({ "X-TEST": 42 });
    });

    it("allows to set headers as function", async () => {
      await setupMockData(() => ({ "X-TEST-FN": 43 }));

      expect(Apollo["getHeaders"]()).toEqual({ "X-TEST-FN": 43 });
    });
  });
});

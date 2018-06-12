import Logger from 'app/common/logger';
import gql from 'graphql-tag';

describe('Logger', () => {
  it("should generate output when enabled", () => {
    const logger = new Logger(true);
    let logSpy = sinon.stub(console, 'log');

    logger.log('test');
    expect(console.log.calledOnce).toBe(true);
    logSpy.restore();
  });


  it("shouldn't generate any output when not enabled", () => {
    const logger = new Logger(false);
    let logSpy = sinon.stub(console, 'log');

    logger.log('test');
    expect(console.log.notCalled).toBe(true);
    logSpy.restore();
  });

  describe('.log', () => {
    it("logs a message and variables", () => {
      const logger = new Logger(true);
      let logSpy = sinon.stub(console, 'log');

      const obj = { someProp: "test" };

      logger.log('test', 42, obj);
      //expect(console.log.calledWith('[Vuex-ORM-Apollo]', 'test', 42, obj)).toBe(true);
      logSpy.restore();
    });
  });

  describe('.group', () => {
    it("opens a new group", () => {
      const logger = new Logger(true);
      let logSpy = sinon.stub(console, 'group');

      const obj = { someProp: "test" };

      logger.group('test', 42, obj);
      //expect(console.group.calledWith('[Vuex-ORM-Apollo]', 'test', 42, obj)).toBe(true);
      logSpy.restore();
    });
  });

  describe('.groupEnd', () => {
    it("closes a new group", () => {
      const logger = new Logger(true);
      let logSpy = sinon.stub(console, 'groupEnd');

      logger.groupEnd();
      //expect(console.groupEnd.calledOnce).toBe(true);
      logSpy.restore();
    });
  });

  describe('.logQuery', () => {
    it("pretty prints a query in a group when a string is given", () => {
      const logger = new Logger(true);
      let groupSpy = sinon.stub(console, 'group');
      let logSpy = sinon.stub(console, 'log');
      let groupEndSpy = sinon.stub(console, 'groupEnd');

      const query = `
        mutation SomeBadFormattedQuery(
            $id: ID!         ,
                $name:
          String!
         ) {

            SomeBadFormattedQuery(id:
            $id,
                name: $name) {
                      user
              { id,

                  name   email}
         } }
      `;

      const formattedQuery = `mutation SomeBadFormattedQuery($id: ID!, $name: String!) {
  SomeBadFormattedQuery(id: $id, name: $name) {
    user {
      id
      name
      email
    }
  }
}
`;

      logger.logQuery(query);

      //expect(console.group.calledWith('[Vuex-ORM-Apollo]', 'Sending query:')).toBe(true);
      groupSpy.restore();

      //expect(console.log.calledWith(formattedQuery)).toEqual(true);
      logSpy.restore();

      //expect(console.groupEnd.calledOnce).toBe(true);
      groupEndSpy.restore();
    });
  });

  it("pretty prints a query in a group when a gql() result is given", () => {
    const logger = new Logger(true);
    let groupSpy = sinon.stub(console, 'group');
    let logSpy = sinon.stub(console, 'log');
    let groupEndSpy = sinon.stub(console, 'groupEnd');

    const query = gql(`
        mutation SomeBadFormattedQuery(
            $id: ID!         ,
                $name:
          String!
         ) {

            SomeBadFormattedQuery(id:
            $id,
                name: $name) {
                      user
              { id,

                  name   email}
         } }
      `);

    const formattedQuery = `mutation SomeBadFormattedQuery($id: ID!, $name: String!) {
  SomeBadFormattedQuery(id: $id, name: $name) {
    user {
      id
      name
      email
    }
  }
}
`;

    logger.logQuery(query);

    //expect(console.group.calledWith('[Vuex-ORM-Apollo]', 'Sending query:')).toBe(true);
    groupSpy.restore();

    //expect(console.log.calledWith(formattedQuery)).toEqual(true);
    logSpy.restore();

    //expect(console.groupEnd.calledOnce).toBe(true);
    groupEndSpy.restore();
  });
});

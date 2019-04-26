export default `
query Introspection {
  __schema {
    types {
      name
      description
      fields(includeDeprecated: true) {
        name
        description
        args {
          name
          description
          type {
            name
            kind

            ofType {
              kind

              name
              ofType {
                kind
                name

                ofType {
                  kind
                  name
                }
              }
            }
          }
        }

        type {
          name
          kind

          ofType {
            kind

            name
            ofType {
              kind
              name

              ofType {
                kind
                name
              }
            }
          }
        }
      }

      inputFields {
        name
        description
        type {
          name
          kind

          ofType {
            kind

            name
            ofType {
              kind
              name

              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
`;

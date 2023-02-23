export const userTypes = `
  type User {
    id: String
    firstName: String
    lastName: String
    email: String
      @unique
      @isEmail
      @required
      @notNull
      @lowercase
      @trim
      @normalizeEmail
    dateOfBirth: String
    about: String
    avatar: String
  }

  type Query {
    users: [User]!
  }

  type Mutation {
    createUser(
      firstName: String
      lastName: String
      email: String
      dateOfBirth: String
      about: String
      avatar: String
    ): User
  }

  type Subscription {
    userCreated: User
  }
`

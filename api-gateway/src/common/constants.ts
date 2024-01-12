export enum RabbitMQ {
  UserQueued = 'users',
  PassengerQueued = 'passengers',
  FlightQueue = 'flights',
}

export enum UserMSG {
  CREATE = 'CREATE_USER',
  FIND_ALL = 'FIND_ALL_USERS',
  FIND_ONE = 'FIND_ONE_USER',
  UPDATE = 'UPDATE_USER',
  DELETE = 'DELETE_USER',
  VALID_USER = 'VALID_USER',
}

export enum PassengerMSG {
  CREATE = 'CREATE_PASSENGER',
  FIND_ALL = 'FIND_ALL_PASSENGERS',
  FIND_ONE = 'FIND_ONE_PASSENGER',
  UPDATE = 'UPDATE_PASSENGER',
  DELETE = 'DELETE_PASSENGER',
}

export enum FlightMSG {
  CREATE = 'CREATE_FLIGHT',
  FIND_ALL = 'FIND_ALL_FLIGHTS',
  FIND_ONE = 'FIND_ONE_FLIGHT',
  UPDATE = 'UPDATE_FLIGHT',
  DELETE = 'DELETE_FLIGHT',
  ADD_PASSENGER = 'ADD_PASSENGER',
}

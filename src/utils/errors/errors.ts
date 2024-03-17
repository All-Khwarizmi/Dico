export default class ApiError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.name = this.constructor.name;
  }

  static unauthorized(): ApiError {
    return new ApiError("You are not authorized to access this resource", 401);
  }
  static forbidden(): ApiError {
    return new ApiError("You are forbidden from accessing this resource", 403);
  }
  static notFound(): ApiError {
    return new ApiError("The requested resource was not found", 404);
  }
  static methodNotAllowed(): ApiError {
    return new ApiError("The requested method is not allowed", 405);
  }
  static internalServerError(): ApiError {
    return new ApiError("An internal server error occurred", 500);
  }
  static badRequest(cause: string): ApiError {
    return new ApiError(
      `
    Bad request: ${cause}
    `,
      400
    );
  }
  static unknownError(): ApiError {
    return new ApiError("An unknown error occurred", 520);
  }
}

export class ClientError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = this.constructor.name;
  }
  static unknownError(): ClientError {
    return new ClientError("Une erreur inconnue est survenue");
  }
}

export class DatabaseError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = this.constructor.name;
  }
  static notFound(): DatabaseError {
    return new DatabaseError("The requested resource was not found");
  }
  static internalServerError(): DatabaseError {
    return new DatabaseError("An internal server error occurred");
  }
}

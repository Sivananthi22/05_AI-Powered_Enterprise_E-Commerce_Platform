import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import type { Request, Response } from "express";

@Catch()
export class ProblemDetailsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ProblemDetailsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (!(exception instanceof HttpException)) {
      this.logger.error(
        "Unhandled API exception",
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    const detail = this.getDetail(exception);
    response.status(status).type("application/problem+json").json({
      type: "about:blank",
      title: this.getTitle(status),
      status,
      detail,
      instance: request.originalUrl,
    });
  }

  private getDetail(exception: unknown): string {
    if (!(exception instanceof HttpException)) {
      return "An unexpected error occurred.";
    }

    const body = exception.getResponse();
    if (typeof body === "string") {
      return body;
    }

    if (typeof body === "object" && body !== null && "message" in body) {
      const { message } = body;
      if (typeof message === "string") {
        return message;
      }
      if (Array.isArray(message)) {
        return message.filter((item): item is string => typeof item === "string").join("; ");
      }
    }

    return exception.message;
  }

  private getTitle(status: number): string {
    return (HttpStatus[status] ?? "HTTP_ERROR").replaceAll("_", " ");
  }
}

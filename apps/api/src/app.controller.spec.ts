import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppModule } from "./app.module";

describe("AppController", () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it("returns an ok health status", () => {
    expect(controller.getHealth()).toEqual({ status: "ok" });
  });
});

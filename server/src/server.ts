import express, { Express, Request, Response } from "express";
import path from "path";

export class Server {
  private app: Express;

  constructor(app: Express) {
    this.app = app;

    this.app.use(
      express.static(path.resolve(__dirname + "/../public/frontend/"))
    );

    this.app.get("/api", (req: Request, res: Response): void => {
      res.end("You have reached the api endpoint");
    });

    this.app.get("*", (req: Request, res: Response): void => {
      res.sendFile(
        path.resolve(__dirname + "/../public/frontend/build/index.html")
      );
    });
  }

  public start(port: number): void {
    this.app.listen(port, () =>
      console.log(`Server listening on port ${port}!`)
    );
  }
}

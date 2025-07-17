import { Provider } from "@angular/core";
import { AbstractNewsService } from "./abstract-news.service";
import { environment } from "../../../environments/environments"
import { MockNewsService } from "./mock-news.service";
import { NewsService } from "./news.service";

export const newsServiceProvider: Provider = {
    provide: AbstractNewsService,
    useClass: environment.useMockService ? MockNewsService : NewsService
}
import { Component, OnInit } from '@angular/core';

import { Log } from './log.model';
import { LogsService } from './logs.service';

@Component({
    selector: 'jhi-logs',
    templateUrl: './logs.component.html'
})
export class LogsComponent implements OnInit {
    loggers: Log[];
    orderProp: string;
    reverse: boolean;

    constructor(private logsService: LogsService) {
        this.orderProp = 'name';
        this.reverse = false;
    }

    ngOnInit() {
        this.logsService.findAll().subscribe(response => (this.loggers = response.body));
    }

    changeLevel(name: string, level: string) {
        const log = new Log(name, level);
        this.logsService.changeLevel(log).subscribe(() => {
            this.logsService.findAll().subscribe(response => (this.loggers = response.body));
        });
    }
}

import { Component, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.css']
})

export class MyScheduleComponent implements OnInit {

  appointmentsData: any;
  currentDate: Date = new Date(2017, 4, 23);

  constructor() {
    const url = 'https://js.devexpress.com/Demos/Mvc/api/SchedulerData';

    this.appointmentsData = AspNetData.createStore({
      key: "AppointmentId",
      loadUrl: url + "/Get",
      insertUrl: url + "/Post",
      updateUrl: url + "/Put",
      deleteUrl: url + "/Delete",
      onBeforeSend: function (method, ajaxOptions) {
        ajaxOptions.xhrFields = { withCredentials: true };
      }
    });
  }

  ngOnInit() {
  }

}

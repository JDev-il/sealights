import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "../../app-routing.module";
import { SharedRoutingModule } from "../shared-routing.module";
import { MaterialModule } from "./material.module";

export const AppModules = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  HttpClientModule,
]

export const SharedModules = [
  CommonModule,
  SharedRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
]

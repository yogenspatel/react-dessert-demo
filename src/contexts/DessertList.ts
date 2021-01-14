import React from "react";
import { Dessert } from "../models/models";

const dummyDessertData: Array<Dessert> = [];
export const DessertsContext = React.createContext(dummyDessertData);

import { Types } from "mongoose";
import { IAdjacencyItem } from "./adjacencyItemInterface.js";

export interface INode {
  _id?: Types.ObjectId;
  name: string;
  x: number;
  y: number;
  floorId: string;
  adjacencyList: IAdjacencyItem[];
}

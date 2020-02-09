import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class Url extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: false,
  })
  shortid: string;

  @property({
    type: 'string',
    required: true,
  })
  longUrl: string;

  @property({
    type: 'date',
    required: false,
  })
  date: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Url>) {
    super(data);
  }
}

export interface UrlRelations {
  // describe navigational properties here
}

export type UrlWithRelations = Url & UrlRelations;

import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Nota extends Entity {
  @property({
    type: 'string',
    required: true,
    generate: true
  })
  id: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNota: string;

  @property({
    type: 'number',
    required: true,
  })
  nota: number;

  @property({
    type: 'string',
  })
  estudianteGrupoId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Nota>) {
    super(data);
  }
}

export interface NotaRelations {
  // describe navigational properties here
}

export type NotaWithRelations = Nota & NotaRelations;

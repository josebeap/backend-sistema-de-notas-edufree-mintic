import {Entity, model, property, hasMany} from '@loopback/repository';
import {Nota} from './nota.model';

@model({settings: {strict: false}})
export class EstudianteGrupo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  calificacion: number;

  @hasMany(() => Nota)
  notas: Nota[];

  @property({
    type: 'string',
  })
  grupoId?: string;

  @property({
    type: 'string',
  })
  usuarioId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EstudianteGrupo>) {
    super(data);
  }
}

export interface EstudianteGrupoRelations {
  // describe navigational properties here
}

export type EstudianteGrupoWithRelations = EstudianteGrupo & EstudianteGrupoRelations;

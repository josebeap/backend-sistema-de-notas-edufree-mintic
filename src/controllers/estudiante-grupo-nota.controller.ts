import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  EstudianteGrupo,
  Nota,
} from '../models';
import {EstudianteGrupoRepository} from '../repositories';

export class EstudianteGrupoNotaController {
  constructor(
    @repository(EstudianteGrupoRepository) protected estudianteGrupoRepository: EstudianteGrupoRepository,
  ) { }

  @get('/estudiante-grupos/{id}/notas', {
    responses: {
      '200': {
        description: 'Array of EstudianteGrupo has many Nota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Nota)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Nota>,
  ): Promise<Nota[]> {
    return this.estudianteGrupoRepository.notas(id).find(filter);
  }

  @post('/estudiante-grupos/{id}/notas', {
    responses: {
      '200': {
        description: 'EstudianteGrupo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Nota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof EstudianteGrupo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nota, {
            title: 'NewNotaInEstudianteGrupo',
            exclude: ['id'],
            optional: ['estudianteGrupoId']
          }),
        },
      },
    }) nota: Omit<Nota, 'id'>,
  ): Promise<Nota> {
    return this.estudianteGrupoRepository.notas(id).create(nota);
  }

  @patch('/estudiante-grupos/{id}/notas', {
    responses: {
      '200': {
        description: 'EstudianteGrupo.Nota PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nota, {partial: true}),
        },
      },
    })
    nota: Partial<Nota>,
    @param.query.object('where', getWhereSchemaFor(Nota)) where?: Where<Nota>,
  ): Promise<Count> {
    return this.estudianteGrupoRepository.notas(id).patch(nota, where);
  }

  @del('/estudiante-grupos/{id}/notas', {
    responses: {
      '200': {
        description: 'EstudianteGrupo.Nota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Nota)) where?: Where<Nota>,
  ): Promise<Count> {
    return this.estudianteGrupoRepository.notas(id).delete(where);
  }
}

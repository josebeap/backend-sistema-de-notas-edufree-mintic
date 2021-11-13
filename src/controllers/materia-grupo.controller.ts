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
  Materia,
  Grupo,
} from '../models';
import {MateriaRepository} from '../repositories';

export class MateriaGrupoController {
  constructor(
    @repository(MateriaRepository) protected materiaRepository: MateriaRepository,
  ) { }

  @get('/materias/{id}/grupos', {
    responses: {
      '200': {
        description: 'Array of Materia has many Grupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grupo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Grupo>,
  ): Promise<Grupo[]> {
    return this.materiaRepository.grupos(id).find(filter);
  }

  @post('/materias/{id}/grupos', {
    responses: {
      '200': {
        description: 'Materia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grupo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Materia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {
            title: 'NewGrupoInMateria',
            exclude: ['id'],
            optional: ['materiaId']
          }),
        },
      },
    }) grupo: Omit<Grupo, 'id'>,
  ): Promise<Grupo> {
    return this.materiaRepository.grupos(id).create(grupo);
  }

  @patch('/materias/{id}/grupos', {
    responses: {
      '200': {
        description: 'Materia.Grupo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {partial: true}),
        },
      },
    })
    grupo: Partial<Grupo>,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.materiaRepository.grupos(id).patch(grupo, where);
  }

  @del('/materias/{id}/grupos', {
    responses: {
      '200': {
        description: 'Materia.Grupo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.materiaRepository.grupos(id).delete(where);
  }
}
